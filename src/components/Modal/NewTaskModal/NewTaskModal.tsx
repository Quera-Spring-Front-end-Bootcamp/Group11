import { useDispatch, useSelector } from 'react-redux';
import { Box, TextInput as MantineTextInput, Tooltip } from '@mantine/core';
import { Select } from 'react-hook-form-mantine';
import { Indicator, Button as MantineBtn, Menu, Modal } from '@mantine/core';
import { NewTaskModalSlice } from '../../../redux/slices';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button, CircleButton, TextArea, TextInput } from '../..';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TiAttachment } from 'react-icons/ti';
import { AiOutlineEye, AiOutlineUserAdd } from 'react-icons/ai';
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

const NewTaskModal = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [priority, setpriority] = useState('noPriority');
  const [selectedTags, setselectedTags] = useState<any>([]);

  const dispatch = useDispatch();
  const open = useSelector((state: storeStateTypes) => state.NewTaskModal.open);
  const boardId = useSelector(
    (state: storeStateTypes) => state.NewTaskModal.boardId
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

  const priortyColor = (pri: string | null) => {
    if (pri == 'urgent') return '#FB0606';
    if (pri == 'high') return '#FFE605';
    if (pri == 'medium') return '#09DBCE';
    if (pri == 'low') return '#B2ACAC';
    if (pri == 'noPriority') return null;
  };

  const {
    control,
    register, //register function will pass to text inputs
    handleSubmit, //submit function
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      taskTitle: '',
      description: '',
      project: '',
      tags: [],
      priority: '',
    },
  });

  const handleSelectTag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    selectedTags.length === 0
      ? setselectedTags((prev: any) => [
          ...prev,
          tags.filter((item) => item.id === e.currentTarget.id)[0],
        ])
      : selectedTags.every(
          (item: { id: string }) => item.id != e.currentTarget.id
        ) &&
        setselectedTags((prev: any) => [
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
  };

  const handleChange = () => {
    setdisabled(false);
  };

  useEffect(() => {
    setValue('tags', selectedTags);
    setValue('priority', priority);
  }, [priority, selectedTags, setValue]);

  const handleSelectedTag = (event: any) => {
    const updateSelectedTags = selectedTags.filter((item: any) => {
      item.id !== event.currentTarget.id;
    });
    setselectedTags(updateSelectedTags);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const { name, description } = data;
    setLoading(true);
    try {
      const { data: apiData } = await createTaskApi({
        name,
        description,
        boardId,
      });

      console.log(apiData);
      toast.success('ایجاد تسک جدید با موفقیت انجام شد');
      setLoading(false);
      setdisabled(true);
      dispatch(NewTaskModalSlice.actions.onClose());
    } catch (error) {
      console.log(error);
      toast.error('ایجاد تسک جدید با مشکل مواجه شد');
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

  return (
    <Modal
      closeOnClickOutside={true}
      onClose={handleClose}
      centered={true}
      size='auto'
      radius='20px'
      withCloseButton={false}
      opened={open}
      dir='rtl'>
      <Modal.Header className='flex items-center mb-[40px]'>
        <Modal.CloseButton size={'1.5rem'} />
        {taskModalTitle}
      </Modal.Header>
      <Modal.Body>
        <form
          className='flex flex-col  gap-[40px] p-[36px 44px] w-[100%]'
          onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-row items-center gap-[8px] '>
            <span>در پروژه</span>
            <Select
              searchable
              data={['project1', 'project2']}
              name={'project'}
              control={control}
            />
            {/*data from redux*/}
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
                    <CircleButton borderColor={priortyColor(priority)}>
                      <BsFlag
                        size={'1.5rem'}
                        color={priortyColor(priority)}
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
                <CircleButton borderColor={undefined}>
                  <BsCalendar3
                    size={'1.5rem'}
                    color={'##C1C1C1'}
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
  );
};

export default NewTaskModal;
