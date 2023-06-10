import React from 'react';

function usePersianNumberTransform(inputString: string) {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishNumbers = /[0-9]/g;

  const transformToPersianNumbers = (str: string) => {
    return str.replace(englishNumbers, (match) => {
      return persianNumbers[parseInt(match)];
    });
  };

  const transformedString = React.useMemo(() => {
    return transformToPersianNumbers(inputString);
  }, [inputString]);

  return transformedString;
}

export default usePersianNumberTransform;
