import { Flex, Text } from '@mantine/core';
import { Button } from '../..';
import { FiLink } from 'react-icons/fi';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface LinkCopyProps {
  link: string;
}

const LinkCopy = ({ link = 'https://privateLink' }: LinkCopyProps) => {
  return (
    <Flex justify={'space-between'}>
      <CopyToClipboard
        text={link}
        onCopy={() => {}}>
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
          کپی لینک
        </Button>
      </CopyToClipboard>
      <div className='flex items-center gap-2'>
        <Text fz={14}>لینک خصوصی</Text>
        <FiLink size={16} />
      </div>
    </Flex>
  );
};

export default LinkCopy;
