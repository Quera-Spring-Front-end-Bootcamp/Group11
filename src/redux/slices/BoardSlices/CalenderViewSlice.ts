import { createSlice } from '@reduxjs/toolkit';
import pda from '@alireza-ab/persian-date';

export type CalenderViewSliceTypes = {
  month: number;
  day: number;
  year: number;
  startOfMonth: number;
  today: Array<number>;
};

export const CalenderViewSlice = createSlice({
  name: 'board',
  initialState: () => {
    const date = new pda();
    return {
      month: +date.toString('jM'),
      day: +date.toString('jd'),
      year: +date.toString('jYYYY'),
      startOfMonth: +date.startOf('month').toString('jd') + 1,
      today: [
        +date.toString('jYYYY'),
        +date.toString('jM'),
        +date.toString('jd'),
        +date.startOf('month').toString('jd') + 1,
      ],
    };
  },
  reducers: {
    setDate: (
      state: CalenderViewSliceTypes,
      action: {
        payload: {
          day: number;
          month: number;
          year: number;
          startOfMonth: number;
        };
      }
    ) => {
      const { day, month, year, startOfMonth } = action.payload;
      state.day = day;
      state.month = month;
      state.year = year;
      state.startOfMonth = startOfMonth;
    },
    setDay: (
      state: CalenderViewSliceTypes,
      action: {
        payload: {
          day: number;
        };
      }
    ) => {
      const { day } = action.payload;
      state.day = day;
    },
    setMonth: (
      state: CalenderViewSliceTypes,
      action: {
        payload: {
          month: number;
        };
      }
    ) => {
      const { month } = action.payload;
      state.month = month;
    },
    setYear: (
      state: CalenderViewSliceTypes,
      action: {
        payload: {
          year: number;
        };
      }
    ) => {
      const { year } = action.payload;
      state.year = year;
    },
    setStartOfMonth: (
      state: CalenderViewSliceTypes,
      action: {
        payload: {
          startOfMonth: number;
        };
      }
    ) => {
      const { startOfMonth } = action.payload;
      state.startOfMonth = startOfMonth;
    },
  },
});

export default CalenderViewSlice;
