/**
 * this file is for constant values
 * to prevent main files to get complicated we put constants in here
 */

import { BsColumns } from 'react-icons/bs';
import { FaList } from 'react-icons/fa';
import { BsCalendarDay } from 'react-icons/bs';

export const workSpaceColors = [
  '#84C6A1',
  '#78C6B0',
  '#76BC86',
  '#80DC69',
  '#E46161',
  '#E17E80',
  '#EC8182',
  '#F3C567',
  '#B9995E',
  '#E57A57',
  '#F1A25C',
  null,
  '#E28A60',
  '#6897C2',
  '#74AADD',
  '#3C45E7',
  '#6DAFCE',
  '#6CB2F7',
  '#9286EA',
  '#C074D1',
  '#486774',
  '#5F6C7C',
  '#46494D',
  '#7FA1D1',
];

export const themeColor = [
  '#208D8E',
  '#78C6B0',
  '#76BC86',
  '#80DC69',
  '#E46161',
  '#E17E80',
  '#EC8182',
  '#F3C567',
  '#E57A57',
  '#F1A25C',
];

export const tabValues = [
  {
    value: 'TaskList',
    icon: FaList,
    text: 'نمایش لیستی',
  },
  {
    value: 'TaskColumn',
    icon: BsColumns,
    text: 'نمایش ستونی',
  },
  {
    value: 'TaskCalendar',
    icon: BsCalendarDay,
    text: 'تقویم',
  },
];
