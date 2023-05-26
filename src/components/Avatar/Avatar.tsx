import { Avatar as MantineAvatar } from '@mantine/core';
import type { AvatarProps as MantineAvatarProps } from '@mantine/core';

interface AvatarProps extends MantineAvatarProps {
  onClick?: () => void;
}

const Avatar = ({ children, onClick, ...otherProps }: AvatarProps) => {
  return (
    <MantineAvatar
      styles={() => ({
        root: {
          border: '0',
        },
        placeholder: {
          border: '0',
          fontSize: '14px',
        },
      })}
      radius={'xl'}
      onClick={onClick}
      {...otherProps}>
      {children}
    </MantineAvatar>
  );
};

export default Avatar;
