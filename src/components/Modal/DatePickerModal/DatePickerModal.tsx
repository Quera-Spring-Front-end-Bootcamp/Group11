import { Flex, Modal as MantineModal } from '@mantine/core';
import { ModalProps as MantineModalProps } from '@mantine/core';
import { useEffect, useState } from 'react';
import pd from 'persian-date';
import { Button } from '../..';
import { usePersianNumberTransform } from '../../../hook';

interface ModalProps extends MantineModalProps {}

const DatePickerModal = ({ ...otherProps }: ModalProps) => {
  const toPersion = usePersianNumberTransform();
  const [month, setMonth] = useState<number | undefined>();
  const [day, setDay] = useState<number | undefined>();
  const [year, setYear] = useState<number | undefined>();
  const [startOfMonth, setStartOfMonth] = useState('');

  const dateObj = new pd([year, month, day]);
  const persianMonths = [
    ['فروردین', 1],
    ['اردیبهشت', 2],
    ['خرداد', 3],
    ['تیر', 4],
    ['مرداد', 5],
    ['شهریور', 6],
    ['مهر', 7],
    ['آبان', 8],
    ['آذر', 9],
    ['دی', 10],
    ['بهمن', 11],
    ['اسفند', 12],
  ];

  //prettier-ignore
  const persianDays = {
    شنبه: 1,
    یکشنبه: 2,
    دوشنبه: 3,
    'سه شنبه': 4,
    'چهار شنبه': 5,
    'پنج‌شنبه': 6,
    جمعه: 7,
  };

  // const today = new pd([1402, 3, 9]).toLocale('fa').format('M,dddd');
  // console.log(today);

  useEffect(() => {
    const date = new pd();
    setMonth(+date.toLocale('en').format('M'));
    setDay(+date.toLocale('en').format('D'));
    setYear(+date.toLocale('en').format('YYYY'));
    setStartOfMonth(date.startOf('month').toLocale('fa').format('dddd'));
  }, []);

  console.log(dateObj.format());

  // const startDay = persianDays.find(day => )

  // console.log('start', startOfMonth);

  const dayCount = month < 7 ? 31 : month === 12 ? 29 : 30;
  const startDayOfMonth = persianDays[startOfMonth];

  // console.log(startOfMonth);

  // console.log(persianDays[startOfMonth]);

  // console.log(month);

  return (
    <>
      <MantineModal
        radius='md'
        size={'936px'}
        styles={() => ({
          root: {
            position: 'relative',
          },
          // content: { width: '470px', padding: '0px 16px 12px 16px' },
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
          header: {
            // padding: '24px 0',
          },
        })}
        centered
        withCloseButton={false}
        {...otherProps}>
        <MantineModal.Body>
          <div className='w-full h-[100px]'>
            ددلاین
            <Button
              onClick={() => {
                const next = month + 1;
                console.log(next);
                setMonth(next);
                console.log(day);
                console.log(day === 31 ? (next >= 7 ? 30 : day) : day);
                const date = new pd([
                  year,
                  next,
                  day === 31 ? (next >= 7 ? 30 : day) : day,
                ]);
                setStartOfMonth(
                  date.startOf('month').toLocale('fa').format('dddd')
                );
                setDay(day === 31 ? (next >= 7 ? 30 : day) : day);
              }}>
              بعد
            </Button>
            <Button
              onClick={() => {
                setMonth(month - 1);
                const date = new pd([year, month - 1, day]);
                setStartOfMonth(
                  date.startOf('month').toLocale('fa').format('dddd')
                );
              }}>
              قبل
            </Button>
            {month && persianMonths[month - 1][0]}
          </div>
          <Flex className='w-full h-[490px]'>
            <Flex
              dir='rtl'
              className='w-2/3'>
              <Flex className='grid w-full grid-cols-7 grid-rows-7 '>
                {Object.keys(persianDays).map((day, i) => (
                  <div className='self-center place-self-center text-[16px] text-[#CCCFD5]'>
                    {day}
                  </div>
                ))}
                {Array(
                  dayCount + startDayOfMonth - 1
                    ? dayCount + startDayOfMonth - 1
                    : 0
                )
                  .fill('')
                  .map((day, i) => {
                    if (i < persianDays[startOfMonth] - 1) return <div></div>;

                    const dayPersian = toPersion(
                      `${i - persianDays[startOfMonth] + 2}`
                    );

                    return (
                      <div className='self-center place-self-center font-semibold text-[20px]'>
                        {dayPersian}
                      </div>
                    );
                  })}
              </Flex>
            </Flex>
            <div className='w-1/3 bg-[#F7F8F9]'></div>
          </Flex>
        </MantineModal.Body>
      </MantineModal>
    </>
  );
};

export default DatePickerModal;
