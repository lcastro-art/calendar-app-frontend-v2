import React,{ useEffect,useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar } from 'react-big-calendar'
import { localizer,getMessagesES } from '../../helpers'


import { CalendarEvent,CalendarModal,FabAddNew,FabDelete,Navbar } from '../'
import { useAuthStore,useCalendarStore,useUiStore } from '../../hooks';


export const CalendarPage = () => {

    const { openDateModal } = useUiStore();
    const { user } = useAuthStore();
    const { events,setActiveEvent,startLoadingEvents } = useCalendarStore();

    const [lastView,setLastView] = useState(localStorage.getItem('lastView') || ('week'))

    const eventStyleGetter = (event,start,end,isSelected) => {

        const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.id);

        const style = {
            backgroundColor: isMyEvent ? '#347cf7' : '#466660',
            borderRadius: '0px',
            opacity: isSelected ? 1 : 0.8,
            color: 'white'
        }
        return {
            style
        }
    }

    const onDoubleClick = (event) => {
        openDateModal();
    }
    const onSelect = (event) => {
        setActiveEvent(event);
    }
    const onViewChanged = (event) => {
        localStorage.setItem('lastView',event);
        setLastView(event);
    }

    useEffect(() => {
        startLoadingEvents();
    },[])

    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />

            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    )
}
