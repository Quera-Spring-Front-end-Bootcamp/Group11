/**
 * this file is for constant values
 * to prevent main files to get complicated we put constants in here
 */
import { BsFlag, BsX } from 'react-icons/bs';

import { BsColumns } from 'react-icons/bs';
import { FaList } from 'react-icons/fa';
import {
  BsCalendarDay,
  BsPersonExclamation,
  BsPersonCheck,
  BsGear,
} from 'react-icons/bs';

export const workSpaceColors = [
  '#E46161',
  '#9286EA',
  '#80DC69',
  '#46494D',
  '#E17E80',
  '#78C6B0',
  '#EC8182',
  '#84C6A1',
  '#F3C567',
  '#B9995E',
  '#E57A57',
  null,
  '#E28A60',
  '#6897C2',
  '#3C45E7',
  '#74AADD',
  '#F1A25C',
  '#6DAFCE',
  '#76BC86',
  '#6CB2F7',
  '#5F6C7C',
  '#C074D1',
  '#486774',
  '#7FA1D1',
];

export const TaskColors = [
  '#E46161',
  '#9286EA',
  '#80DC69',
  '#46494D',
  '#E17E80',
  '#78C6B0',
  '#EC8182',
  '#84C6A1',
  '#F3C567',
  '#B9995E',
  '#E57A57',
  '#E28A60',
  '#6897C2',
  '#3C45E7',
  '#74AADD',
  '#F1A25C',
  '#6DAFCE',
  '#76BC86',
  '#6CB2F7',
  '#5F6C7C',
  '#C074D1',
  '#486774',
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

export const profileSideBarNavItems = [
  {
    id: 'personalInfo',
    title: 'اطلاعات فردی',
    icon: BsPersonExclamation,
  },
  {
    id: 'accountInfo',
    title: 'اطلاعات حساب',
    icon: BsPersonCheck,
  },
  {
    id: 'settings',
    title: 'تنظیمات',
    icon: BsGear,
  },
];

export const persianDays = [
  'شنبه',
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهار‌شنبه',
  'پنج‌شنبه',
  'جمعه',
];
export const BASE_URL = 'http://localhost:3000/api';

export const priorityItem = [
  {
    id: 'urgent',
    label: 'فوری',
    color: '#FB0606',
    icon: BsFlag,
  },
  {
    id: 'high',
    label: 'بالا',
    color: '#FFE605',
    icon: BsFlag,
  },
  {
    id: 'medium',
    label: 'متوسط',
    color: '#09DBCE',
    icon: BsFlag,
  },
  {
    id: 'low',
    label: 'کم',
    color: '#B2ACAC',
    icon: BsFlag,
  },
  {
    id: 'noPriority',
    label: 'حذف اولویت',
    color: '#E45454',
    icon: BsX,
  },
];
