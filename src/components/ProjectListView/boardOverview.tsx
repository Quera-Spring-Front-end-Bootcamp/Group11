import { Flex, Text } from '@mantine/core';
import { AiOutlineDownCircle } from 'react-icons/ai';
import { Task, User } from '../../util/types';
import { Avatar, ColorInput } from '..';
import { Avatar as MantineAvatar, Tooltip } from '@mantine/core/';
import { BsFlag, BsTextRight } from 'react-icons/bs';
import { usePersianNumberTransform } from '../../hook';
import { workSpaceColors } from '../../constants';

interface BoardOverviewRow {
  name: string;
  tasks: Array<Task>;
  position: number;
}

const BoardOverviewRow = ({ name, tasks, position }: BoardOverviewRow) => {
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
            style={{ backgroundColor: workSpaceColors[position] || '#000' }}
            className='px-[6px] py-[4px] rounded-4'>
            {name}
          </div>
          <Text fz='12px'>{toPersianNumeric(`${tasks.length} تسک`)}</Text>
          {/* <Flex></Flex> */}
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
        <Flex
          key={task._id}
          justify='space-between'
          align='center'
          my='20px'
          py='7px'>
          <Flex
            gap='10px'
            align='center'
            className='-translate-x-[30px]'>
            <ColorInput
              height='16px'
              width='16px'
              notClickable
              radius='4px'
              bg='#00000080'
            />
            <Text fz='12px'>{task.name}</Text>
          </Flex>
          <Flex
            w='50%'
            justify='stretch'>
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
                        // style={{
                        //   transform: `translate(calc(50% - ${i * 50}%), 0)`,
                        // }}
                        className='rounded-full shadow-md'
                      />
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
            <div className='w-full text-center'>نامشخص</div>
            <div className='w-full grid justify-center'>
              <BsFlag color='#ff0000' />
            </div>
            <div className='w-full grid justify-center'>
              <BsTextRight />
            </div>
          </Flex>
        </Flex>
      ))}
    </div>
  );
};

export default BoardOverviewRow;
