import { Tabs as MantineTabs } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

import { tabObject } from '../../util/types';
import { useDispatch } from 'react-redux';

export interface TabsProps {
  tabsArray: Array<tabObject>;
}

const Tabs = ({ tabsArray }: TabsProps) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const selectedTab = pathname.split('/').at(-1);

  return (
    <>
      <MantineTabs
        defaultValue={selectedTab}
        // onTabChange={(value) => {}}
        color='cyan'
        styles={{
          tab: {
            fontWeight: 'bold',
            gap: '0.75rem',
            padding: '0 0 18px 0',
            margin: '0 10px',
          },
          tabsList: {
            border: 'none',
          },
        }}>
        <MantineTabs.List position='right'>
          {tabsArray.map(({ icon: Icon, value, text }) => (
            <Link
              key={value}
              to={`/board/${value}`}>
              <MantineTabs.Tab
                value={value}
                icon={<Icon size={18} />}
                sx={{
                  color: value === selectedTab ? '#208D8E !important' : '',
                }}>
                {text}
              </MantineTabs.Tab>
            </Link>
          ))}
        </MantineTabs.List>
      </MantineTabs>
    </>
  );
};

export default Tabs;
