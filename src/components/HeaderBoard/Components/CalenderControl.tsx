import pda from '@alireza-ab/persian-date';
import { Flex } from '@mantine/core';
import { Button } from '../..';
import { useDispatch, useSelector } from 'react-redux';
import { storeStateTypes } from '../../../util/types';
import { useCallback } from 'react';
import { CalenderViewSlice } from '../../../redux/slices';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { usePersianNumberTransform } from '../../../hook';

const CalenderControl = () => {
  const dispatch = useDispatch();
  const toPersian = usePersianNumberTransform();
  const { day, month, year, today } = useSelector(
    (state: storeStateTypes) => state.calenderView
  );

  const onNextMonthClickHandler = useCallback(() => {
    const next = month + 1;
    if (next === 13) {
      const date = new pda([year + 1, 1, 1], 'jalali');
      const startOfMonth = +date.startOf('month').toString('jd') + 1;

      dispatch(
        CalenderViewSlice.actions.setDate({
          day: 1,
          month: 1,
          year: year + 1,
          startOfMonth,
        })
      );

      return;
    }

    const dayCalculated =
      day === 31 || day === 30
        ? next === 12
          ? pda.isLeapYear('jalali', year)
            ? 30
            : 29
          : next >= 7
          ? day
          : day
        : day;

    const date = new pda([year, next, dayCalculated], 'jalali');
    const startOfMonth = +date.startOf('month').toString('jd') + 1;

    dispatch(
      CalenderViewSlice.actions.setDate({
        day: dayCalculated,
        month: next,
        year: year,
        startOfMonth,
      })
    );
  }, [month, year]);

  const onPreviousMonthClickHandler = useCallback(() => {
    const prev = month - 1;
    if (prev === 0) {
      const date = new pda([year - 1, 12, 1], 'jalali');
      const startOfMonth = +date.startOf('month').toString('jd') + 1;

      dispatch(
        CalenderViewSlice.actions.setDate({
          day: 1,
          month: 12,
          year: year - 1,
          startOfMonth,
        })
      );

      return;
    }
    const dayCalculated = day === 30 ? (prev <= 6 ? 31 : 30) : day;
    const date = new pda([year, month - 1, dayCalculated], 'jalali');
    const startOfMonth = +date.startOf('month').toString('jd') + 1;
    dispatch(
      CalenderViewSlice.actions.setDate({
        day: dayCalculated,
        month: prev,
        year: year,
        startOfMonth,
      })
    );
  }, [month, year]);

  const onTodayClickHandler = useCallback(() => {
    dispatch(
      CalenderViewSlice.actions.setDate({
        day: today[2],
        month: today[1],
        year: today[0],
        startOfMonth: today[3],
      })
    );
  }, [JSON.stringify(today)]);

  return (
    <Flex
      gap='20px'
      align='center'
      mr='24px'>
      <Button
        onClick={onTodayClickHandler}
        c='#000'
        px={15}
        py={4}
        h={'auto'}
        className='transition'
        styles={{
          root: {
            backgroundColor: '#00000010',

            '&:hover': {
              backgroundColor: '#00000020',
            },
          },
        }}>
        امروز
      </Button>
      <Flex gap='12px'>
        <Button
          onClick={onNextMonthClickHandler}
          c='#000'
          p={0}
          h='15px'
          w='15px'
          styles={{
            root: {
              backgroundColor: 'transparent',

              '&:hover': {
                backgroundColor: 'transparent',
              },
            },
          }}
          icon={GrFormNext}
        />
        <Button
          onClick={onPreviousMonthClickHandler}
          c='#000'
          p={0}
          h='15px'
          w='15px'
          styles={{
            root: {
              backgroundColor: 'transparent',

              '&:hover': {
                backgroundColor: 'transparent',
              },
            },
          }}
          icon={GrFormPrevious}
        />
      </Flex>

      <div>
        {toPersian(
          new pda([year, month, day], 'jalali').toString('jMMM jYYYY')
        )}
      </div>
    </Flex>
  );
};

export default CalenderControl;
