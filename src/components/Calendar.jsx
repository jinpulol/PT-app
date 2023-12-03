import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
    const [bookings, setBookings] = useState([]);
    const REST_URL = 'https://traineeapp.azurewebsites.net/gettrainings';

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                setBookings(formatBooking(responseData));
            })
            .catch(error => console.error(error));
    }

    // format the data for FullCalendar
    // if customer is null, show "N/D" instead of customer name
    // todo: duration will change ending time
    const formatBooking = (responseData) => {
        return responseData.map((booking) => {
            let title;
            if (booking.customer === null) {
                title = booking.activity + " / Customer N/D";
            } else {
                title = booking.activity + " / " + booking.customer.firstname + " " + booking.customer.lastname;
            }
    
            return {
                title: title,
                start: booking.date
            }
        });
    }

    // settings for FullCalendar component
    const options = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        height: '50vh',
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        editable: true
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100vh', margin: 0, padding: 0 }}>
    <div className="ag-theme-material"
        style={{ height: 600, width: 1500 }}>
            <FullCalendar
                {...options}
                events={bookings}
            />
        </div>
        </div>
    )
}

export default Calendar;