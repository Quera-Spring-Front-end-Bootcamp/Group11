import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';

import { Handle } from '../Item';

import styles from './Container.module.scss';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { Flex } from '@mantine/core';
import { BoardMenu } from '../../../Menu';
import { useDispatch } from 'react-redux';
import { NewTaskModalSlice } from '../../../../redux/slices';

export interface Props {
  children: React.ReactNode;
  columns?: number;
  label: string;
  boardId: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hover?: boolean;
  handleProps?: React.HTMLAttributes<any>;
  scrollable?: boolean;
  shadow?: boolean;
  placeholder?: boolean;
  unstyled?: boolean;
  onClick?(): void;
}

export const Container = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      boardId,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    }: Props,
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const Component = onClick ? 'button' : 'div';
    const dispatch = useDispatch();

    const onPlusClickHandler = () => {
      console.log(boardId);
      dispatch(NewTaskModalSlice.actions.onOpen());
      dispatch(NewTaskModalSlice.actions.setBoardId({ boardId }));
    };
    const onMenuClickHandler = () => {
      setOpen(true);
    };

    return (
      <Component
        {...props}
        ref={ref}
        style={
          {
            position: 'relative',
            ...style,
            '--columns': columns,
          } as React.CSSProperties
        }
        className={classNames(
          styles.Container,
          unstyled && styles.unstyled,
          horizontal && styles.horizontal,
          hover && styles.hover,
          placeholder && styles.placeholder,
          scrollable && styles.scrollable,
          shadow && styles.shadow
        )}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}>
        {open && (
          <BoardMenu
            open={open}
            setOpen={setOpen}
            boardId={boardId}
          />
        )}
        {label ? (
          <div className={styles.Header}>
            {label}
            <div className={styles.Actions}>
              <Flex gap='5px'>
                <div
                  className='cursor-pointer'
                  onClick={onMenuClickHandler}>
                  <BsThreeDots />
                </div>
                <div
                  className='cursor-pointer'
                  onClick={onPlusClickHandler}>
                  <AiOutlinePlus />
                </div>
              </Flex>

              <Handle {...handleProps} />
            </div>
          </div>
        ) : null}
        {placeholder ? children : <ul>{children}</ul>}
      </Component>
    );
  }
);
