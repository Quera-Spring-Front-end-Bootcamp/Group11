const CalenderProjectView = () => {
  return (
    <div className='h-full p-5'>
      <div className='h-full w-full grid grid-cols-7 grid-rows-5 border-r border-t'>
        {Array(35)
          .fill('i')
          .map((elem,i) => (
            <div className='w-full h-full border-l border-b'>{i}</div>
          ))}
      </div>
    </div>
  );
};

export default CalenderProjectView;
