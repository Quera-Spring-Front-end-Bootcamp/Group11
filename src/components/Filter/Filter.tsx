import React, { useState } from 'react';
import { Paper, Anchor, Select, Text, Button } from '@mantine/core';

interface Filter {
  uniqueId: number;
  filter1: string;
  filter2: string;
  filter3: string;
}

const FilterComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const [filters, setFilters] = useState<Filter[]>([
    { uniqueId: 0, filter1: '', filter2: '', filter3: '' },
  ]);
  const addFilterRow = () => {
    const newFilter = {
      uniqueId: Date.now(),
      filter1: '',
      filter2: '',
      filter3: '',
    };
    setFilters([...filters, newFilter]);
  };

  const handleFilterChange = (
    uniqueId: number,
    field: keyof Filter,
    value: string
  ) => {
    const updatedFilters = filters.map((filter) =>
      filter.uniqueId === uniqueId ? { ...filter, [field]: value } : filter
    );
    setFilters(updatedFilters);
  };

  const removeFilterRow = (uniqueId: number) => {
    const updatedFilters = filters.filter(
      (filter) => filter.uniqueId !== uniqueId
    );
    setFilters(updatedFilters);
  };

  return (
    <>
      <Anchor
        size='xl'
        color='blue'
        onClick={toggleDropdown}
        className='mt-5 block'>
        فیلترها
      </Anchor>

      {isOpen && (
        <Paper
          shadow='xs'
          style={{ marginTop: '10px', padding: '8px' }}>
          <div className='flex items-center justify-between mb-5'>
            <Text
              size='xl'
              className='font-bold'>
              فیلترها
            </Text>
            <Button
              size='md'
              variant='link'
              onClick={toggleDropdown}>
              X
            </Button>
          </div>

          {filters.map((filter) => (
            <div
              key={filter.uniqueId}
              className='flex items-center gap-5 mb-5'>
              <span>تسک هایی که</span>
              <Select
                data={[
                  { value: 'تگ', label: 'تگ' },
                  { value: 'تاریخ', label: 'تاریخ' },
                  { value: 'اعضا', label: 'اعضا' },
                  { value: 'اولویت', label: 'اولویت' },
                ]}
                searchable
                value={filter.filter1}
                placeholder='انتخاب کنید'
                onChange={(value) =>
                  handleFilterChange(filter.uniqueId, 'filter1', value as any)
                }
              />
              <p>آن ها</p>
              <Select
                data={[
                  { value: 'درس', label: 'درس' },
                  { value: 'کار', label: 'کار' },
                  { value: 'پروژه', label: 'پروژه' },
                ]}
                searchable
                value={filter.filter2}
                placeholder='انتخاب کنید'
                onChange={(value) =>
                  handleFilterChange(filter.uniqueId, 'filter2', value as any)
                }
              />
              <Select
                data={[
                  { value: 'است', label: 'است' },
                  { value: 'نیست', label: 'نیست' },
                ]}
                searchable
                value={filter.filter3}
                placeholder='انتخاب کنید'
                onChange={(value) =>
                  handleFilterChange(filter.uniqueId, 'filter3', value as any)
                }
              />

              <Button onClick={() => removeFilterRow(filter.uniqueId)}>
                x
              </Button>
            </div>
          ))}

          <Anchor
            color='blue'
            onClick={addFilterRow}>
            افزودن فیلتر جدید
          </Anchor>
        </Paper>
      )}
    </>
  );
};
export default FilterComponent;
