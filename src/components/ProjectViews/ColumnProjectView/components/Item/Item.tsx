import React, { useEffect } from 'react';
import classNames from 'classnames';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import type { Transform } from '@dnd-kit/utilities';

import { Handle } from './components';

import styles from './Item.module.scss';
import { TaskCard } from '../../../..';

export interface ItemProps {
  taskDetail: {
    projectName: string;
    taskTitle: string;
    deadLine: string;
    taskId: string;
  };
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  handleProps?: any;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: string;
  onRemove?(): void;
  renderItem?(args: {
    dragOverlay: boolean;
    dragging: boolean;
    sorting: boolean;
    index: number | undefined;
    fadeIn: boolean;
    listeners: DraggableSyntheticListeners;
    ref: React.Ref<HTMLElement>;
    style: React.CSSProperties | undefined;
    transform: ItemProps['transform'];
    transition: ItemProps['transition'];
    value: ItemProps['value'];
  }): React.ReactElement;
}

export const Item = React.forwardRef<HTMLLIElement, ItemProps>(
  (
    {
      color,
      dragOverlay,
      dragging,
      disabled,
      fadeIn,
      handle,
      handleProps,
      // height,
      index,
      listeners,
      // onRemove,
      renderItem,
      sorting,
      style,
      transition,
      transform,
      value,
      wrapperStyle,
      taskDetail,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (!dragOverlay) {
        return;
      }

      document.body.style.cursor = 'grabbing';

      return () => {
        document.body.style.cursor = '';
      };
    }, [dragOverlay]);

    return renderItem ? (
      renderItem({
        dragOverlay: Boolean(dragOverlay),
        dragging: Boolean(dragging),
        sorting: Boolean(sorting),
        index,
        fadeIn: Boolean(fadeIn),
        listeners,
        ref,
        style,
        transform,
        transition,
        value,
      })
    ) : (
      <li
        className={classNames(
          styles.Wrapper,
          fadeIn && styles.fadeIn,
          sorting && styles.sorting,
          dragOverlay && styles.dragOverlay
        )}
        style={
          {
            ...wrapperStyle,
            transition: [transition, wrapperStyle?.transition]
              .filter(Boolean)
              .join(', '),
            '--translate-x': transform
              ? `${Math.round(transform.x)}px`
              : undefined,
            '--translate-y': transform
              ? `${Math.round(transform.y)}px`
              : undefined,
            '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
            '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
            '--index': index,
            '--color': color,
          } as React.CSSProperties
        }
        ref={ref}>
        <div
          className={classNames(
            styles.Item,
            dragging && styles.dragging,
            handle && styles.withHandle,
            dragOverlay && styles.dragOverlay,
            disabled && styles.disabled,
            color && styles.color
          )}
          style={style}
          data-cypress='draggable-item'
          {...(!handle ? listeners : undefined)}
          {...props}
          tabIndex={!handle ? 0 : undefined}>
          <span className={styles.Actions}>
            {handle ? (
              <Handle
                className='w-full'
                {...handleProps}
                {...listeners}
              />
            ) : null}
          </span>
          <TaskCard
            deadLine={taskDetail?.deadLine}
            projectName={taskDetail?.projectName}
            taskTitle={taskDetail?.taskTitle}
            taskId={value}
          />
        </div>
      </li>
    );
  }
);
