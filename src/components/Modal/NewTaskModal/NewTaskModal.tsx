import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Flex,
  TextInput as MantineTextInput,
  Tooltip,
} from '@mantine/core';
import { Indicator, Button as MantineBtn, Menu, Modal } from '@mantine/core';
import { ProjectSlice, NewTaskModalSlice } from '../../../redux/slices';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button, CircleButton, TextArea, TextInput } from '../..';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { TiAttachment } from 'react-icons/ti';
import { AiOutlineEye, AiOutlineUserAdd } from 'react-icons/ai';
import pda from '@alireza-ab/persian-date';
import {
  BsCalendar3,
  BsFlag,
  BsSearch,
  BsTags,
  BsThreeDots,
} from 'react-icons/bs';
import { priorityItem } from '../../../constants';
import { createTaskApi } from '../../../services/taskApi';
import { storeStateTypes } from '../../../util/types';
import { DatePickerModal } from '..';
import { usePersianNumberTransform } from '../../../hook';

const NewTaskModal = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [priority, setpriority] = useState('noPriority');
  const [selectedTags, setSelectedTags] = useState<any>([]);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const toPersian = usePersianNumberTransform();
  const dispatch = useDispatch();

  const deadline = useSelector(
    (state: storeStateTypes) => state.NewTaskModal.deadline
  );
  const open = useSelector((state: storeStateTypes) => state.NewTaskModal.open);
  const boardId = useSelector(
    (state: storeStateTypes) => state.NewTaskModal.boardId
  );
  const prevBoardData = useSelector(
    (state: storeStateTypes) => state.project.selectedProjectBoardData
  );
  const project = useSelector(
    (state: storeStateTypes) => state.project.selectedProjectName
  );
  const tags = [
    {
      tagName: 'My Tag1',
      id: '1',
      color: '#0000FF',
    },
    {
      tagName: 'My Tag2',
      id: '2',
      color: '#FB0606',
    },
    {
      tagName: 'My Tag3',
      id: '3',
      color: '#09DBCE',
    },
    {
      tagName: 'My Tag4',
      id: '4',
      color: '#B2ACAC',
    },
  ];

  const priorityColor = (pri: string | null) => {
    if (pri == 'urgent') return '#FB0606';
    if (pri == 'high') return '#FFE605';
    if (pri == 'medium') return '#09DBCE';
    if (pri == 'low') return '#B2ACAC';
    if (pri == 'noPriority') return null;
  };

  const {
    register, //register function will pass to text inputs
    handleSubmit, //submit function
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      deadline: '',
    },
  });

  const handleSelectTag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    selectedTags.length === 0
      ? setSelectedTags((prev: any) => [
          ...prev,
          tags.filter((item) => item.id === e.currentTarget.id)[0],
        ])
      : selectedTags.every(
          (item: { id: string }) => item.id != e.currentTarget.id
        ) &&
        setSelectedTags((prev: any) => [
          ...prev,
          tags.filter((item) => item.id === e.currentTarget.id)[0],
        ]);
  };
  const handlePriorityClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setpriority(e.currentTarget.id);
  };

  const handleClose = () => {
    dispatch(NewTaskModalSlice.actions.onClose());

    //empty all data on close modal
    setTimeout(function () {
      setValue('tags', []);
      setValue('priority', '');
      setValue('deadline', '');
      dispatch(
        NewTaskModalSlice.actions.setDeadline({
          deadline: 0,
          deadLinePersianFormatted: '',
        })
      );
    }, 300);
  };

  const handleChange = () => {
    setDisabled(false);
  };

  useEffect(() => {
    setValue('tags', selectedTags);
    setValue('priority', priority);
    setValue('deadline', new Date(deadline).toISOString());
  }, [priority, selectedTags, setValue, deadline]);

  const handleSelectedTag = (event: any) => {
    const updateSelectedTags = selectedTags.filter((item: any) => {
      item.id !== event.currentTarget.id;
    });
    setSelectedTags(updateSelectedTags);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { name, description, deadline } = data;
    const haveDeadLine = !!+new Date(deadline).valueOf();
    setLoading(true);
    try {
      const {
        data: { data: createdTask },
      } = await createTaskApi({
        name,
        description,
        deadline: haveDeadLine ? deadline : undefined,
        boardId,
      });

      toast.success('تسک جدید با موفقیت ایجاد شد');
      setLoading(false);
      setDisabled(true);

      dispatch(NewTaskModalSlice.actions.onClose());
      dispatch(
        NewTaskModalSlice.actions.setDeadline({
          deadline: 0,
          deadLinePersianFormatted: '',
        })
      );
      dispatch(
        ProjectSlice.actions.addCreatedTaskToBoard({
          boardId,
          createdTask,
          prevBoardData,
        })
      );
      setValue('name', '');
      setValue('description', '');
      setValue('deadline', '');
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('مشکلی پیش آمده است، لطفا مجددا تلاش فرمایید');
    }
  };

  const taskModalTitle = (
    <div className='flex flex-row items-center gap-[13px] w-[100%]'>
      <Box
        sx={() => ({
          height: '16px',
          width: '16px',
          borderRadius: '2px',
          backgroundColor: '#D9D9D9',
        })}
      />
      <TextInput
        onChange={handleChange}
        data-autofocus
        w={'50%'}
        id='name'
        register={register}
        placeholder='عنوان تسک'
      />
    </div>
  );

  const dateObj = useMemo(() => new pda(), []);

  return (
    <>
      <DatePickerModal
        opened={openDatePicker}
        onClose={() => setOpenDatePicker(false)}
      />
      <Modal
        closeOnClickOutside={true}
        onClose={handleClose}
        centered={true}
        size='auto'
        radius='20px'
        withCloseButton={false}
        opened={open}
        dir='rtl'>
        <Modal.Header className='flex items-center justify-between mb-[40px]'>
          {taskModalTitle}
          <Modal.CloseButton size={'1.5rem'} />
        </Modal.Header>
        <Modal.Body>
          <form
            className='flex flex-col  gap-[40px] p-[36px 44px] w-[100%]'
            onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-row items-center gap-[8px] '>
              <span>در</span>
              <Tooltip
                color='red'
                position='top'
                transitionProps={{ transition: 'pop', duration: 300 }}
                label={'عنوان پروژه'}>
                <span className='p-[5px] rounded-[10px] bg-green-300 font-semibold'>
                  {project}
                </span>
              </Tooltip>

              <span>برای</span>

              <div>
                <CircleButton
                  className='h-[34px] w-[34px] p-0'
                  borderColor={undefined}>
                  <AiOutlineUserAdd size={'1rem'} />
                </CircleButton>
              </div>
            </div>
            <div>
              <TextArea
                onChange={handleChange}
                id='description'
                register={register}
                placeholder='توضیحاتی برای این تسک بنویسید'
              />
            </div>
            <div className='flex flex-row items-center gap-[15px]'>
              <span>افزودن پیوست</span>
              <MantineBtn
                px={'8px'}
                c={'#1E1E1E'}
                color='#208D8E'
                variant='outline'
                h={'32px'}
                radius={'8px'}
                fz={'16px'}
                fw={'400'}
                lh={'25px'}>
                <TiAttachment
                  color='#208D8E'
                  size={'1.5rem'}
                  className='m-0 p-0'
                />
                آپلود فایل
              </MantineBtn>
            </div>
            <div className='flex flex-row justify-between items-center'>
              <div className='flex flex-row items-center gap-[24px]'>
                <div>
                  <Menu
                    position='top'
                    width={'165px'}
                    styles={() => ({
                      itemLabel: {
                        textAlign: 'right',
                        marginRight: '12px',
                      },
                    })}>
                    <Menu.Target>
                      <CircleButton borderColor={priorityColor(priority)}>
                        <BsFlag
                          size={'1.5rem'}
                          color={priorityColor(priority)}
                        />
                      </CircleButton>
                    </Menu.Target>

                    <Menu.Dropdown>
                      {priorityItem.map(({ id, icon: Icon, color, label }) => {
                        return (
                          <Menu.Item
                            icon={
                              <Icon
                                size={'1.3rem'}
                                color={color}
                              />
                            }
                            onClick={handlePriorityClick}
                            id={id}
                            key={id}>
                            {label}
                          </Menu.Item>
                        );
                      })}
                    </Menu.Dropdown>
                  </Menu>
                </div>
                <div>
                  <CircleButton
                    onClick={() => setOpenDatePicker(true)}
                    borderColor={deadline ? '#84C6A1' : '#C1C1C1'}>
                    <BsCalendar3
                      size={'1.5rem'}
                      color={deadline ? '#84C6A1' : '#C1C1C1'}
                    />
                  </CircleButton>
                </div>
                <div>
                  <Menu
                    closeOnItemClick={false}
                    position='top'
                    width={'175px'}>
                    <Menu.Target>
                      <CircleButton borderColor={undefined}>
                        <BsTags
                          size={'1.5rem'}
                          color={'##C1C1C1'}
                        />
                      </CircleButton>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <div className='flex flex-wrap gap-2'>
                        {selectedTags.map((item: any) => {
                          return (
                            <Tooltip label='برای حذف تگ کلیک کن'>
                              <Box
                                onClick={handleSelectedTag}
                                key={item.id}
                                sx={() => ({
                                  backgroundColor: item.color,
                                  color: 'white',
                                  height: '31px',
                                  padding: '5px 8px',
                                  borderRadius: '6px',
                                })}
                                className='w-fit cursor-pointer'>
                                {item.tagName}
                              </Box>
                            </Tooltip>
                          );
                        })}
                      </div>
                      <Menu.Item>
                        <MantineTextInput
                          rightSection={<BsSearch />}
                          styles={() => ({
                            input: {
                              textAlign: 'right',
                              paddingRight: '30px',
                              paddingLeft: '0px',
                              fontSize: '12px',
                            },
                          })}
                          placeholder='جستجو یا ساختن تگ'
                        />
                      </Menu.Item>
                      <div className='flex flex-col gap-[12px] mt-[12px] h-[100px] scrollbar-none overflow-y-auto'>
                        {tags.map((item) => {
                          return (
                            <Menu.Item
                              key={item.id}
                              py={'0px'}
                              px={'12px'}>
                              <div className='flex flex-row justify-between items-center'>
                                <Box
                                  id={item.id}
                                  onClick={handleSelectTag}
                                  sx={() => ({
                                    backgroundColor: item.color,
                                    color: 'white',
                                    height: '31px',
                                    padding: '5px 8px',
                                    borderRadius: '6px',
                                  })}
                                  className='w-fit'>
                                  {item.tagName}
                                </Box>
                                <div>
                                  <Menu width={'80px'}>
                                    <Menu.Target>
                                      <BsThreeDots />
                                    </Menu.Target>

                                    <Menu.Dropdown className='absolute '>
                                      <Menu.Item>سلام</Menu.Item>
                                      <Menu.Item>سلام</Menu.Item>
                                    </Menu.Dropdown>
                                  </Menu>
                                </div>
                              </div>
                            </Menu.Item>
                          );
                        })}
                      </div>
                    </Menu.Dropdown>
                  </Menu>
                </div>
                <div>
                  <Indicator
                    offset={3}
                    label={'۲'}
                    size={16}>
                    <AiOutlineEye
                      color={'#BDBDBD'}
                      size={'2rem'}
                    />
                  </Indicator>
                </div>

                <Flex
                  gap={10}
                  justify='center'
                  align='center'>
                  ددلاین:
                  <div className='bg-green-400/50 rounded-6 px-2 py-1 font-bold'>
                    {deadline
                      ? toPersian(
                          dateObj
                            .fromGregorian(deadline)
                            .toString('jddd jD jMMMM jy')
                        )
                      : 'نامشخص'}
                  </div>
                </Flex>
              </div>
              <Button
                py={'7px'}
                disabled={disabled}
                loading={loading}
                type='submit'
                fz={'12px'}
                fw={'500'}
                lh={'18px'}
                radius={'4px'}
                h={'32px'}
                w={'125px'}>
                ساختن تسک
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewTaskModal;
