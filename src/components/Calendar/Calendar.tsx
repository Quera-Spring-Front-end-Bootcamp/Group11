import React from 'react';
import moment from 'moment-jalaali';
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { Modal } from '@mantine/core';
import { Button } from '../index';
import { TextInput } from '@mantine/core';
import { FaPlus } from 'react-icons/fa';

interface DemoAppState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
  isModalOpen: boolean;
  newTaskTitle: string;
  selectedDate: string;
}

export default class DemoApp extends React.Component<{}, DemoAppState> {
  calendarRef = React.createRef<FullCalendar>();

  state: DemoAppState = {
    weekendsVisible: true,
    currentEvents: [],
    isModalOpen: false,
    newTaskTitle: '',
    selectedDate: '',
  };

  render() {
    const calendarOptions = {
      plugins: [dayGridPlugin],
      firstDay: 0,
      buttonText: {
        today: 'امروز',
        month: 'ماه',
        week: 'هفته',
        day: 'روز',
      },
    };

    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            locale='fa'
            {...calendarOptions}
            ref={this.calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS.sort((a, b) =>
              moment(a.start).diff(moment(b.start))
            )}
            select={this.handleDateSelect}
            eventContent={renderEventContent}
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents}
            timeZone='Asia/Tehran'
            direction='rtl'
            firstDay={6}
            showNonCurrentDates={false}
            dayHeaderFormat={{ weekday: 'long' }}
            dayCellContent={(arg) => {
              const formattedDate = moment(arg.date).format('jD');
              return (
                <div className='fc-daygrid-day-number'>
                  {formattedDate}
                  <div
                    className='day-overlay'
                    onClick={() => this.handleOverlayClick(arg.date)}>
                    <FaPlus />
                  </div>
                </div>
              );
            }}
          />
        </div>
        <Modal
          opened={this.state.isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
          title='تسک جدید بساز'>
          <TextInput
            value={this.state.newTaskTitle}
            onChange={(e) =>
              this.setState({ newTaskTitle: e.currentTarget.value })
            }
            autoFocus
          />
          <Button onClick={this.handleAddEvent}>ثبت کن</Button>
        </Modal>
      </div>
    );
  }

  renderSidebar() {
    return (
      <div className='font-bold text-xl mb-5 mt-3'>
        تعداد تسک ها: {this.state.currentEvents.length}
      </div>
    );
  }

  handleWeekendsToggle = () => {
    this.setState((prevState) => ({
      weekendsVisible: !prevState.weekendsVisible,
    }));
  };

  handleDateSelect = (selectInfo: DateSelectArg) => {
    this.setState({
      isModalOpen: true,
      selectedDate: selectInfo.startStr,
    });
  };

  handleOverlayClick = (date: Date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    this.setState({
      isModalOpen: true,
      selectedDate: formattedDate,
    });
  };

  handleAddEvent = () => {
    const { newTaskTitle, selectedDate } = this.state;
    if (newTaskTitle.trim() !== '') {
      const calendarApi = this.calendarRef.current?.getApi();
      calendarApi?.addEvent({
        id: createEventId(),
        title: newTaskTitle,
        start: selectedDate,
        allDay: true,
      });
      this.setState({
        isModalOpen: false,
        newTaskTitle: '',
        selectedDate: '',
      });
    }
  };

  handleEventClick = (clickInfo: EventClickArg) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'?`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  handleEvents = (events: EventApi[]) => {
    const sortedEvents = events.sort((a, b) =>
      moment(a.start).diff(moment(b.start))
    );
    this.setState({
      currentEvents: sortedEvents,
    });
  };
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}
