import { Tabs as MantineTabs } from '@mantine/core';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { tabObject } from '../../util/types';

export interface TabsProps {
  tabsArray: Array<tabObject>;
}

const Tabs = ({ tabsArray }: TabsProps) => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const selectedTab = pathname.split('/').at(-1);

  return (
    <>
      <MantineTabs
        defaultValue={selectedTab}
        onTabChange={(value) =>
          navigate({
            pathname: `/board/${value}`,
            search: `?${searchParams.toString()}`,
          })
        }
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
            <MantineTabs.Tab
              key={value}
              value={value}
              icon={<Icon size={18} />}
              sx={{
                color: value === selectedTab ? '#208D8E !important' : '',
              }}>
              {text}
            </MantineTabs.Tab>
            // </Link>
          ))}
        </MantineTabs.List>
      </MantineTabs>
    </>
  );
};

export default Tabs;
