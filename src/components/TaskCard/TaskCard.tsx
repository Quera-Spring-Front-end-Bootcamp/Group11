import { Avatar as MantineAvatar, Card, Flex, Tooltip } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import pda from '@alireza-ab/persian-date';
import { VscChecklist } from 'react-icons/vsc';
import { FiFlag, FiCheckCircle } from 'react-icons/fi';
import { BsCheckSquare } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useMemo, useState } from 'react';
import { DeleteTaskModalSlice, EditTaskModalSlice } from '../../redux/slices';
import { User, storeStateTypes } from '../../util/types';
import { Avatar } from '..';
import { IoReturnDownBackSharp } from 'react-icons/io5';
import { usePersianNumberTransform } from '../../hook';

interface TagProp {
  children: string;
  tagColor: string;
}
const Tag = ({ children, tagColor }: TagProp) => {
  return (
    <span
      style={{ backgroundColor: tagColor }}
      className={`ml-[12px] text-[10px] font-medium text-[#323232] leading-[15px]
         py-[2px] px-[4px] h-[19px] rounded-e-[10px] `}>
      {children}
    </span>
  );
};

interface taskCardProps {
  projectName?: string;
  deadLine?: string;
  taskId: string;
}

const TaskCard = ({ projectName, deadLine, taskId }: taskCardProps) => {
  const [isHover, setIsHover] = useState(false);
  const [isCheckList, setIsCheckList] = useState(true);
  const dispatch = useDispatch();
  const toPersian = usePersianNumberTransform();

  const taskObject = useSelector((state: storeStateTypes) =>
    state.board.selectedProjectBoardData
      .find((board) => board.tasks.some((task) => task._id === taskId))
      ?.tasks.find((task) => task._id === taskId)
  );

  const onClick = () => {
    dispatch(EditTaskModalSlice.actions.onOpen());
  };
  const handleDeleteTask = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    dispatch(DeleteTaskModalSlice.actions.onOpen());
    dispatch(DeleteTaskModalSlice.actions.setTaskId({ taskId }));
  };

  const datePersian = useMemo(() => {
    if (!taskObject?.deadline) return 'نامشخص';
    const date = new pda();
    const deadLineArray = new Date(taskObject?.deadline as string)
      .toLocaleDateString('en-GB')
      .split('/');

    return toPersian(
      date
        .fromGregorian([deadLineArray[2], deadLineArray[1], deadLineArray[0]])
        .toString('jDD jMMMM jy')
    );
  }, [JSON.stringify(taskObject)]);

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
        {taskObject?.taskAssigns.length ? (
          <MantineAvatar.Group spacing='sm'>
            {taskObject?.taskAssigns.map((user: User, i: number) => {
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
        <VscChecklist
          className={
            'text-[#BDC0C6] mr-[4px]' + (isCheckList ? ' block' : ' hidden')
          }
        />
      </div>
      <Flex
        dir='rtl'
        className='items-center mt-[18.5px]'>
        <FiFlag className='text-[#FB0606]' />
        <span className='text-[10px] text-[#343434] font-medium mr-[5px]'>
          {datePersian}
        </span>
        {/* <div className='flex flex-row items-center justify-center text-[#BDC0C6] mr-[8px] '>
          <BsCheckSquare className='text-[12px]' />
          <span className='text-[10px] font-medium mr-[4px]'>۱۲ / ۲</span>
        </div> */}
      </Flex>
      <div className='flex flex-row items-center mt-[20px]'>
        <Tag tagColor={'#BFFDE3'}>پروژه</Tag>
        <Tag tagColor={'#EEDFF7'}>درس</Tag>
      </div>
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
          color='blue'
          withArrow
          position='left'>
          <RiDeleteBinLine
            title='حذف تسک'
            size={'1.2rem'}
            className='hover:text-[red] cursor-pointer'
            onClick={handleDeleteTask}
          />
        </Tooltip>
      </div>
    </Card>
  );
};

export default TaskCard;
