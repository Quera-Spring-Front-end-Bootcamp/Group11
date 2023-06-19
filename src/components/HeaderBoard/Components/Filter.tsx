import { Flex, Text } from '@mantine/core';
import { Button } from '../..';

import { SearchInput } from '../../SearchInput';
import { HiOutlineFilter } from 'react-icons/hi';

const Filter = () => {
  // const {
  //   register, //register function will pass to text inputs
  //   // handleSubmit, //submit function
  //   // setValue,
  // } = useForm<FieldValues>({
  //   defaultValues: {
  //     searchValue: '',
  //   },
  // });

  return (
    <Flex
      justify='center'
      align='center'>
      <div className='border-l-[3px] pl-3 border-[#999999] ml-3'>
        <SearchInput pholder='جست و جو در تسک‌ها' />
      </div>
      <Button
        leftIcon={<HiOutlineFilter size={22} />}
        sx={{
          padding: '0',
          backgroundColor: 'transparent !important',
          color: 'black !important',
        }}
        // classNames='bg-transparent'
      >
        فیلتر‌ها
      </Button>
      <Text className='rounded-6 bg-[#E9F9FF] py-2 px-2 flex items-center justify-center text-sm'>
        دسته‌بندی‌شده با: وضعیت
      </Text>
    </Flex>
  );
};

export default Filter;
