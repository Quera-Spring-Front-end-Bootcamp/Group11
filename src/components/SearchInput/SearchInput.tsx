import { BsSearch } from 'react-icons/bs';
import React from 'react';
import { TextInput } from '../../components';
import { FieldValues, useForm } from 'react-hook-form';
type SearchInputProps = {
  pholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const SearchInput = ({
  pholder = 'جست و جو ...',
  onChange,
}: SearchInputProps) => {
  const {
    register, //register function will pass to text inputs
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
          noBorder
          onChange={onChange}
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
    </>
  );
};
export default SearchInput;
