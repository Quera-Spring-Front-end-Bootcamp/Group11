import { Flex, Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import { AiOutlineDownCircle } from 'react-icons/ai';
import BoardOverviewRow from './boardOverview';
import { Board, storeStateTypes } from '../../../util/types';

const ProjectListView = () => {
  const { data, projectName } = useSelector((state: storeStateTypes) => ({
    data: state.project.selectedProjectBoardData,
    projectName: state.project.selectedProjectName,
  }));

  return (
    <Flex
      direction='column'
      className='w-full h-full overflow-auto pt-[25px]'>
      <Flex className='h-[40px]'>
        <Text
          fz='20px'
          fw='bold'
          className='bg-blue-500/30 pt-2 pb-[0.24rem] px-3 rounded-lg mr-2'>
          {projectName}
        </Text>
      </Flex>
      <Flex
        direction={'column'}
        gap={'30px'}
        mt={'20px'}
        className='h-full overflow-y-auto'>
        {data.map((board: Board) => (
          <BoardOverviewRow
            key={board._id}
            tasks={board.tasks}
            name={board.name}
            color={board.color}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default ProjectListView;
