import { useMemo } from 'react';
import pda from '@alireza-ab/persian-date';
import { useSelector } from 'react-redux';

import DayItem from './Components/DayItem';
import { storeStateTypes } from '../../../util/types';

const CalenderProjectView = () => {
  const { month, startOfMonth, year } = useSelector(
    (state: storeStateTypes) => state.calenderView
  );

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

  let nextMonthDaysCounter = 1;

  const forPrevMonth = (index: number) => index < startOfMonth - 1;

  const forNextMonth = (index: number) =>
    index > thisMonthDayCount + startOfMonth - 2;

  const dateCalculatorForDayItem = (index: number) => {
    const itemDay = forPrevMonth(index)
      ? prevMonthDayCount - startOfMonth + 2 + index
      : forNextMonth(index)
      ? nextMonthDaysCounter++ && nextMonthDaysCounter - 1
      : index - startOfMonth + 2;

    const itemMonth = forNextMonth(index)
      ? month === 12
        ? 1
        : month + 1
      : forPrevMonth(index)
      ? month === 1
        ? 12
        : month - 1
      : month;

    const itemYear = forNextMonth(index)
      ? month === 12
        ? year + 1
        : year
      : forPrevMonth(index)
      ? month === 1
        ? year - 1
        : year
      : year;

    return [itemYear, itemMonth, itemDay];
  };

  return (
    <div className='h-full p-5'>
      <div
        style={{
          gridTemplateRows:
            thisMonthDayCount + startOfMonth - 1 > 35
              ? 'repeat(6, minmax(0, 1fr)'
              : 'repeat(5, minmax(0, 1fr)',
        }}
        className='h-full w-full grid grid-cols-7 border-r border-t'>
        {Array(
          thisMonthDayCount + startOfMonth - 1
            ? thisMonthDayCount + startOfMonth - 1 > 35
              ? 42
              : 35
            : 0
        )
          .fill('i')
          .map((_, i) => {
            // const day =
            return (
              <DayItem
                key={i}
                index={i}
                itemDate={dateCalculatorForDayItem(i)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CalenderProjectView;
