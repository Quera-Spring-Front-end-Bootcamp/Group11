import { BsSearch } from 'react-icons/bs';
import React, { useState } from 'react';
import { TextInput } from '../../components';
// import { Text } from '@mantine/core';

// interface Task {
//   id: number;
//   name: string;
//   task: string;
// }

const SearchInput: React.FC = () => {
	// const tasks = [
	// 	{ id: 1, name: 'Mahdi Torkaman', task: 'done some task 1' },
	// 	{ id: 2, name: 'Abolfazl', task: 'task number 2' },
	// ];
	
  const [searchTerm, setSearchTerm] = useState('');
  // const filteredTasks = tasks.filter((task: Task) =>
  //   task.task.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className='relative'>
        <TextInput
          value={searchTerm}
          onChange={handleChange}
          placeholder="جست و جو ..."
          styles={{
            input: {
              textAlign: 'right',
              paddingRight: '35px'
            },
          }}
        />
        <BsSearch size={20} className='absolute top-2 right-2' />
      </div>
      
      {/* Test */}
      {/* {filteredTasks.map((task: Task) => (
        <div key={task.id}>
          <Text>{task.name}</Text>
          <Text>{task.task}</Text>
        </div>
      ))} */}
    </>
  );
};
export default SearchInput;