import { Flex, Text } from '@mantine/core';
import { Button } from '../..';

import { SearchInput } from '../../SearchInput';
import { HiOutlineFilter } from 'react-icons/hi';
import CalenderControl from './CalenderControl';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BoardHeaderSlice } from '../../../redux/slices';

const HeaderControls = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  const handleTaskSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      BoardHeaderSlice.actions.setSearchValue({ searchValue: e.target.value })
    );
  };

  return (
    <Flex
      justify='center'
      align='center'>
      <div className='border-l-[3px] pl-3 border-[#999999] ml-3'>
        <SearchInput
          onChange={handleTaskSearch}
          pholder='جست و جو در تسک‌ها'
        />
      </div>
      {location.pathname.includes('TaskCalendar') ? (
        <CalenderControl />
      ) : (
        <>
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
        </>
      )}
    </Flex>
  );
};

export default HeaderControls;
