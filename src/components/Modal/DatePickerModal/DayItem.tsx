import pda from '@alireza-ab/persian-date';
import { usePersianNumberTransform } from '../../../hook';

type DayItemProps = {
  isEmpty?: boolean;
  today: Array<number>;
  year?: number;
  month?: number;
  day?: number;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};
const DayItem = ({
  isEmpty,
  year,
  month,
  day,
  today,
  setSelectedDate,
}: DayItemProps) => {
  const toPersian = usePersianNumberTransform();
  const isToday = year === today[0] && month === today[1] && day === today[2];
  const dayNumberPersian = toPersian(day);
  if (isEmpty) return <div></div>;
  return (
    <div
      style={{ border: isToday ? '2px solid #208D8E' : '' }}
      className='h-[40px] w-[40px] self-center place-self-center font-semibold text-[20px] grid justify-center items-center rounded-full'>
      <div
        onClick={() => {
          const dateOfItemInstance = new pda([year, month, day], 'jalali');
          setSelectedDate(
            toPersian(dateOfItemInstance.toString('jddd jD jMMMM jYYYY'))
          );
          const dateTS = new Date(dateOfItemInstance.valueOf()).toISOString();
          console.log(dateTS);
        }}
        className={`
          cursor-pointer
          rounded-4
          grid
          justify-center
          items-center
          h-[40px]
          w-[30px]
          ${!isToday ? 'hover:bg-[#4BECE2]' : ''}
        `}>
        {dayNumberPersian}
      </div>
    </div>
  );
};

export default DayItem;
