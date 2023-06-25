import { useCallback, useEffect, useMemo, useState } from 'react';
import pda from '@alireza-ab/persian-date';
import { useDispatch } from 'react-redux';
import { Text } from '@mantine/core';
import { persianDays } from '../../../../constants';
import { usePersianNumberTransform } from '../../../../hook';

type TodayTypes = {
  instance: any;
  arrayDate: Array<number>;
};

type DayItemProps = {
  index: number;
  year?: number;
  month?: number;
  day?: number;
  today?: Array<number>;
};

const DayItem = ({ index, year, month, day, today }: DayItemProps) => {
  const toPersian = usePersianNumberTransform();
  const dispatch = useDispatch();

  const todayObj: TodayTypes = useMemo(() => {
    const today = new pda();

    const dateObj = {
      instance: today,
      arrayDate: today
        .toString('jYYYY jM jD')
        .split(' ')
        .map((dt: string) => +dt),
    };

    return dateObj;
  }, []);

  return (
    <>
      <div className='relative w-full h-full border-l border-b p-2 bg-white'>
        <Text>{persianDays[index]}</Text>
        <div className='absolute bottom-2 left-4'>{toPersian(day)}</div>
      </div>
    </>
  );
};

export default DayItem;
