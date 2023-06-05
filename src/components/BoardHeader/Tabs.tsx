import { Tabs as MantineTabs } from '@mantine/core';
import { TabsProps as MantineTabsProps } from '@mantine/core';
import { IconType } from 'react-icons';

interface TabsProps extends MantineTabsProps {
  tabs: Array<{ id: string; value: string; text: string; Icon: IconType }>;
}

const Tabs = ({ tabs }: TabsProps) => {
  return (
    <MantineTabs defaultValue={tabs[0].value}>
      <MantineTabs.List position='right'>
        {tabs.map((tab) => (
          <MantineTabs.Tab value={tab.value}>{tab.text}</MantineTabs.Tab>
        ))}
      </MantineTabs.List>
    </MantineTabs>
  );
};

export default Tabs;
