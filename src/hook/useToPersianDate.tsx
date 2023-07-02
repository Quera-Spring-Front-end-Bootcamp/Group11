import { useMemo } from 'react';
import pda from '@alireza-ab/persian-date';
import { usePersianNumberTransform } from '.';

function useToPersianDate() {
  const toPersian = usePersianNumberTransform();
  const toJalaliDate = (deadline?: string) => {
    const datePersian = useMemo(() => {
      if (!deadline) return 'نامشخص';
      const date = new pda();
      const deadLineArray = new Date(deadline)
        .toLocaleDateString('en-GB')
        .split('/');

      return date
        .fromGregorian([deadLineArray[2], deadLineArray[1], deadLineArray[0]])
        .toString('jDD jMMMM jy');
    }, [deadline]);

    return toPersian(datePersian);
  };

  return toJalaliDate;
}

export default useToPersianDate;
