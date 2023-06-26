import { useCallback, useEffect, useMemo, useState } from 'react';
import pda from '@alireza-ab/persian-date';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '@mantine/core';
import { persianDays } from '../../../../constants';
import { usePersianNumberTransform } from '../../../../hook';
import { Button } from '../../..';
import { MdOutlineAddBox } from 'react-icons/md';
import { storeStateTypes } from '../../../../util/types';


type DayItemProps = {
  index: number;
  itemDate: Array<number>;
};

const DayItem = ({ index, itemDate }: DayItemProps) => {
  const { today } = useSelector((state: storeStateTypes) => state.calenderView);
  const toPersian = usePersianNumberTransform();
  const dispatch = useDispatch();

  const [year, month, day] = itemDate;

  const isToday = day === today[2] && month === today[1] && year === today[0];

  return (
    <>
      <div
        onClick={() => {
          console.log(year, month, day);
        }}
        style={{
          border: isToday ? '2.5px solid green' : '0.75px solid #00000020',
        }}
        className='relative w-full h-full border-[1.5px] border-b p-2 bg-[#fff] group'>
        <Text className='font-semibold'>{persianDays[index]}</Text>
        <Text className='absolute bottom-2 left-4 font-semibold'>
          {toPersian(day)}
        </Text>
        <Button
          p={0}
          w={'auto'}
          h={'auto'}
          className='absolute bottom-2 right-4 opacity-0 group-hover:opacity-100 transition'>
          <MdOutlineAddBox size={25} />
        </Button>
      </div>
    </>
  );
};

export default DayItem;
