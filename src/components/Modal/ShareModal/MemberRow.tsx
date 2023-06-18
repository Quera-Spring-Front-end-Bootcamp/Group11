import { Avatar, Flex, Text } from '@mantine/core';
import { Button } from '../..';
interface LinkCopyProps {
  currentUserId: string;
  userId: string;
  role?: string;
  firstname?: string;
  lastname?: string;
  username: string;
  email: string;
}

const MemberRow = ({
  currentUserId,
  userId,
  role,
  firstname,
  lastname,
  username,
  email,
}: LinkCopyProps) => {
  let name: string;
  if (currentUserId === userId) {
    name = 'من';
  } else {
    name =
      firstname && lastname
        ? `${firstname} ${lastname}`
        : username
        ? username
        : email;
  }

  return (
    <Flex
      justify={'space-between'}
      align={'center'}>
      <Button
        fz={12}
        p={'2px 12px'}
        h={'auto'}
        variant='outline'
        c='#000'
        bg={'transparent'}
        fw='normal'
        radius='8px'
        styles={{
          root: {
            borderColor: '#E9EBF0',
            '&:hover': {
              backgroundColor: '#00000010',
            },
          },
        }}>
        دسترسی کامل
      </Button>
      <Flex
        // justify={'center'}
        align={'center'}
        gap={'12px'}>
        {role === 'owner' ? (
          <Text className='rounded-6 bg-[#A5E4F8] py-1 px-2 flex items-center justify-center text-xs'>
            Workspace owner
          </Text>
        ) : null}
        <Text>{name}</Text>
        <Avatar
          color='cyan'
          radius='xl'>
          {name[0].toUpperCase()}
        </Avatar>
      </Flex>
    </Flex>
  );
};

export default MemberRow;
