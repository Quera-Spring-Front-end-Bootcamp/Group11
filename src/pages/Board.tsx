import React from 'react';

import { Container } from '../components';
import { CreateWorkSpaceModal } from '../components/Modal';

export interface AuthPageProps {}

const Board: React.FC<AuthPageProps> = ({}) => {
  return (
    <>
      <CreateWorkSpaceModal />
      <Container>
        <div className='bg-red-400/30 h-screen grid justify-center items-center text-[10rem]'>
          صفحه اصلی
        </div>
      </Container>
    </>
  );
};

export default Board;
