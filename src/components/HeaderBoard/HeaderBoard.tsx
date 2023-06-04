import { Tabs, Button, Modal } from '@mantine/core';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { CiCircleList } from 'react-icons/ci';
import { BsCalendar4Week } from 'react-icons/bs';
import { BsLayoutWtf } from 'react-icons/bs';

export default function HeaderBoard() {
  const [activeComponent, setActiveComponent] = useState('TaskList');

  const handleTabChange = (value) => {
    setActiveComponent(value);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'TaskList':
        return 'نمایش لیستی';
      case 'TaskColumn':
        return 'نمایش ستونی';
      case 'TaskCalendar':
        return 'تقویم';
      default:
        return null;
    }
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <section className='flex items-center justify-between gap-5'>
        <div className='flex items-center gap-5 py-5 text-xl'>
          <div className='font-bold'>پروژه اول</div>
          <Tabs
            defaultValue='TaskList'
            onTabChange={handleTabChange}>
            <Tabs.List>
              <Tabs.Tab
                value='TaskList'
                icon={<CiCircleList />}>
                نمایش لیستی
              </Tabs.Tab>
              <Tabs.Tab
                value='TaskColumn'
                icon={<BsCalendar4Week />}>
                نمایش ستونی
              </Tabs.Tab>
              <Tabs.Tab
                value='TaskCalendar'
                icon={<BsLayoutWtf />}>
                تقویم
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </div>

        <Button
          variant='subtle'
          color='dark'
          onClick={open}
          leftIcon={<BsLayoutWtf />}>
          اشتراک گذاری
        </Button>
        <Modal
          opened={opened}
          onClose={close}
          title='Authentication'
          centered>
          hello world
        </Modal>
      </section>

      {/* using to display */}
      {/* {renderComponent()} */}
    </>
  );
}
