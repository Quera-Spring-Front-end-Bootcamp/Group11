function swapElements(array: Array<any>, index1: number, index2: number) {
  // Use array destructuring to swap the elements
  const newArray = [...array];
  [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
  return newArray;
}

export default swapElements;
