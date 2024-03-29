import { Button } from '../Button';

import { FiPlusSquare } from 'react-icons/fi';

interface NewTaskButtonProp {
  onClick: () => void;
}

const NewTaskButton = ({ onClick }: NewTaskButtonProp) => {
  return (
    <Button
      pt={'8px'}
      pb={'8px'}
      pl={'12px'}
      pr={'12px'}
      styles={() => ({
        root: {
          width: 'fit-content',
          border: '0',
        },
        leftIcon: {
          marginLeft: '4px',
          marginRight: '0',
          padding: '4px',
        },
      })}
      onClick={onClick}
      leftIcon={<FiPlusSquare size='1.5rem' />}>
      تسک جدید
    </Button>
  );
};

export default NewTaskButton;
