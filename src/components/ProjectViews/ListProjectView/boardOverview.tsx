import { Flex, Text } from '@mantine/core';
import { AiOutlineDownCircle } from 'react-icons/ai';
import { Task } from '../../../util/types';
import { usePersianNumberTransform } from '../../../hook';
import TaskRow from './TaskRow';

interface BoardOverviewRow {
  name: string;
  tasks: Array<Task>;
  color: string;
}

const BoardOverviewRow = ({ name, tasks, color }: BoardOverviewRow) => {
  const toPersianNumeric = usePersianNumberTransform();

  return (
    <div className='mr-[30px]'>
      <Flex
        justify='space-between'
        align='center'>
        <Flex
          gap='8px'
          w='50%'
          align='center'>
          <AiOutlineDownCircle size={20} />
          <div
            style={{ backgroundColor: color || '#000' }}
            className='px-[6px] py-[4px] rounded-4'>
            {name}
          </div>
          <Text fz='12px'>{toPersianNumeric(`${tasks.length} تسک`)}</Text>
        </Flex>
        <Flex
          w='50%'
          justify='stretch'>
          <div className='w-full text-center'>اعضا</div>
          <div className='w-full text-center'>ددلاین</div>
          <div className='w-full text-center'>اولویت</div>
          <div className='w-full text-center'>توضیحات</div>
        </Flex>
      </Flex>
      {tasks.map((task) => (
        <TaskRow
          key={task._id}
          task={task}
        />
      ))}
    </div>
  );
};

export default BoardOverviewRow;
