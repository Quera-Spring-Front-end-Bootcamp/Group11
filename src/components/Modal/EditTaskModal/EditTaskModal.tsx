import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  TextInput as MantineTextInput,
  Textarea as MantineTextArea,
  Tooltip,
  Flex,
  Text,
  Loader,
} from '@mantine/core';
import { Indicator, Menu, Modal, Avatar as MantineAvatar } from '@mantine/core';
import {
  DeleteTagModalSlice,
  EditTaskModalSlice,
  ProjectSlice,
} from '../../../redux/slices';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  Avatar,
  Button,
  CircleButton,
  CommentTextArea,
  UserCommentBox,
} from '../..';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  AiOutlineEye,
  AiOutlinePlusSquare,
  AiOutlineUserAdd,
  AiFillPlayCircle,
  AiOutlineShareAlt,
  AiOutlineCheck,
} from 'react-icons/ai';
import { BiChevronLeft, BiEdit, BiPalette } from 'react-icons/bi';
import {
  BsCheckSquare,
  BsEmojiSmile,
  BsFileEarmark,
  BsFlag,
  BsTags,
} from 'react-icons/bs';
import { priorityItem, tagColors } from '../../../constants';
import {
  assignTaskApi,
  getCommentsApi,
  unassignTaskApi,
  updateTaskInfoApi,
} from '../../../services/taskApi';
import { FaRegCommentDots } from 'react-icons/fa';
import { FiAtSign } from 'react-icons/fi';
import { TiAttachment } from 'react-icons/ti';
import { Comment, Tag, User, storeStateTypes } from '../../../util/types';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { createCommentApi } from '../../../services/commentApi';
import { createTagApi } from '../../../services/tagApi';
import { DeleteCommentModal } from '../DeleteCommentModal';
import { DeleteTagModal } from '../DeleteTagModal';
import { RxCross2 } from 'react-icons/rx';

const EditTaskModal = () => {
  const [loading, setLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [readonly, setReadonly] = useState(true);
  const [showComment, setShowComment] = useState(false);
  const [priority, setpriority] = useState('noPriority');
  const [comment, setComment] = useState<Array<Comment>>([]);

  const dispatch = useDispatch();
  const {
    taskId,
    taskTitle,
    taskDescription,
    taskDeadLine,
    boardId,
    open,
    taskTags,
    taskAssigns,
    projectMemberData,
  } = useSelector((state: storeStateTypes) => state.EditTaskModal);

  useEffect(() => {
    if (!taskId) return;
    const fetchComments = async () => {
      const {
        data: { data: comments },
      } = await getCommentsApi(taskId);
      setComment(comments);
      setLoadingComments(false);
    };
    setLoadingComments(true);
    fetchComments();
  }, [taskId]);


  const prevBoardData = useSelector(
    (state: storeStateTypes) => state.project.selectedProjectBoardData
  );
  const boardData = prevBoardData.find((board) => board._id === boardId);
  const currentId = useSelector((state: storeStateTypes) => state.user.id);
  const members = projectMemberData;
  const prevTags = taskTags;

  const {
    register, //register function will pass to text inputs
    handleSubmit, //submit function
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      commentText: '',
    },
  });

  const priorityColor = (pri: string | null) => {
    if (pri == 'urgent') return '#FB0606';
    if (pri == 'high') return '#FFE605';
    if (pri == 'medium') return '#09DBCE';
    if (pri == 'low') return '#B2ACAC';
    if (pri == 'noPriority') return null;
  };

  const handleAssign = async (member: User) => {
    try {
      const {
        data: {
          data: { user },
        },
      } = await assignTaskApi(taskId, member._id);

      dispatch(
        EditTaskModalSlice.actions.addTaskAssigns({
          newAssignee: user,
          prevData: taskAssigns,
        })
      );
      dispatch(
        ProjectSlice.actions.addTaskAssignee({
          taskId,
          boardId,
          prevBoardData,
          newAssignee: user,
        })
      );
      toast.success('اساین تسک با موفقیت انجام شد');
    } catch (error) {
      console.log(error);
      toast.error('اساین تسک با مشکل مواجه شد');
    }
  };
  const handleUnassign = async (user: User) => {
    try {
      const { data: apiData } = await unassignTaskApi(taskId, user._id);

      dispatch(
        EditTaskModalSlice.actions.deleteTaskAssigns({
          deleteAssigneeId: user._id,
          prevData: taskAssigns,
        })
      );
      console.log(apiData);
      dispatch(
        ProjectSlice.actions.deleteTaskAssignee({
          taskId,
          boardId,
          prevBoardData,
          deleteAssigneeId: user._id,
        })
      );
      toast.success('حذف اساین با موفقیت انجام شد');
    } catch (error) {
      console.log(error);
      toast.error('حذف اساین با مشکل مواجه شد');
    }
  };
  const handleCreateTag = async (name: string) => {
    try {
      const {
        data: {
          data: { tag },
        },
      } = await createTagApi({
        taskId,
        name,
        color: tagColors[Math.floor(Math.random() * tagColors.length)],
      });

      toast.success('تگ با موفقیت ایجاد شد');
      dispatch(
        EditTaskModalSlice.actions.addTag({
          newTag: {
            _id: tag._id,
            tagName: tag.name,
            color: tag.color,
          },
          prevTags,
        })
      );

      console.log(tag);
      // dispatch(
      //   ProjectSlice.actions.addTag({
      //     newTag: {
      //       _id: tag._id,
      //       tagName: tag.name,
      //       color: tag.color,
      //     },
      //     prevTags,
      //   })
      // );
    } catch (error) {
      console.log(error);
      toast.error('ایجاد تگ با مشکل مواجه شد');
    }
  };
  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCreateTag(event.currentTarget.value);

      event.currentTarget.value = '';
    }
  };

  const handleCloseModal = () => {
    dispatch(
      EditTaskModalSlice.actions.setFetchTagTrigger({
        fetchTagTrigger: Date.now(),
      })
    );
    dispatch(EditTaskModalSlice.actions.onClose());
  };
  const handleFocus = () => {
    setReadonly(false);
  };
  const handleBlurTitleInput = async (
    event: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    try {
      const {
        data: {
          data: { name: newName },
        },
      } = await updateTaskInfoApi(taskId, {
        name: event.currentTarget.value,
      });
      dispatch(
        ProjectSlice.actions.renameTask({
          boardId,
          newName,
          prevBoardData,
          taskId,
        })
      );
    } catch (error) {
      console.log(error);
      toast.error('تغییر عنوان تسک با مشکل مواجه شد');
    }
  };
  const handleBlurDescriptionInput = async (
    event: React.FocusEvent<HTMLTextAreaElement, Element>
  ) => {
    try {
      const {
        data: {
          data: { description: newDescription },
        },
      } = await updateTaskInfoApi(taskId, {
        description: event.currentTarget.value,
      });
      console.log(newDescription);
      dispatch(
        ProjectSlice.actions.editDescriptionOfTask({
          boardId,
          newDescription,
          prevBoardData,
          taskId,
        })
      );
    } catch (error) {
      console.log(error);
      toast.error('تغییر توضیحات تسک با مشکل مواجه شد');
    }
  };

  const handlePriorityClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setpriority(e.currentTarget.id);
  };

  const handleDeleteTag = (tagName: string) => {
    dispatch(DeleteTagModalSlice.actions.setTagName({ tagName }));
    dispatch(DeleteTagModalSlice.actions.onOpen());
  };

  const onCommentSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { commentText } = data;
    setLoading(true);
    try {
      const {
        data: { data: newComment },
      } = await createCommentApi({
        taskId,
        text: commentText,
      });

      setComment([...comment, newComment]);

      setShowComment(false);
      setValue('commentText', '');

      toast.success('کامنت با موفقیت ثبت شد');
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('ثبت کامنت با مشکل مواجه شد');
    }
  };

  const handleShowCommentBox = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setShowComment(true);
  };
  const handleHideCommentBox = () => {
    setShowComment(false);
  };
  return (
    <>
      <DeleteCommentModal setComment={setComment} />
      <DeleteTagModal />
      <Modal
        onClick={handleHideCommentBox}
        onClose={handleCloseModal}
        centered={true}
        size='auto'
        radius='20px'
        withCloseButton={false}
        opened={open}
        dir='rtl'
        styles={() => ({
          body: {
            padding: '30px 36px 0 0 ',
          },
        })}>
        <form onSubmit={handleSubmit(onCommentSubmit)}>
          <div className='flex flex-row items-start w-[1345px] h-[596px] overflow-hidden'>
            {/* Right Side */}
            <div className='border-solid border-l-[1px] border-[#F4F4F4] w-[50%] h-full'>
              {/* Right Side top */}
              <div className='flex flex-row items-center justify-between mt-[60px] py-[12px] px-[20px]'>
                {/* Right Side top right*/}
                <div className='flex flex-row gap-[24px] items-center'>
                  <div className='flex flex-row items-center gap-[2px]'>
                    <Tooltip
                      color='teal'
                      transitionProps={{ transition: 'pop', duration: 300 }}
                      position='top'
                      fz={'16px'}
                      label={'عنوان بورد'}>
                      <div
                        style={{
                          backgroundColor: `${
                            boardData?.color ? boardData.color : 'red'
                          }`,
                        }}
                        className='flex flex-col justify-center items-center text-12 font-medium leading-19 text-[#FFFFFF] h-[30px] w-[110px]'>
                        {boardData?.name}
                      </div>
                    </Tooltip>
                    <div
                      style={{
                        backgroundColor: `${
                          boardData?.color ? boardData.color : 'red'
                        }`,
                      }}
                      className='flex flex-col justify-center items-center rounded-[3px_0px_0px_3px] h-[30px] w-[25px]'>
                      <BiChevronLeft
                        color={'#FFFFFF'}
                        size={'1rem'}
                      />
                    </div>
                  </div>
                  <div>
                    <BsCheckSquare
                      color={'#BDBDBD'}
                      size={'1.5rem'}
                    />
                  </div>
                  <div className='flex flex-row gap-[5px]'>
                    <Menu
                      position='bottom'
                      styles={() => ({
                        itemLabel: {
                          textAlign: 'right',
                        },
                      })}>
                      <Menu.Target>
                        <Tooltip
                          color='teal'
                          transitionProps={{ transition: 'pop', duration: 300 }}
                          position='top'
                          fz={'16px'}
                          label={'اساین تسک'}>
                          <CircleButton
                            className='h-[38px] w-[38px] p-0'
                            borderColor={undefined}>
                            <AiOutlineUserAdd size={'1rem'} />
                          </CircleButton>
                        </Tooltip>
                      </Menu.Target>

                      <Menu.Dropdown>
                        {members.map((member) => {
                          return (
                            <Menu.Item
                              onClick={() => {
                                taskAssigns.some(
                                  (item) => item._id === member.user._id
                                )
                                  ? toast.error('قبلا اساین شده')
                                  : handleAssign(member.user);
                              }}
                              id={member.user._id}
                              key={member.user._id}>
                              <Flex
                                direction={'row'}
                                align={'center'}
                                gap={'12px'}>
                                <Avatar
                                  userId={member.user._id}
                                  label={`${member.user.firstname} ${member.user.lastname}`}
                                  color='cyan'
                                  radius='xl'
                                />
                                {member.user._id === currentId ? (
                                  <Text className='rounded-6 bg-[#A5E4F8] py-1 px-2 flex items-center justify-center text-xs'>
                                    شما
                                  </Text>
                                ) : null}
                                <Text>{`${member.user.firstname} ${member.user.lastname}`}</Text>
                                {taskAssigns.some(
                                  (item) => item._id === member.user._id
                                ) && (
                                  <Tooltip
                                    color='teal'
                                    transitionProps={{
                                      transition: 'pop',
                                      duration: 300,
                                    }}
                                    position='top'
                                    fz={'14'}
                                    label={'اساین شده'}>
                                    <div>
                                      <AiOutlineCheck
                                        size={'1.1rem'}
                                        color={'blue'}
                                      />
                                    </div>
                                  </Tooltip>
                                )}
                              </Flex>
                            </Menu.Item>
                          );
                        })}
                      </Menu.Dropdown>
                    </Menu>
                    {taskAssigns.length > 0 && (
                      <MantineAvatar.Group>
                        {taskAssigns.map((user: User) => {
                          return (
                            <Avatar
                              onClick={() => {
                                handleUnassign(user);
                              }}
                              labelColor='#BE123C'
                              key={user._id}
                              userId={user._id}
                              label={'برای حذف اساین کلیک کنید'}
                              radius={'50%'}
                            />
                          );
                        })}
                      </MantineAvatar.Group>
                    )}
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
                        <Tooltip
                          color='teal'
                          transitionProps={{ transition: 'pop', duration: 300 }}
                          position='top'
                          fz={'16px'}
                          label={'تعیین اولویت'}>
                          <CircleButton
                            className='h-[38px] w-[38px] p-0'
                            borderColor={priorityColor(priority)}>
                            <BsFlag
                              size={'1rem'}
                              color={priorityColor(priority)}
                            />
                          </CircleButton>
                        </Tooltip>
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
                  <div className='flex flex-row gap-[10px]'>
                    <AiOutlineShareAlt
                      size={'1.2rem'}
                      color={'#BDBDBD'}
                    />
                    <div className='text-16 font-medium leading-[25px]'>
                      اشتراک گذاری
                    </div>
                  </div>
                  <div>
                    <HiOutlineDotsHorizontal
                      size={'1.2rem'}
                      color={'#BDBDBD'}
                    />
                  </div>
                </div>
              </div>
              {/*middle line*/}
              <hr className='mt-[24px] border-solid border-[1px] border-[#F4F4F4]' />
              {/* Right Side bottom */}
              <div className='flex flex-col gap-[24px] mt-[24px]'>
                <div className='flex flex-row items-center gap-[5px]'>
                  <Menu position='top-start'>
                    <Menu.Target>
                      <Tooltip
                        color='teal'
                        transitionProps={{ transition: 'pop', duration: 300 }}
                        position='top'
                        fz={'16px'}
                        label={'تگ های تسک'}>
                        <CircleButton
                          borderColor={undefined}
                          className='h-[50px] w-[50px] p-0'>
                          <BsTags
                            size={'1.5rem'}
                            color={'##C1C1C1'}
                          />
                        </CircleButton>
                      </Tooltip>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <div className='flex flex-col gap-[16px] p-[12px]'>
                        <MantineTextInput
                          onKeyDown={handleEnterKey}
                          styles={() => ({
                            input: {
                              textAlign: 'right',
                              paddingLeft: '0px',
                              fontSize: '12px',
                            },
                          })}
                          placeholder='عنوان تگ را وارد کنید'
                        />
                        <div className='text-12 font-normal leading-19 text-center'>
                          برای ساختن تگ جدید اینتر بزنید
                        </div>
                      </div>
                    </Menu.Dropdown>
                  </Menu>
                  {taskTags && (
                    <div className='flex flex-row gap-[10px] items-center'>
                      {taskTags?.map((item: Tag) => {
                        return (
                          <div key={item._id}>
                            <Menu>
                              <Menu.Target>
                                <Box
                                  id={item._id}
                                  sx={() => ({
                                    backgroundColor: item.color,
                                    height: '31px',
                                    padding: '5px 8px',
                                    borderRadius: '6px',
                                  })}
                                  className='w-fit'>
                                  {item.tagName}
                                </Box>
                              </Menu.Target>

                              <Menu.Dropdown>
                                <Menu.Item
                                  onClick={() => {
                                    handleDeleteTag(item.tagName);
                                  }}>
                                  <div className='flex flex-row items-center gap-[4px]'>
                                    <RxCross2
                                      size={'1.1rem'}
                                      color={'#BDBDBD'}
                                    />
                                    <div className='text-[12px] font-normal leading-[16px]'>
                                      حذف تگ
                                    </div>
                                  </div>
                                </Menu.Item>
                                <Menu.Item>
                                  <div className='flex flex-row items-center gap-[4px]'>
                                    <BiEdit
                                      size={'1.1rem'}
                                      color={'#BDBDBD'}
                                    />
                                    <div className='text-[12px] font-normal leading-[16px]'>
                                      ویرایش تگ
                                    </div>
                                  </div>
                                </Menu.Item>
                                <Menu.Item>
                                  <div className='flex flex-row items-center gap-[4px]'>
                                    <BiPalette
                                      size={'1rem'}
                                      color={'#BDBDBD'}
                                    />
                                    <div className='text-[12px] font-normal leading-[16px]'>
                                      ویرایش رنگ
                                    </div>
                                  </div>
                                </Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div>
                  <div className='mb-[12px]'>
                    <MantineTextInput
                      readOnly={readonly}
                      onBlur={handleBlurTitleInput}
                      onFocus={handleFocus}
                      defaultValue={taskTitle}
                      id={'name'}
                      placeholder='عنوان تسک'
                      styles={() => ({
                        wrapper: {
                          paddingLeft: '20px',
                        },
                        input: {
                          padding: '5px',
                          border: 'none',
                          fontSize: '24px',
                          fontWeight: 'bold',
                          textAlign: 'right',
                          '&:focus': {
                            backgroundColor: '#FAFAF9',
                            border: '1px solid blue',
                          },
                        },
                      })}
                    />
                  </div>
                  <MantineTextArea
                    onBlur={handleBlurDescriptionInput}
                    defaultValue={taskDescription}
                    minRows={3}
                    id='description'
                    placeholder='توضیحاتی برای این تسک بنویسید'
                    styles={() => ({
                      wrapper: {
                        paddingLeft: '20px',
                      },
                      input: {
                        padding: '12px',
                        border: '1px solid #C1C1C1',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        lineHeight: '25px',
                        textAlign: 'right',
                        '&:focus': {
                          backgroundColor: '#FAFAF9',
                          border: '1px solid blue',
                        },
                      },
                    })}
                  />
                </div>
                <div className='flex items-center gap-[8px] text-[#208D8E]'>
                  <AiOutlinePlusSquare size={'1.2rem'} />
                  <span className='text-12 font-medium leading-19'>
                    اضافه کردن چک لیست
                  </span>
                </div>
                <div className='flex items-center gap-[8px] text-[#208D8E]'>
                  <AiOutlinePlusSquare size={'1.2rem'} />
                  <span className='text-12 font-medium leading-19'>
                    اضافه کردن پیوست
                  </span>
                </div>
              </div>
            </div>

            {/* Left Side */}
            <div className='w-[50%] h-full flex flex-col justify-between relative'>
              <div>
                <div className='pt-[3px] pl-[33px]'>
                  <Modal.CloseButton
                    className='mr-auto'
                    m={'0px'}
                    p={'0px'}
                    onClick={handleCloseModal}
                    size={'1.2rem'}
                  />
                </div>
                {/* Left Side top*/}
                <div className='flex flex-row items-center justify-between pr-[20px] pl-[36px] pt-[33px]'>
                  {/* Left Side top right*/}
                  <div className='flex flex-row items-center pt-[4.5px]'>
                    <div className='flex flex-col gap-[5px] pl-[28px] border-solid border-l-[1px] border-[#F4F4F4]'>
                      <div className='text-12 text-[#BBBBBB] font-medium leading-19'>
                        ساخته شده در
                      </div>
                      <div className='text-16 font-medium leading-25'>----</div>
                    </div>
                    <div className='flex flex-col gap-[5px] px-[28px] border-solid border-l-[1px] border-[#F4F4F4]'>
                      <div className='text-12 text-[#BBBBBB] font-medium leading-19'>
                        زمان
                      </div>
                      <div className='flex flex-row items-center gap-[7px]'>
                        <AiFillPlayCircle
                          color={'#80C959'}
                          size={'1.1rem'}
                        />
                        <div className='text-16 font-medium'>00:00:00</div>
                      </div>
                    </div>
                    <div className='flex flex-col gap-[5px] pr-[28px]'>
                      <div className='text-12 text-[#BBBBBB] font-medium leading-19'>
                        ددلاین
                      </div>
                      <div className='text-16 font-medium leading-25'>
                        {taskDeadLine}
                      </div>
                    </div>
                  </div>
                  {/* Left Side top left*/}
                  <div className='flex flex-row items-center '>
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

                {/*middle line*/}
                <hr className='mt-[34.5px] border-solid border-[1px] border-[#F4F4F4]' />
                <div className='flex flex-col justify-between mt-[24px]'>
                  <div className='flex flex-col pl-[36px] pr-[20px] h-[360px] overflow-auto scrollbar-none'>
                    {!loadingComments ? (
                      comment.length > 0 &&
                      comment.map((item: Comment) => (
                        <UserCommentBox
                          currentId={currentId}
                          key={item._id}
                          commentId={item._id}
                          user={item.user}
                          comment={item.text}
                          createdTime={item.createdAt}
                        />
                      ))
                    ) : (
                      <div className='w-full h-full grid justify-center items-center'>
                        <Loader />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                onClick={handleShowCommentBox}
                className={
                  'transition-all duration-300 absolute bottom-0 left-0 right-0 bg-[white] overflow-hidden' +
                  (showComment
                    ? ` h-[200px] rounded-t-[12px]
              drop-shadow-[0px_-4px_12px_rgba(0,0,0,0.25)]`
                    : ' h-[67px]')
                }>
                <hr
                  className={
                    'border-solid border-[1px] border-[#F4F4F4]' +
                    (showComment && ' invisible')
                  }
                />
                <div className='flex flex-col justify-between  pr-[16px] pl-[36px]'>
                  <div className='flex flex-row justify-between overflow-hidden'>
                    <div className='grow '>
                      <CommentTextArea
                        minRows={!showComment ? 1 : 6}
                        id='commentText'
                        placeholder='کامنت'
                        register={register}
                      />
                    </div>
                    <div className='pt-[13px] pr-[20px]'>
                      <FaRegCommentDots
                        size={'1.2rem'}
                        color={'#AEAEAE'}
                      />
                    </div>
                  </div>
                  <div
                    className={
                      'flex flex-row justify-between items-center mb-[20px] h-fit ' +
                      (!showComment && 'hidden')
                    }>
                    <div className='flex flex-row items-center gap-[20px]'>
                      <div>
                        <FiAtSign
                          size={'1.2rem'}
                          color={'#AEAEAE'}
                        />
                      </div>
                      <div>
                        <TiAttachment
                          size={'1.5rem'}
                          color={'#AEAEAE'}
                        />
                      </div>
                      <div>
                        <BsFileEarmark
                          size={'1.2rem'}
                          color={'#AEAEAE'}
                        />
                      </div>
                      <div>
                        <BsEmojiSmile
                          size={'1.2rem'}
                          color={'#AEAEAE'}
                        />
                      </div>
                    </div>
                    <div>
                      <Button
                        py={'6px'}
                        px={'12px'}
                        loading={loading}
                        type='submit'
                        fz={'12px'}
                        fw={'600'}
                        lh={'18px'}
                        radius={'4px'}
                        h={'31px'}>
                        ثبت کامنت
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditTaskModal;
