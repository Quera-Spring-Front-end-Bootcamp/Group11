import React from 'react';
import { RxValueNone } from 'react-icons/rx';
import { ColorInput } from '../..';
import { workSpaceColors } from '../../../constants';
import { Modal } from '..';
import { AiOutlineCheck } from 'react-icons/ai';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

type ChangeColorModalProp = {
  setColor: UseFormSetValue<FieldValues>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedWorkSpaceColor: string;
  loading: boolean;
  submit: () => void;
};

const ChangeColorModal = ({
  setColor,
  open,
  setOpen,
  selectedWorkSpaceColor,
  submit,
  loading,
}: ChangeColorModalProp) => {
  console.log(selectedWorkSpaceColor);
  const title = 'انتخاب رنگ ورک‌اسپیس';
  const body = (
    <>
      <div className='grid grid-cols-[6fr,1fr] gap-4'>
        <div className='flex flex-col'>
          <p className='text-right text-14 mb-6'>رنگ ورک‌اسپیس</p>
          <div className='grid grid-cols-[repeat(12,1fr)] gap-2'>
            {workSpaceColors.map((color) => (
              <ColorInput
                key={color}
                width='15px'
                height='15px'
                bg={color}
                radius='2px'
                selected={selectedWorkSpaceColor === color}
                icon={
                  color === null
                    ? RxValueNone
                    : selectedWorkSpaceColor === color
                    ? AiOutlineCheck
                    : null
                }
                onClick={() => setColor('color', color)}
              />
            ))}
          </div>
        </div>
        <div
          style={{ backgroundColor: selectedWorkSpaceColor }}
          className='w-[70px] h-[70px] rounded-8 text-24 font-bold grid justify-center items-center transition'>
          ط ت
        </div>
      </div>
    </>
  );

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title={title}
      body={body}
      actionLabel={'تایید'}
      action={submit}
      loading={loading}
    />
  );
};

export default ChangeColorModal;
