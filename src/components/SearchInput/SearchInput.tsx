import { BsSearch } from 'react-icons/bs';
import React, { useState } from 'react';
import { TextInput } from '../../components';
import { FieldValues, useForm } from 'react-hook-form';
// import { Text } from '@mantine/core';

// interface Task {
//   id: number;
//   name: string;
//   task: string;
// }
type SearchInputProps = {
  pholder: string;
};
const SearchInput = ({ pholder = 'جست و جو ...' }: SearchInputProps) => {
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
  const {
    register, //register function will pass to text inputs
    handleSubmit, //submit function
    formState: { errors }, //error for form validation
  } = useForm<FieldValues>({
    defaultValues: {
      searchValue: '',
    },
  });

  return (
    <>
      <div className='relative'>
        <TextInput
          id='searchValue'
          register={register}
          value={searchTerm}
          noBorder
          onChange={handleChange}
          placeholder={pholder}
          styles={{
            input: {
              textAlign: 'right',
              paddingRight: '35px',
            },
          }}
        />
        <BsSearch
          size={20}
          className='absolute top-2 right-2'
        />
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
