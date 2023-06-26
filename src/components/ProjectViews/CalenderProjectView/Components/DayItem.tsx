import { Text } from '@mantine/core';
import pda from '@alireza-ab/persian-date';
import { MdOutlineAddBox } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../..';
import { persianDays } from '../../../../constants';
import { usePersianNumberTransform } from '../../../../hook';
import { storeStateTypes } from '../../../../util/types';
import { useCallback } from 'react';
import { NewTaskModalSlice } from '../../../../redux/slices';

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

  const firstBoardId = useSelector(
    (state: storeStateTypes) => state.project.selectedProjectBoardData[0]._id
  );

  const onTaskAddClickHandler = useCallback(() => {
    const dateSelected = new pda([year, month, day], 'jalali');
    dispatch(NewTaskModalSlice.actions.onOpen());
    dispatch(NewTaskModalSlice.actions.setBoardId({ boardId: firstBoardId }));
    dispatch(
      NewTaskModalSlice.actions.setDeadline({
        deadline: dateSelected.valueOf(),
        deadLinePersianFormatted: toPersian(
          dateSelected.toString('jddd jD jMMMM jYYYY')
        ),
      })
    );
  }, []);

  return (
    <>
      <div
        onClick={() => {}}
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
          className='absolute bottom-2 right-4 opacity-0 group-hover:opacity-100 transition'
          onClick={onTaskAddClickHandler}>
          <MdOutlineAddBox size={25} />
        </Button>
      </div>
    </>
  );
};

export default DayItem;
