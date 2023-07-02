import { Flex, Text, Avatar as MantineAvatar } from '@mantine/core';
import { BsFlag, BsTextRight } from 'react-icons/bs';
import { Avatar, ColorInput } from '../..';
import { Task, User } from '../../../util/types';
import { useToPersianDate } from '../../../hook';
import { useDispatch } from 'react-redux';
import { EditTaskModalSlice } from '../../../redux/slices';

const TaskRow = ({ task }: { task: Task }) => {
  const toJalaliDate = useToPersianDate();
  const dispatch = useDispatch();

  const datePersian = toJalaliDate(task.deadline);

  const onTaskClickHandler = () => {
    dispatch(
      EditTaskModalSlice.actions.setTaskDetail({
        taskDetail: task,
      })
    );
    dispatch(
      EditTaskModalSlice.actions.setTaskDeadLine({
        datePersian,
      })
    );
    // dispatch(EditTaskModalSlice.actions.setTaskTags({ taskTags }));

    dispatch(EditTaskModalSlice.actions.onOpen());
  };

  return (
    <Flex
      onClick={onTaskClickHandler}
      key={task._id}
      justify='space-between'
      align='center'
      my='20px'
      py='7px'
      className='cursor-pointer rounded-lg hover:bg-neutral-200/70'>
      <Flex
        gap='10px'
        align='center'
        className='-translate-x-[30px]'>
        <ColorInput
          height='16px'
          width='16px'
          radius='4px'
          bg='#00000080'
        />
        <Text fz='12px'>{task.name}</Text>
      </Flex>
      <Flex
        w='50%'
        align='center'>
        <Flex className='relative w-full justify-center'>
          {task.taskAssigns.length ? (
            <MantineAvatar.Group spacing='sm'>
              {task.taskAssigns.map((user: User, i: number) => {
                return (
                  <Avatar
                    key={user._id}
                    alt={user.firstname}
                    userId={user._id}
                    fontSize='12px'
                    label={`${user.username}`}
                    color='cyan'
                    className='rounded-full shadow-md'>
                    {user.username[0].toUpperCase()}
                  </Avatar>
                );
              })}
            </MantineAvatar.Group>
          ) : (
            <div
              className={`grid justify-center
              `}>
              N/A
            </div>
          )}
        </Flex>
        <div className='w-full text-center'>{datePersian}</div>
        <div className='w-full grid justify-center'>
          <BsFlag color='#ff0000' />
        </div>
        <div className='w-full grid justify-center'>
          <BsTextRight />
        </div>
      </Flex>
    </Flex>
  );
};

export default TaskRow;
