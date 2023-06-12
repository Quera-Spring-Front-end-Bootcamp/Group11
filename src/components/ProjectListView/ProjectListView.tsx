import { Flex, Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import { AiOutlineDownCircle } from 'react-icons/ai';
import BoardOverviewRow from './boardOverview';

const ProjectListView = () => {
  const data = useSelector(
    (state: any) => state.board.selectedProjectBoardData
  );
  const projectName = useSelector(
    (state: any) => state.board.selectedProjectName
  );

  return (
    <div className='w-full h-full overflow-auto'>
      <Flex
        align='center'
        gap={11}>
        <AiOutlineDownCircle size={24} />
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
        {data.map((board: any) => (
          <BoardOverviewRow
            key={board._id}
            tasks={board.tasks}
            name={board.name}
            position={board.position - 1}
          />
        ))}
      </Flex>
    </div>
  );
};

export default ProjectListView;
