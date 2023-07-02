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
    <div className='w-full h-full overflow-auto pt-[35px]'>
      <Flex gap={11}>
        <AiOutlineDownCircle size={26} />
        <Text
          fz='20px'
          fw='bold'>
          {projectName}
        </Text>
      </Flex>
      <Flex
        direction={'column'}
        gap={'30px'}
        mt={'36px'}>
        {data.map((board: Board) => (
          <BoardOverviewRow
            key={board._id}
            tasks={board.tasks}
            name={board.name}
            color={board.color}
          />
        ))}
      </Flex>
    </div>
  );
};

export default ProjectListView;
