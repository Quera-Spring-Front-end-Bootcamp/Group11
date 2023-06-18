import { useEffect, useRef, MouseEvent, ReactNode } from 'react';

interface ClickOutsideWrapperProps {
  onOutsideClick: () => void;
  children: ReactNode;
}

const ClickOutsideWrapper = ({
  children,
  onOutsideClick,
}: ClickOutsideWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onOutsideClick();
      }
    };

    document.addEventListener(
      'mouseup',
      handleClickOutside as unknown as EventListener
    );

    return () => {
      document.removeEventListener(
        'mouseup',
        handleClickOutside as unknown as EventListener
      );
    };
  }, [onOutsideClick]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default ClickOutsideWrapper;
