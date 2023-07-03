import { Avatar as MantineAvatar, Tooltip } from '@mantine/core';
import type { AvatarProps as MantineAvatarProps } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getUserApi } from '../../services/userApi';

interface AvatarProps extends MantineAvatarProps {
  onClick?: () => void;
  fontSize?: string;
  userId?: string;
  label?: string;
  labelColor?: string;
}

const Avatar = ({
  fontSize,
  size,
  children,
  onClick,
  userId,
  label,
  labelColor,
  ...otherProps
}: AvatarProps) => {
  const [profileUrl, setProfileUrl] = useState();

  const fetchUser = async () => {
    if (!userId) return;
    const {
      data: {
        data: { profile_url },
      },
    } = await getUserApi(userId);

    setProfileUrl(profile_url);
  };

  useEffect(() => {
    if (!userId) return;
    if (profileUrl) return;

    fetchUser();
  }, []);

  return (
    <Tooltip
      color={labelColor}
      label={label}
      withArrow>
      <MantineAvatar
        className='cursor-pointer'
        src={profileUrl}
        styles={() => ({
          root: {
            border: '0',
          },
          placeholder: {
            border: '0',
            fontSize: fontSize,
          },
        })}
        size={size}
        onClick={onClick}
        color='cyan'
        {...otherProps}>
        {children}
      </MantineAvatar>
    </Tooltip>
  );
};

export default Avatar;
