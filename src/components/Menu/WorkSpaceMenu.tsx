import {
  Menu as MantineMenu,
  MenuProps as MantineMenuProps,
} from '@mantine/core';
import OutsideClickHandler from 'react-outside-click-handler';

import { BsLink45Deg, BsTrash3 } from 'react-icons/bs';
import { AiOutlinePlus, AiOutlineShareAlt } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { IoColorPaletteOutline } from 'react-icons/io5';

import { Button, ClickOutsideWrapper } from '..';
import { useDispatch } from 'react-redux';
import {
  onOpen,
  setWorkSpaceId,
} from '../../redux/slices/ModalSlices/CreateModalSlices/CreateProjectModalSlice';

interface MenuProps extends MantineMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  wsId: string;
}
export const WorkSpaceMenu = ({ open, setOpen, wsId }: MenuProps) => {
  const dispatch = useDispatch();

  const onCreateClickHandler = () => {
    dispatch(onOpen());
    dispatch(setWorkSpaceId({ wsId }));
  };
  return (
    <ClickOutsideWrapper
      onOutsideClick={() => {
        setOpen(false);
      }}>
      <MantineMenu
        shadow='sm'
        opened={open}
        onChange={setOpen}
        styles={{
          dropdown: {
            padding: '14px !important',
          },
          item: {
            padding: 4,
            textAlign: 'right',
            margin: '10px 0',
            fontSize: '14px',
          },
          itemIcon: {
            padding: 0,
            margin: '0 0 0 10px',
          },
        }}>
        <MantineMenu.Dropdown>
          <MantineMenu.Item
            onClick={onCreateClickHandler}
            icon={<AiOutlinePlus size={22} />}>
            ساختن پروژه جدید
          </MantineMenu.Item>
          <MantineMenu.Item icon={<FiEdit size={22} />}>
            ویرایش نام ورک‌اسپیس
          </MantineMenu.Item>
          <MantineMenu.Item icon={<IoColorPaletteOutline size={22} />}>
            ویرایش رنگ
          </MantineMenu.Item>
          <MantineMenu.Item icon={<BsLink45Deg size={22} />}>
            کپی لینک
          </MantineMenu.Item>
          <MantineMenu.Item
            c='red'
            icon={<BsTrash3 size={22} />}>
            حذف
          </MantineMenu.Item>
          <Button
            icon={AiOutlineShareAlt}
            className='w-full'>
            اشتراک گذاری
          </Button>
        </MantineMenu.Dropdown>
      </MantineMenu>
    </ClickOutsideWrapper>
  );
};
