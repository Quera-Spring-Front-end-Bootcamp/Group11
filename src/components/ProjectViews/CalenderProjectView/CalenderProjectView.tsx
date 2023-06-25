import { useCallback, useEffect, useMemo, useState } from 'react';
import pda from '@alireza-ab/persian-date';
import { useDispatch } from 'react-redux';
import { Button, Text } from '@mantine/core';
import DayItem from './Components/DayItem';

type TodayTypes = {
  instance: any;
  arrayDate: Array<number>;
};

const CalenderProjectView = () => {
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [year, setYear] = useState<number>(1400);
  const [startOfMonth, setStartOfMonth] = useState<number>(1);

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

  const dayOfMonth = (month: number, year: number) => {
    return month < 7
      ? 31
      : month === 12 && pda.isLeapYear('jalali', year)
      ? 30
      : month === 12
      ? 29
      : 30;
  };

  const thisMonthDayCount = useMemo(() => {
    return dayOfMonth(month, year);
  }, [month, year]);

  const prevMonthDayCount = useMemo(() => {
    const prevMonth = month - 1 === 0 ? 12 : month - 1;
    const prevMonthYear = month - 1 === 0 ? year - 1 : year;
    return dayOfMonth(prevMonth, prevMonthYear);
  }, [month, year]);

  const nextMonthDayCount = useMemo(() => {
    const nextMonth = month + 1 === 13 ? 1 : month + 1;
    const nextMonthYear = month + 1 === 13 ? year + 1 : year;
    return dayOfMonth(nextMonth, nextMonthYear);
  }, [month, year]);

  useEffect(() => {
    const date = new pda();
    setDay(+date.toString('jD'));
    setMonth(+date.toString('jM'));
    setYear(+date.toString('jYYYY'));
    setStartOfMonth(+date.startOf('month').toString('jd') + 1);
  }, []);

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

  let nextMonthDaysCounter = 1;
  const forPrevMonth = (num: number) => num < startOfMonth - 1;

  const forNextMonth = (num: number) =>
    num > thisMonthDayCount + startOfMonth - 2;

  return (
    <div className='h-full p-5'>
      <div
        style={{
          gridTemplateRows:
            thisMonthDayCount + startOfMonth - 1 > 35 ? 'repeat(6, minmax(0, 1fr)' : 'repeat(5, minmax(0, 1fr)',
        }}
        className='h-full w-full grid grid-cols-7 border-r border-t'>
        <Button
          onClick={onNextMonthClickHandler}
          className='absolute left-10 z-50'></Button>
        {Array(
          thisMonthDayCount + startOfMonth - 1
            ? thisMonthDayCount + startOfMonth - 1 > 35
              ? 42
              : 35
            : 0
        )
          .fill('i')
          .map((elem, i) => {
            const day = forPrevMonth(i)
              ? prevMonthDayCount - startOfMonth + 2 + i
              : forNextMonth(i)
              ? nextMonthDaysCounter++ && nextMonthDaysCounter - 1
              : i - startOfMonth + 2;
            return (
              <DayItem
                key={i}
                index={i}
                year={year}
                month={month}
                day={day}
              />
            );
            // if (i < startOfMonth - 1)
            //   return (
            //     <>
            //       <div className='w-full h-full border-l border-b'>
            //         <Text>{persianDays[i]}</Text>
            //         {prevMonthDayCount - startOfMonth + 2 + i}
            //       </div>
            //     </>
            //   );
            // if (i > thisMonthDayCount + startOfMonth - 2) {
            //   nextMonthDaysCounter++;
            //   return (
            //     <>
            //       <div className='w-full h-full border-l border-b'>
            //         <Text>{persianDays[i]}</Text>
            //         {nextMonthDaysCounter}
            //       </div>
            //     </>
            //   );
            // }

            // return (
            //   <>
            //     <div className='w-full h-full border-l border-b'>
            //       <Text>{persianDays[i]}</Text>
            //       {i - startOfMonth + 2}
            //     </div>
            //   </>
            // );
          })}
      </div>
    </div>
  );
};

export default CalenderProjectView;
