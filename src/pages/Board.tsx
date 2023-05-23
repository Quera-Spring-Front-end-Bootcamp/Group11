import { Container } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { CreateWorkSpaceModal } from '../components/Modal';

type BoardPageProps = {};

const Board = ({}): BoardPageProps => {
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
