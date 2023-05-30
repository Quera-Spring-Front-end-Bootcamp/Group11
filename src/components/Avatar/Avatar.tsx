import { Avatar as MantineAvatar } from '@mantine/core';
import type { AvatarProps as MantineAvatarProps } from '@mantine/core';

interface AvatarProps extends MantineAvatarProps {
  onClick?: () => void;
}

const Avatar = ({ size, children, onClick, ...otherProps }: AvatarProps) => {
  return (
    <MantineAvatar
      styles={() => ({
        root: {
          border: '0',
        },
        placeholder: {
          border: '0',
          fontSize: ((size =='md')?'12px':'10px'),
        },
      })}
      size={size}
      radius={'xl'}
      onClick={onClick}
      {...otherProps}>
      {children}
    </MantineAvatar>
  );
};

export default Avatar;
