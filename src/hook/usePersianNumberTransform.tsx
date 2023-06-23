function usePersianNumberTransform() {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishNumbers = /[0-9]/g;

  const transformToPersianNumbers = (str: string | number | undefined) => {
    return `${str}`.replace(englishNumbers, (match) => {
      return persianNumbers[parseInt(match)];
    });
  };

  return transformToPersianNumbers;
}

export default usePersianNumberTransform;
