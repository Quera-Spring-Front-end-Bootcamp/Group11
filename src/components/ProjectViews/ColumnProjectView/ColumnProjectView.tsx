import React, { useCallback, useEffect, useRef, useState } from 'react';
import CreateBoadCol from '../../Modal/CreateModal/CreateBoardCol';
import { Button } from '../../';
import { createPortal } from 'react-dom';
import {
  CancelDrop,
  closestCenter,
  pointerWithin,
  rectIntersection,
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  getFirstCollision,
  // KeyboardSensor,
  MouseSensor,
  TouchSensor,
  // Modifiers,
  // useDroppable,
  // UniqueIdentifier,
  useSensors,
  useSensor,
  MeasuringStrategy,
  KeyboardCoordinateGetter,
  defaultDropAnimationSideEffects,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  AnimateLayoutChanges,
  SortableContext,
  useSortable,
  arrayMove,
  defaultAnimateLayoutChanges,
  verticalListSortingStrategy,
  SortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Item, Container, ContainerProps } from './components';
import { Board, Task, storeStateTypes } from '../../../util/types';
import { useDispatch, useSelector } from 'react-redux';
import boardSlice from '../../../redux/slices/BoardSlices/ProjectSlice';
import { changeBoardPositionApi } from '../../../services/boardApi';
import {
  changeTaskBoardApi,
  // changeTaskPositionApi,
} from '../../../services/taskApi';

export default {
  title: 'Presets/Sortable/Multiple Containers',
};

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

function DroppableContainer({
  children,
  columns = 1,
  disabled,
  id,
  items,
  style,
  ...props
}: ContainerProps & {
  disabled?: boolean;
  id: string;
  items: Task[];
  style?: React.CSSProperties;
}) {
  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
    transform,
  } = useSortable({
    id,
    data: {
      type: 'container',
      children: items,
    },
    animateLayoutChanges,
  });

  const isOverContainer = over
    ? (id === over.id && active?.data.current?.type !== 'container') ||
      items.some((task: Task) => task._id === over.id)
    : false;

  return (
    <Container
      ref={disabled ? undefined : setNodeRef}
      style={{
        ...style,
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
      }}
      hover={isOverContainer}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      columns={columns}
      {...props}>
      {children}
    </Container>
  );
}

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

type Items = Record<string, string[]>;

interface Props {
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  columns?: number;
  containerStyle?: React.CSSProperties;
  coordinateGetter?: KeyboardCoordinateGetter;
  getItemStyles?(args: {
    value: string;
    index: number;
    overIndex: number;
    isDragging: boolean;
    containerId: string;
    isSorting: boolean;
    isDragOverlay: boolean;
  }): React.CSSProperties;
  wrapperStyle?(args: { index: number }): React.CSSProperties;
  itemCount?: number;
  items?: Items;
  handle?: boolean;
  renderItem?: any;
  strategy?: SortingStrategy;
  vertical?: boolean;
}

export function ColumnProjectView({
  adjustScale = false,
  cancelDrop,
  columns,
  handle = true,
  containerStyle,
  // coordinateGetter = multipleContainersCoordinateGetter,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  renderItem,
  strategy = verticalListSortingStrategy,
  vertical = false,
}: Props) {
  const dispatch = useDispatch();

  const searchedTask = useSelector(
    (state: storeStateTypes) => state.boardHeader.searchValue
  );

  const [modalBoard, setmodalBoard] = useState(false);

  const openModal = () => {
    setmodalBoard(true);
  };

  const closeModal = () => {
    setmodalBoard(false);
  };

  /**
   * get necessary data from redux store
   */
  const data = useSelector(
    (state: storeStateTypes) => state.project.selectedProjectBoardData
  );

  ///boards
  const [containers, setContainers] = useState<string[][]>([]);

  ///task cards object
  const [items, setItems] = useState<Record<string, Task[]>>({});

  //force reRender component and set necessary states if:
  //    2- the name of boards change
  //    3- length of tasks array in each board changes (Task Count => Delete, Add)
  //    1- data length (boards count) changes
  useEffect(() => {
    setContainers(() => data.map((board: Board) => [board.name, board._id]));
    setItems(() => {
      const items: Record<string, Task[]> = {};
      data.forEach((board: Board) => {
        items[board._id] = board.tasks;
      });
      return items;
    });
  }, [
    JSON.stringify(data.map((board: Board) => board.name)),
    JSON.stringify(data.map((board: Board) => board.tasks.length)),
    data.length,
  ]);

  const [activeId, setActiveId] = useState<null | string>(null);
  const lastOverId = useRef<null | string>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId
    ? containers.some((cont) => cont[1] === activeId)
    : false;

  /**
   * Custom collision detection strategy optimized for multiple containers
   *
   * - First, find any droppable containers intersecting with the pointer.
   * - If there are none, find intersecting containers with the active draggable.
   * - If there are no intersecting containers, return the last matched intersection
   *
   */
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in items
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId: string = getFirstCollision(intersections, 'id') as string;

      if (overId !== null) {
        if (overId in items) {
          const containerItems = items[overId];

          // If a container is matched and it contains items
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.some((task: Task) => task._id === container.id)
              ),
            })[0]?.id as string;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, items]
  );

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const findContainer = (id: string) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) =>
      items[key].some((task: Task) => task._id === id)
    ) as string;
  };

  const getIndex = (id: string) => {
    const container = findContainer(id);

    if (!container) {
      return -1;
    }

    const index = items[container].findIndex((task: Task) => task.board === id);

    return index;
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={({ active }) => {
        setActiveId(active.id as string);
      }}
      onDragOver={({ active, over }) => {
        const overId = over?.id as string;
        if (overId == null || active.id in items) {
          return;
        }

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id as string);

        if (!overContainer || !activeContainer) {
          return;
        }

        if (activeContainer !== overContainer) {
          setItems((items: Record<string, Task[]>) => {
            const activeItems = items[activeContainer];
            const overItems = items[overContainer];
            const overIndex = overItems.findIndex(
              (task: Task) => task._id === overId
            );
            const activeIndex = activeItems.findIndex(
              (task: Task) => task._id === active.id
            );

            let newIndex: number;

            if (overId in items) {
              newIndex = overItems.length + 1;
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top >
                  over.rect.top + over.rect.height;

              const modifier = isBelowOverItem ? 1 : 0;

              newIndex =
                overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            recentlyMovedToNewContainer.current = true;

            return {
              ...items,
              [activeContainer]: items[activeContainer].filter(
                (task: Task) => task._id !== active.id
              ),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(
                  newIndex,
                  items[overContainer].length
                ),
              ],
            };
          });
        }
      }}
      onDragEnd={async ({ active, over }) => {
        if (active.id in items && over?.id) {
          setContainers((containers: string[][]) => {
            const activeIndex = containers.findIndex(
              (elem) => elem[1] === active.id
            );
            const overIndex = containers.findIndex(
              (elem) => elem[1] === over.id
            );

            return arrayMove(containers, activeIndex, overIndex);
          });

          const overBoardIndexNum =
            data.findIndex((board: Board) => board._id === over?.id) + 1;

          dispatch(
            boardSlice.actions.updateBoardPosition({
              activeBoard: active.id as string,
              overBoard: over?.id as string,
            })
          );
          changeBoardPositionApi(active.id as string, overBoardIndexNum);
        }

        const activeContainer = findContainer(active.id as string);

        if (!activeContainer) {
          setActiveId(null);
          return;
        }

        const overId = over?.id;

        if (overId == null) {
          setActiveId(null);
          return;
        }

        const overContainer = findContainer(overId as string);

        if (overContainer) {
          const activeIndex = items[activeContainer].findIndex(
            (task: Task) => task._id === active.id
          );
          const overIndex = items[overContainer].findIndex(
            (task: Task) => task._id === (over?.id as string)
          );

          if (activeIndex !== overIndex) {
            setItems((items: Record<string, Task[]>) => ({
              ...items,
              [overContainer]: arrayMove(
                items[overContainer],
                activeIndex,
                overIndex
              ),
            }));
          }
        }
        if (!(active.id in items)) {
          //update task board in DB
          await changeTaskBoardApi(active.id as string, overContainer);

          // save reArranged tasks data to redux
          dispatch(
            boardSlice.actions.updateBoardTaskPositions({
              newData: items,
              prevData: data,
            })
          );

          //update task position in db
          // const position = items[overContainer].findIndex(
          //   (task: Task) => task._id === over?.id
          // );
          // console.log(items);
          // await changeTaskPositionApi(active.id as string, position + 1).then(
          //   (data) => console.log(data)
          // );
        }

        setActiveId(null);
      }}
      cancelDrop={cancelDrop}
      onDragCancel={() => setActiveId(null)}>
      <div
        style={{
          display: 'inline-grid',
          boxSizing: 'border-box',
          padding: '17px 0',
          gridAutoFlow: vertical ? 'row' : 'column',
        }}>
        <SortableContext
          items={
            [...containers] as unknown as (
              | UniqueIdentifier
              | { id: UniqueIdentifier }
            )[]
          }
          strategy={
            vertical
              ? verticalListSortingStrategy
              : horizontalListSortingStrategy
          }>
          {containers.map((container: string[]) => (
            <DroppableContainer
              key={container[1]}
              id={container[1]}
              boardId={container[1]}
              label={`${container[0]}`}
              columns={columns}
              items={items[container[1]]}
              style={containerStyle}>
              <SortableContext
                items={
                  items[container[1]] as unknown as (
                    | UniqueIdentifier
                    | { id: UniqueIdentifier }
                  )[]
                }
                strategy={strategy}>
                {items[container[1]].map((task: Task, index: number) => {
                  const sortableItem = (
                    <SortableItem
                      disabled={isSortingContainer}
                      key={task._id}
                      id={task._id}
                      index={index}
                      handle={handle}
                      style={getItemStyles}
                      wrapperStyle={wrapperStyle}
                      renderItem={renderItem}
                      containerId={container[1]}
                      getIndex={getIndex}
                      taskDetail={{
                        deadLine: 'N/A',
                        taskTitle: task.name,
                        taskId: task._id,
                      }}
                    />
                  );

                  if (searchedTask.length > 0) {
                    if (task.name.includes(searchedTask)) {
                      return sortableItem;
                    }
                  } else {
                    return sortableItem;
                  }
                })}
              </SortableContext>
            </DroppableContainer>
          ))}
          <div className='flex flex-row justify-start items-center p-3 gap-1 w-[250px] h-[40px] shadow-lg rounded-[6px] border border-t-green-600'>
            <Button
              onClick={openModal}
              bg='#FAFBFC'
              c='dark'
              p='0'
              h='auto'
              styles={{
                root: {
                  '&:hover': {
                    backgroundColor: '#FAFBFC',
                  },
                },
              }}>
              ساختن ستون جدید
            </Button>
            <CreateBoadCol
              opened={modalBoard}
              onClose={closeModal}
            />
          </div>
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay
          adjustScale={adjustScale}
          dropAnimation={dropAnimation}>
          {activeId
            ? containers.some((cont: string[]) => cont[1] === activeId)
              ? renderContainerDragOverlay(activeId)
              : renderSortableItemDragOverlay(activeId)
            : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );

  function renderSortableItemDragOverlay(id: string) {
    const boardId = findContainer(id);
    const task = items[boardId].find((task: Task) => task._id === id);

    if (!task) return;

    return (
      <Item
        value={id}
        handle={handle}
        style={getItemStyles({
          containerId: findContainer(id),
          overIndex: -1,
          index: getIndex(id),
          value: id,
          isSorting: true,
          isDragging: true,
          isDragOverlay: true,
        })}
        wrapperStyle={wrapperStyle({ index: 0 })}
        renderItem={renderItem}
        dragOverlay
        taskDetail={{
          deadLine: 'N/A',
          taskTitle: task.name,
          taskId: id,
        }}
      />
    );
  }

  function renderContainerDragOverlay(containerId: string) {
    const board = containers.find(
      (container: string[]) => container[1] === containerId
    );
    if (!board) return;
    return (
      <Container
        boardId={board[1]}
        label={`${board[0]}`}
        columns={columns}
        style={{
          height: '100%',
        }}
        shadow
        unstyled={false}>
        {items[containerId].map((task: Task, index: number) => (
          <Item
            key={task._id}
            value={task._id}
            handle={handle}
            style={getItemStyles({
              containerId,
              overIndex: -1,
              index: getIndex(task._id),
              value: task.name,
              isDragging: false,
              isSorting: false,
              isDragOverlay: false,
            })}
            wrapperStyle={wrapperStyle({ index })}
            renderItem={renderItem}
            taskDetail={{
              deadLine: 'N/A',
              taskTitle: task.name,
              taskId: task._id,
            }}
          />
        ))}
      </Container>
    );
  }
}

interface SortableItemProps {
  containerId: string;
  id: string;
  index: number;
  handle: boolean;
  disabled?: boolean;
  style(args: any): React.CSSProperties;
  getIndex(id: string): number;
  renderItem(): React.ReactElement;
  wrapperStyle({ index }: { index: number }): React.CSSProperties;
  taskDetail: {
    taskTitle: string;
    deadLine: string;
    taskId: string;
  };
}

function SortableItem({
  disabled,
  id,
  index,
  handle,
  renderItem,
  style,
  containerId,
  getIndex,
  wrapperStyle,
  taskDetail,
}: SortableItemProps) {
  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    isDragging,
    isSorting,
    over,
    overIndex,
    transform,
    transition,
  } = useSortable({
    id,
  });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      value={id}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={handle ? { ref: setActivatorNodeRef } : undefined}
      index={index}
      wrapperStyle={wrapperStyle({ index })}
      style={style({
        index,
        value: id,
        isDragging,
        isSorting,
        overIndex: over ? getIndex(over.id as string) : overIndex,
        containerId,
      })}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
      renderItem={renderItem}
      taskDetail={taskDetail}
    />
  );
}

function useMountStatus() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500);

    return () => clearTimeout(timeout);
  }, []);

  return isMounted;
}
