import { useState } from 'react';
import Tabs from './Tabs';
import { RiAccountPinBoxFill } from 'react-icons/ri';
import { IconType } from 'react-icons';
import { tabValues } from '../../constants';
import { TabObject } from '../../utils/types';
// import { ShareModal } from '../ShareModal';

type BoardHeaderProps = {
  selectedProject: string;
};

const BoardHeader = ({ selectedProject }: BoardHeaderProps) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const tabsArray: Array<TabObject> = tabValues;
  return (
    <>
      <h1>{selectedProject ? selectedProject : 'هدر'}</h1>

      <Tabs tabs={tabsArray} />

      <div onClick={handleOpenModal}>
        <p>اشتراک گذاری</p>
      </div>
      {/* {openModal && <ShareModal setOpenModal={setOpenModal} />} */}
    </>
  );
};

export default BoardHeader;
