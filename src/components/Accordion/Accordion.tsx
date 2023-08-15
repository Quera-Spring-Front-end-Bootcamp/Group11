import { Accordion as MantineAccordion } from '@mantine/core';

import type { AccordionProps as MantineAccordionProps } from '@mantine/core';

interface AccordionProps extends MantineAccordionProps {
  inputArray: any;
  labelFW: string;
  labelFS: string;
  labelLH: string;
  detailPadd: string;
  detailMarg: string;
}
const Accordion = ({
  inputArray,
  labelFW,
  labelFS,
  labelLH,
  detailPadd,
  detailMarg,
}: AccordionProps) => {
  // Pattern of AccArray:
  // AccArray = [{id: id , AccTitle: AccTitle , AccDetail: AccDetails}]
  const Acc = inputArray.map((item: any) => {
    return (
      <MantineAccordion.Item
        key={item.id}
        value={item.AccTitle}>
        <MantineAccordion.Control>{item.AccTitle}</MantineAccordion.Control>
        <MantineAccordion.Panel>{item.AccDetail} </MantineAccordion.Panel>
      </MantineAccordion.Item>
    );
  });

  return (
    <MantineAccordion
      transitionDuration={200}
      defaultValue={inputArray[0].AccTitle}
      //@ts-ignore
      styles={() => ({
        chevron: {
          marginLeft: '0',
        },
        item: {
          border: 'none',
          margin: '0px',
        },
        control: {
          padding: '0',
        },
        content: {
          padding: detailPadd,
          margin: detailMarg,
        },
        label: {
          textAlign: 'right',
          padding: '0px',
          fontWeight: labelFW,
          fontSize: labelFS,
          lineHeight: labelLH,
        },
      })}>
      {Acc}
    </MantineAccordion>
  );
};

export default Accordion;
