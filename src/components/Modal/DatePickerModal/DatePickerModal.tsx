import { Text, Flex, Modal as MantineModal } from '@mantine/core';
import { ModalProps as MantineModalProps } from '@mantine/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import pda from '@alireza-ab/persian-date';
import { Button } from '../..';
import { usePersianNumberTransform } from '../../../hook';
import DayItem from './DayItem';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { persianDays } from '../../../constants';
import { BsCalendar4Event } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { storeStateTypes } from '../../../util/types';
import { NewTaskModalSlice } from '../../../redux/slices';

type SideDatesTypes = Record<
  string,
  { instance: pda; text: string; value: string }
>;

type TodayTypes = {
  instance: any;
  arrayDate: Array<number>;
  sideDates: SideDatesTypes;
};

type SideDateTextProps = {
  text: string;
  value: string;
  dateInstance: pda;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};
const SideDateText = ({
  text,
  value,
  dateInstance,
  setSelectedDate,
}: SideDateTextProps) => {
  const disptach = useDispatch();
  const toPersian = usePersianNumberTransform();
  return (
    <Flex
      onClick={() => {
        setSelectedDate(
          toPersian(dateInstance.toString('jddd jD jMMMM jYYYY'))
        );

        const dateTS = dateInstance.valueOf();
        disptach(NewTaskModalSlice.actions.setDeadline({ deadline: dateTS }));
      }}
      dir='rtl'
      className='w-full justify-between items-center cursor-pointer hover:bg-slate-300/20 rounded-md p-2'>
      <div className='text-[20px] font-semibold'>{text}</div>
      <div className='text-[16px] text-[#CCCFD5] font-semibold'>
        {toPersian(value)}
      </div>
    </Flex>
  );
};

const DatePickerModal = ({ ...otherProps }: MantineModalProps) => {
  const toPersian = usePersianNumberTransform();
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [year, setYear] = useState<number>(1400);
  const [startOfMonth, setStartOfMonth] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState('');

  const deadline = useSelector(
    (state: storeStateTypes) => state.NewTaskModal.deadline
  );

  const todayObj: TodayTypes = useMemo(() => {
    const today = new pda();
    const tomorrow = new pda().addDay(1);
    const thisWeekend = new pda().endOf('week');
    const nextWeek = new pda().addWeek(1).startOf('week');
    const nextWeekend = new pda().addWeek(1).endOf('week');
    const nextTwoWeeks = new pda().addWeek(2).startOf('week');
    const nextFourWeeks = new pda().addWeek(4).startOf('week');

    const dateObj = {
      instance: today,
      arrayDate: today
        .toString('jYYYY jM jD')
        .split(' ')
        .map((dt: string) => +dt),
      sideDates: {
        today: {
          instance: today,
          value: today.toString('jddd'),
          text: 'امروز',
        },
        tomorrow: {
          instance: tomorrow,
          value: tomorrow.toString('jddd'),
          text: 'فردا',
        },
        thisWeekend: {
          instance: thisWeekend,
          value: thisWeekend.toString('jD jMMM'),
          text: 'این آخر هفته',
        },
        nextWeek: {
          instance: nextWeek,
          value: nextWeek.toString('jD jMMM'),
          text: 'هفته‌ی آینده',
        },
        nextWeekend: {
          instance: nextWeekend,
          value: nextWeekend.toString('jD jMMM'),
          text: 'آخرهفته‌ی آینده',
        },
        nextTwoWeeks: {
          instance: nextTwoWeeks,
          value: nextTwoWeeks.toString('jD jMMM'),
          text: 'دو هفته دیگر',
        },
        nextFourWeeks: {
          instance: nextFourWeeks,
          value: nextFourWeeks.toString('jD jMMM'),
          text: 'چهار هفته دیگر',
        },
      },
    };

    return dateObj;
  }, []);

  const dayCount = useMemo(() => {
    return month < 7
      ? 31
      : month === 12 && pda.isLeapYear('jalali', year)
      ? 30
      : month === 12
      ? 29
      : 30;
  }, [month, year]);

  const onNextMonthClickHandler = useCallback(() => {
    const next = month + 1;
    if (next === 13) {
      setDay(1);
      setMonth(1);
      setYear(year + 1);
      const date = new pda([year + 1, 1, 1], 'jalali');
      setStartOfMonth(+date.startOf('month').toString('jd') + 1);
      return;
    }

    setMonth(next);
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
    setStartOfMonth(+date.startOf('month').toString('jd') + 1);
    setDay(dayCalculated);
  }, [month, year]);

  const onPreviousMonthClickHandler = useCallback(() => {
    const prev = month - 1;
    if (prev === 0) {
      setDay(1);
      setMonth(12);
      setYear(year - 1);
      const date = new pda([year - 1, 12, 1], 'jalali');
      setStartOfMonth(+date.startOf('month').toString('jd') + 1);
      return;
    }
    setMonth(prev);
    const dayCalculated = day === 30 ? (prev <= 6 ? 31 : 30) : day;
    const date = new pda([year, month - 1, dayCalculated], 'jalali');
    setStartOfMonth(+date.startOf('month').toString('jd') + 1);
    setDay(dayCalculated);
  }, [month, year]);

  const onTodayClickHandler = useCallback(() => {
    setYear(todayObj.arrayDate[0]);
    setMonth(todayObj.arrayDate[1]);
    setDay(todayObj.arrayDate[2]);
    setStartOfMonth(
      +new pda([todayObj.arrayDate[0], todayObj.arrayDate[1]], 'jalali')
        .startOf('month')
        .toString('jd') + 1
    );
  }, [todayObj]);

  useEffect(() => {
    const date = new pda();
    setDay(+date.toString('jD'));
    setMonth(+date.toString('jM'));
    setYear(+date.toString('jYYYY'));
    setStartOfMonth(+date.startOf('month').toString('jd') + 1);
  }, []);

  return (
    <MantineModal
      radius='md'
      size={'936px'}
      styles={() => ({
        root: {
          position: 'absolute',
          zIndex: 999,
        },
        body: {
          padding: 0,
          margin: 0,
        },
        title: {
          textAlign: 'center',
          width: '100%',
          fontSize: '24px',
          fontWeight: 'bold',
        },
        header: {},
      })}
      centered
      withCloseButton={false}
      {...otherProps}>
      <MantineModal.Body>
        <Flex
          dir='rtl'
          className='w-full h-[90px] items-center px-8 gap-3 text-[24px]'>
          <BsCalendar4Event color={'#BDBDBD'} />
          <Text>زمان پایان:</Text>
          <Text>{deadline ? selectedDate : ''}</Text>
        </Flex>

        <Flex className='w-full h-[490px] border-[#E4E4E4] border-t-[3px]'>
          <Flex
            dir='rtl'
            direction='column'
            className='w-2/3'>
            <Flex
              gap='28px'
              className='text-[20px] py-5 items-center'>
              <Flex
                justify='space-between'
                className='w-32'>
                <Text className='w-full text-center'>
                  {new pda([year, month, day], 'jalali').toString('jMMM')}
                </Text>
                <Text>{year && toPersian(year)}</Text>
              </Flex>
              <Flex gap='8px'>
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
            </Flex>
            <Flex className='grid h-full w-full grid-cols-7 grid-rows-7 '>
              {persianDays.map((day) => (
                <div
                  key={day}
                  className='self-center place-self-center text-[16px] text-[#bec0c4]'>
                  {day}
                </div>
              ))}
              {Array(
                dayCount + startOfMonth - 1 //if NaN array count is 0
                  ? dayCount +
                      startOfMonth - //add extra empty cells if month starts in the middle of the week
                      1
                  : 0
              )
                .fill('')
                .map((_, i) => (
                  <DayItem
                    key={i}
                    today={todayObj.arrayDate}
                    isEmpty={i < startOfMonth - 1} //if less than start of week index then cell is empty
                    year={year}
                    month={month}
                    day={i - startOfMonth + 2} //month day number [1:31]
                    setSelectedDate={setSelectedDate}
                  />
                ))}
            </Flex>
            <div className='w-full flex justify-end pb-5 pl-5'>
              <Button w='125px'>بستن</Button>
            </div>
          </Flex>
          <Flex
            direction='column'
            className='w-1/3 h-full px-5 pb-16 pt-6 justify-between bg-[#F7F8F9]'>
            {Object.keys(todayObj.sideDates).map((item) => (
              <SideDateText
                key={item}
                setSelectedDate={setSelectedDate}
                dateInstance={
                  todayObj.sideDates[item as keyof SideDatesTypes].instance
                }
                text={todayObj.sideDates[item as keyof SideDatesTypes].text}
                value={todayObj.sideDates[item as keyof SideDatesTypes].value}
              />
            ))}
          </Flex>
        </Flex>
      </MantineModal.Body>
    </MantineModal>
  );
};

export default DatePickerModal;
