import React from 'react';

import { Container } from '../components';
import { CreateWorkSpaceModal } from '../components/Modal';

export interface AuthPageProps {}

const Board: React.FC<AuthPageProps> = ({}) => {
  return (
    <>
      <CreateWorkSpaceModal />
      <Container>
        <div className='h-screen flex'>
          <div className='bg-slate-400 w-[340px]'>{/* <sideBar/> */}</div>
          <div className='bg-red-300 w-[calc(100%-340px)] flex flex-col'>
            <div className='h-[170px] bg-sky-600'>{/* <Header/> */}</div>

            <div className='h-[calc(100%-170px)] bg-green-400'>
              {/* <boardElement/> */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Board;
