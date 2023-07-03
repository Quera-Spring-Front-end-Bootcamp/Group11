import { Avatar as MantineAvatar, Card, Flex, Tooltip } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { VscChecklist } from 'react-icons/vsc';
import { FiFlag, FiCheckCircle } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { DeleteTaskModalSlice, EditTaskModalSlice } from '../../redux/slices';
import { Task, User, storeStateTypes } from '../../util/types';
import { Avatar } from '..';
import { getTaskTagsApi } from '../../services/tagApi';
import { useToPersianDate } from '../../hook';

interface TagProp {
  children: string;
  tagColor: string;
}
const Tag = ({ children, tagColor }: TagProp) => {
  return (
    <div
      style={{ backgroundColor: tagColor }}
      className='ml-[12px] grid justify-center items-center pt-[0.2rem] text-[10px] font-medium text-[#323232] rounded-e-[10px]'>
      {children}
    </div>
  );
};

interface taskCardProps {
  projectName?: string;
  deadLine?: string;
  taskId: string;
  taskTitle: string;
}

const TaskCard = ({ projectName, taskId }: taskCardProps) => {
  const [isHover, setIsHover] = useState(false);
  const [taskTags, setTaskTags] = useState([]);
  const dispatch = useDispatch();
  const toPersianDate = useToPersianDate();

  const taskObject = useSelector((state: storeStateTypes) =>
    state.project.selectedProjectBoardData
      .find((board) => board.tasks.some((task) => task._id === taskId))
      ?.tasks.find((task) => task._id === taskId)
  );
  const fetchTaskTags = async () => {
    try {
      const { data } = await getTaskTagsApi(taskId);
      setTaskTags(data.data.tags);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTaskTags();
  }, []);

  const persianDate = toPersianDate(taskObject?.deadline);

  const onClick = () => {
    dispatch(
      EditTaskModalSlice.actions.setTaskDetail({
        taskDetail: taskObject as Task,
      })
    );
    dispatch(
      EditTaskModalSlice.actions.setTaskDeadLine({ datePersian: persianDate })
    );
    dispatch(EditTaskModalSlice.actions.setTaskTags({ taskTags }));

    dispatch(EditTaskModalSlice.actions.onOpen());
  };
  const handleDeleteTask = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    dispatch(DeleteTaskModalSlice.actions.onOpen());
    dispatch(DeleteTaskModalSlice.actions.setTaskId({ taskId }));
  };

  if (!taskObject) return;

  return (
    <Card
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      onClick={onClick}
      p={'10px'}
      w={'100%'}
      maw='250px'
      radius={'4px'}
      shadow=' 0px 6px 8px rgba(0, 0, 0, 0.14)'
      className=''>
      <div className='flex flex-row items-center	justify-between'>
        <span className='text-[10px] font-medium text-[#534D60]'>
          {projectName}
        </span>
        {taskObject.taskAssigns.length ? (
          <MantineAvatar.Group spacing='sm'>
            {taskObject?.taskAssigns?.map((user: User) => {
              return (
                <Avatar
                  key={user._id}
                  alt={user.firstname}
                  userId={user._id}
                  fontSize='12px'
                  label={`${user.username}`}
                  size='sm'
                  color='cyan'
                  className='rounded-full shadow-md'>
                  {user.username[0]}
                </Avatar>
              );
            })}
          </MantineAvatar.Group>
        ) : (
          <div className='grid justify-center text-xs'>تخصیص داده نشده</div>
        )}
      </div>
      <div className='flex flex-row items-center mt-[9px]'>
        <span className='text-[12px] font-medium text-[#0E0E0E] leading-[18px] whitespace-break-spaces'>
          {taskObject?.name}
        </span>
        <VscChecklist className='text-[#BDC0C6] mr-[4px] block' />
      </div>
      <Flex
        dir='rtl'
        className='items-center mt-[18.5px]'>
        <FiFlag className='text-[#FB0606]' />
        <span className='text-[10px] text-[#343434] font-medium mr-[5px]'>
          {persianDate}
        </span>
      </Flex>
      {taskTags.length > 0 && (
        <div className='grid grid-cols-4 items-center mt-[20px] flex-wrap gap-y-3'>
          {taskTags.map((item: any) => (
            <Tag
              key={item._id}
              tagColor={item.color}>
              {item.tagName}
            </Tag>
          ))}
        </div>
      )}
      <div
        className={
          'border-solid border-[1px] border-[#EFF0F0] mt-[18px] w-[100%]' +
          (isHover ? ' block' : ' hidden')
        }></div>

      <div
        className={
          'flex-row items-center flex overflow-hidden transition-all text-[#323232] justify-between' +
          (isHover ? ' h-10' : ' h-0')
        }>
        <FiCheckCircle />
        <Tooltip
          label='حذف تسک'
          color='red'
          withArrow
          transitionProps={{ transition: 'scale-x', duration: 300 }}
          position='right'>
          <div>
            <RiDeleteBinLine
              size={'1.2rem'}
              className='hover:text-[red] cursor-pointer'
              onClick={handleDeleteTask}
            />
          </div>
        </Tooltip>
      </div>
    </Card>
  );
};

export default TaskCard;
