import { Tabs as MantineTabs, TabsValue } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';

import { tabObject } from '../../util/types';
import { useDispatch, useSelector } from 'react-redux';
import boardSlice from '../../redux/slices/BoardSlices/BoardSlice';

export interface TabsProps {
  tabsArray: Array<tabObject>;
}

const Tabs = ({ tabsArray }: TabsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedTabValue = useSelector(
    (state: any) => state.board.boardComponent
  );

  return (
    <>
      <MantineTabs
        defaultValue={selectedTabValue}
        onTabChange={(value) => {
          //push selected tab value to url
          navigate(`/board/${value}`);

          //send selected tab to redux
          dispatch(boardSlice.actions.setBoardComponent(value));
        }}
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
                color: value === selectedTabValue ? '#208D8E !important' : '',
              }}>
              {text}
            </MantineTabs.Tab>
          ))}
        </MantineTabs.List>
      </MantineTabs>
    </>
  );
};

export default Tabs;
