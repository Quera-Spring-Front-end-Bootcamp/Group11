import { forwardRef } from 'react';

import { Action, ActionProps } from '../Action';
import { MdDragHandle } from 'react-icons/md';

export const Handle = forwardRef<HTMLButtonElement, ActionProps>(
  (props, ref) => {
    return (
      <Action
        ref={ref}
        cursor='grab'
        data-cypress='draggable-handle'
        {...props}>
        <MdDragHandle size={20} />
      </Action>
    );
  }
);
