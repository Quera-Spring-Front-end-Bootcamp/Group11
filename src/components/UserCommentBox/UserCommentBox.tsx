import { Flex, Tooltip } from '@mantine/core';
import { Avatar } from '..';
import pda from '@alireza-ab/persian-date';
import { usePersianNumberTransform } from '../../hook';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { DeleteCommentModalSlice } from '../../redux/slices';

interface UserCommentBoxProps {
  user: { _id: string; username: string };
  comment: string;
  createdTime: string;
  commentId: string;
  currentId: string;
  // setComment: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const UserCommentBox = ({
  user,
  comment,
  createdTime,
  commentId,
  currentId,
  // setComment,
  ...otherProps
}: UserCommentBoxProps) => {
  const toPersian = usePersianNumberTransform();
  const dispatch = useDispatch();

  const handleDeleteComment = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    dispatch(DeleteCommentModalSlice.actions.onOpen());
    dispatch(DeleteCommentModalSlice.actions.setCommentId({ commentId }));
  };

  const datePersian = () => {
    const date = new pda();
    const createdTimeArray = new Date(createdTime as string)
      .toLocaleDateString('en-GB')
      .split('/');

    return toPersian(
      date
        .fromGregorian([
          createdTimeArray[2],
          createdTimeArray[1],
          createdTimeArray[0],
        ])
        .toString('jDD jMMMM jy')
    );
  };

  return (
    <Flex
      pt={'10px'}
      direction={'row'}
      align={'start'}
      gap={'12px'}
      {...otherProps}>
      <Avatar
        label={user.username}
        radius={'50%'}
        userId={user._id || (user as unknown as string)}>
        {user.username[0]}
      </Avatar>
      <Flex
        className='rounded-[16px] border-[1px] border-solid border-[#F4F4F4]'
        direction={'column'}
        w={'100%'}
        align={'start'}
        gap={'8px'}
        p={'16px'}>
        <Flex
          w={'100%'}
          direction={'row'}
          align={'center'}
          justify={'space-between'}>
          <Flex
            direction={'row'}
            align={'center'}
            gap={'4px'}>
            <div className='text-16 font-semibold leading-[25px] text-[#208D8E]'>
              {user._id === currentId ? 'شما' : user.username}
            </div>
            <div className='text-12 font-normal leading-19 text-[#AAAAAA]'>
              {user._id === currentId ? 'کامنت گذاشتید' : 'کامنت گذاشته است'}
            </div>
          </Flex>
          <div className='text-12 font-normal leading-19 text-[#AAAAAA]'>
            {datePersian()}
          </div>
        </Flex>
        <Flex
          w={'100%'}
          direction={'row'}
          align={'center'}
          justify={'space-between'}>
          <div>{comment}</div>

          <div>
            <Tooltip
              label='حذف کامنت'
              color='red'
              withArrow
              transitionProps={{ transition: 'scale-x', duration: 300 }}
              position='right'>
              <div>
                <RiDeleteBinLine
                  size={'1.2rem'}
                  className='hover:text-[red] cursor-pointer'
                  onClick={handleDeleteComment}
                />
              </div>
            </Tooltip>
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserCommentBox;
