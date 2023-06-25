import { useCallback, useEffect, useMemo, useState } from 'react';
import pda from '@alireza-ab/persian-date';
import { useDispatch } from 'react-redux';

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

  const dayCount = useMemo(() => {
    return month < 7
      ? 31
      : month === 12 && pda.isLeapYear('jalali', year)
      ? 30
      : month === 12
      ? 29
      : 30;
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

  return (
    <div className='h-full p-5'>
      <div className='h-full w-full grid grid-cols-7 grid-rows-6 border-r border-t'>
        {Array(
          dayCount + startOfMonth - 1 //if NaN array count is 0
            ? dayCount +
                startOfMonth - //add extra empty cells if month starts in the middle of the week
                1
            : 0
        )
          .fill('i')
          .map((elem, i) => {
            if (i < startOfMonth - 1)
              return <div className='w-full h-full border-l border-b'></div>;
            return (
              <div className='w-full h-full border-l border-b'>
                {i - startOfMonth + 2}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CalenderProjectView;
