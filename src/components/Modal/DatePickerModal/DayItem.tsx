import pda from '@alireza-ab/persian-date';
import { usePersianNumberTransform } from '../../../hook';
import { useDispatch } from 'react-redux';
import { NewTaskModalSlice } from '../../../redux/slices';

type DayItemProps = {
  isEmpty?: boolean;
  today: Array<number>;
  year?: number;
  month?: number;
  day?: number;
};
const DayItem = ({ isEmpty, year, month, day, today }: DayItemProps) => {
  const dispatch = useDispatch();
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

          dispatch(
            NewTaskModalSlice.actions.setDeadline({
              deadline: dateOfItemInstance.valueOf(),
              deadLinePersianFormatted: toPersian(
                dateOfItemInstance.toString('jddd jD jMMMM jYYYY')
              ),
            })
          );
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
