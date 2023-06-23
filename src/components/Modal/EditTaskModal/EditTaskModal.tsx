import { useDispatch, useSelector } from 'react-redux';
import { Box, TextInput as MantineTextInput, Tooltip } from '@mantine/core';
import { Indicator, Button as MantineBtn, Menu, Modal } from '@mantine/core';
import { EditTaskModalSlice } from '../../../redux/slices';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button, CircleButton, TextArea, TextInput } from '../..';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineUserAdd } from 'react-icons/ai';
import { BsFlag, BsSearch, BsTags, BsThreeDots } from 'react-icons/bs';
import { priorityItem } from '../../../constants';
import { createTaskApi } from '../../../services/taskApi';

type EditTaskModalprop = {
  boardId: string;
};

const EditTaskModal = ({ boardId }: EditTaskModalprop) => {
  const [loading, setLoading] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [priority, setpriority] = useState('noPriority');
  const [selectedTags, setselectedTags] = useState<any>([]);

  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.EditTaskModal.open);

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
      boardId: '',
      taskTitle: '',
      description: '',
      project: '',
      tags: [],
      priority: '',
    },
  });

  const handleCloseModal = () => {
    dispatch(EditTaskModalSlice.actions.onClose());
  };
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

  const handleChange = () => {
    setdisabled(false);
  };

  useEffect(() => {
    setValue('tags', selectedTags);
    setValue('priority', priority);
    setValue('boardId', boardId);
  }, [boardId, priority, selectedTags, setValue]);

  const handleSelectedTag = (event) => {
    const updateSelectedTags = selectedTags.filter((item) => {
      item.id !== event.currentTarget.id;
    });
    setselectedTags(updateSelectedTags);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const { name, description, boardId } = data;
    setLoading(true);
    try {
      const { data: apiData } = await createTaskApi({
        name,
        description,
        boardId,
      });
      // dispatch(
      //   userSlice.actions.setUserPersonaInfo({ firstname, lastname, phone })
      // );
      console.log(apiData);
      toast.success('ایجاد تسک جدید با موفقیت انجام شد');
      setLoading(false);
      setdisabled(true);
      handleCloseModal();
    } catch (error) {
      console.log(error);
      toast.error('ایجاد تسک جدید با مشکل مواجه شد');
    }
  };

  return (
    <Modal
      closeOnClickOutside={false}
      onClose={handleChange}
      centered={true}
      size='auto'
      radius='20px'
      withCloseButton={false}
      opened={open}
      dir='rtl'>
      <Modal.Header className='flex items-center mb-[35px]'>
        <Modal.CloseButton
          onClick={handleCloseModal}
          size={'1.5rem'}
        />
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-row items-center w-[1350px]'>
            {/* Right Side */}
            <div className='pt-[14px] border-solid border-l-[1px] border-[#ff0000] items-center w-[50%]'>
              {/* Right Side top */}
              <div className='flex flex-row gap-[128px] px-[20px] pb-[38px] pt-[14px] items-center border-solid border-b-[1px] border-[#ff0000]'>
                {/* Right Side top right*/}
                <div className='flex flex-row gap-[24px] items-center'>
                  <div>open</div>
                  <div>checkBox</div>
                  <div>
                    <CircleButton
                      className='h-[34px] w-[34px] p-0'
                      borderColor={undefined}>
                      <AiOutlineUserAdd size={'1rem'} />
                    </CircleButton>
                  </div>
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
                        {priorityItem.map(
                          ({ id, icon: Icon, color, label }) => {
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
                          }
                        )}
                      </Menu.Dropdown>
                    </Menu>
                  </div>
                </div>
                {/* Right Side top left*/}
                <div className='flex flex-row gap-[20px] items-center'>
                  <div>share</div>
                  <div>3dot</div>
                </div>
              </div>
              <div className='flex flex-col gap-[24px] mt-[24px]'>
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
                        {selectedTags.map((item) => {
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
                  TAsk title
                  <TextArea
                    w='620px'
                    minRows={3}
                    onChange={handleChange}
                    id='description'
                    register={register}
                    placeholder='توضیحاتی برای این تسک بنویسید'
                  />
                </div>
                <div>checklist</div>
                <div>پیوست</div>
              </div>
            </div>

            {/* Left Side */}
            <div className='px-[20px] w-[50%]'>
              <div className='flex flex-row gap-[128px] px-[20px] pb-[38px] pt-[14px] items-center border-solid border-b-[1px] border-[#ff0000]'>
                {/* Left Side top right*/}
                <div className='flex flex-row gap-[24px] items-center'>
                  <div>ساخته شده در</div>
                  <div>زمان</div>
                  <div>ددلاین</div>
                </div>
                {/* Right Side top left*/}
                <div className='flex flex-row gap-[20px] items-center'>
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
            </div>
          </div>
        </form>

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
      </Modal.Body>
    </Modal>
  );
};

export default EditTaskModal;
