import { Avatar } from '..';
import { Card } from '@mantine/core';
import { VscChecklist } from 'react-icons/vsc';
import { FiFlag, FiCheckCircle } from 'react-icons/fi';
import { BsCheckSquare, BsThreeDots } from 'react-icons/bs';
import { useState } from 'react';

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
  taskTitle?: string;
  deadLine?: string;
}

const TaskCard = ({ projectName, taskTitle, deadLine }: taskCardProps) => {
  const [isHover, setIsHover] = useState(false);
  const [isCheckList, setIsCheckList] = useState(true);

  const onClick = () => {
    console.log('card');
  };
  const onClick1 = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    console.log('3dots');
  };
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
        <Avatar
          fontSize=''
          className={isHover ? ' visible' : ' invisible'}
          size='sm'>
          NM
        </Avatar>
      </div>
      <div className='flex flex-row items-center mt-[9px]'>
        <span className='text-[12px] font-medium text-[#0E0E0E] leading-[18px] whitespace-break-spaces'>
          {taskTitle}
        </span>
        <VscChecklist
          className={
            'text-[#BDC0C6] mr-[4px]' + (isCheckList ? ' block' : ' hidden')
          }
        />
      </div>
      <div className='flex flex-row items-center mt-[18.5px]'>
        <FiFlag className='text-[#FB0606]' />
        <span className='text-[10px] text-[#343434] font-medium mr-[5px]'>
          {deadLine}
        </span>
        <div className='flex flex-row items-center  text-[#BDC0C6] mr-[8px] '>
          <BsCheckSquare className='text-[12px]' />
          <span className='text-[10px] font-medium mr-[4px]'>۱۲ / ۲</span>
        </div>
      </div>
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
        <BsThreeDots onClick={onClick1} />
      </div>
    </Card>
  );
};

export default TaskCard;
