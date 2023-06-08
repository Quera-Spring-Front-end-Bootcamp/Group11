import { Flex, Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import { AiOutlineDownCircle } from 'react-icons/ai';

const ProjectListView = () => {
  const data = useSelector(
    (state: any) => state.board.selectedProjectBoardData
  );
  const projectName = useSelector(
    (state: any) => state.board.selectedProjectName
  );
  console.log(data);

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
        {data.map((board) => (
          <div key={board.name}>{board.name}</div>
        ))}
      </Flex>
    </div>
  );
};

export default ProjectListView;
