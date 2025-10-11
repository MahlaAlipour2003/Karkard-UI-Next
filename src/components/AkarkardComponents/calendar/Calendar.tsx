"use client";

import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, DateSelectArg, EventClickArg, EventContentArg } from "@fullcalendar/core"; // <- اصلاح import
import faLocale from "@fullcalendar/core/locales/fa";

import dayjs from "dayjs";
import jalali from "@zoomit/dayjs-jalali-plugin";

import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";

// --- Dayjs Jalali Setup ---
dayjs.extend(jalali);
dayjs.calendar("jalali");

// --- TypeScript Event Interface ---
interface CalendarEvent extends EventInput {
    extendedProps: {
        calendar: string;
    };
}

const calendarsEvents = {
    Danger: "danger",
    Success: "success",
    Primary: "primary",
    Warning: "warning",
};

const Calendar: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [eventTitle, setEventTitle] = useState("");
    const [eventStartDate, setEventStartDate] = useState("");
    const [eventEndDate, setEventEndDate] = useState("");
    const [eventLevel, setEventLevel] = useState("");

    const calendarRef = useRef<FullCalendar>(null);
    const { isOpen, openModal, closeModal } = useModal();

    // --- Initialize some events ---
    useEffect(() => {
        setEvents([
            {
                id: "1",
                title: "جلسه مهم",
                start: dayjs().format("YYYY-MM-DD"),
                extendedProps: { calendar: "Danger" },
            },
            {
                id: "2",
                title: "قرار ملاقات",
                start: dayjs().add(1, "day").format("YYYY-MM-DD"),
                extendedProps: { calendar: "Success" },
            },
            {
                id: "3",
                title: "کارگاه آموزشی",
                start: dayjs().add(2, "day").format("YYYY-MM-DD"),
                end: dayjs().add(3, "day").format("YYYY-MM-DD"),
                extendedProps: { calendar: "Primary" },
            },
        ]);
    }, []);

    // --- Select Date Handler ---
    const handleDateSelect = (selectInfo: DateSelectArg) => {
        resetModalFields();
        setEventStartDate(selectInfo.startStr || "");
        setEventEndDate(selectInfo.endStr || selectInfo.startStr || "");
        openModal();
    };

    // --- Event Click Handler ---
    const handleEventClick = (clickInfo: EventClickArg) => {
        const event = clickInfo.event as unknown as CalendarEvent;
        setSelectedEvent(event);
        setEventTitle(event.title || "");
        setEventStartDate(event.start ? dayjs(event.start as string | Date).format("YYYY-MM-DD") : "");
        setEventEndDate(event.end ? dayjs(event.end as string | Date).format("YYYY-MM-DD") : "");
        setEventLevel(event.extendedProps.calendar || "");
        openModal();
    };

    // --- Add / Update Event ---
    const handleAddOrUpdateEvent = () => {
        if (!eventTitle || !eventStartDate) return;

        if (selectedEvent) {
            setEvents(prev =>
                prev.map(ev =>
                    ev.id === selectedEvent.id
                        ? {
                            ...ev,
                            title: eventTitle,
                            start: eventStartDate,
                            end: eventEndDate,
                            extendedProps: { calendar: eventLevel },
                        }
                        : ev
                )
            );
        } else {
            const newEvent: CalendarEvent = {
                id: Date.now().toString(),
                title: eventTitle,
                start: eventStartDate,
                end: eventEndDate,
                allDay: true,
                extendedProps: { calendar: eventLevel },
            };
            setEvents(prev => [...prev, newEvent]);
        }

        closeModal();
        resetModalFields();
    };

    const resetModalFields = () => {
        setEventTitle("");
        setEventStartDate("");
        setEventEndDate("");
        setEventLevel("");
        setSelectedEvent(null);
    };

    // --- Custom Event Render ---
    const renderEventContent = (eventInfo: EventContentArg) => {
        const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
        return (
            <div className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}>
                <div className="fc-daygrid-event-dot"></div>
                <div className="fc-event-time">{eventInfo.timeText}</div>
                <div className="fc-event-title">{eventInfo.event.title}</div>
            </div>
        );
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next addEventButton",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                locale={faLocale}
                direction="rtl"
                events={events}
                selectable={true}
                select={handleDateSelect}
                eventClick={handleEventClick}
                eventContent={renderEventContent}
                customButtons={{
                    addEventButton: {
                        text: "افزودن رویداد +",
                        click: openModal,
                    },
                }}
            />

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
                <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                    <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                        {selectedEvent ? "ویرایش رویداد" : "افزودن رویداد"}
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        برنامه‌ریزی رویدادهای خود را مدیریت کنید
                    </p>

                    {/* Title */}
                    <div className="mt-6">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            عنوان رویداد
                        </label>
                        <input
                            type="text"
                            value={eventTitle}
                            onChange={e => setEventTitle(e.target.value)}
                            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        />
                    </div>

                    {/* Event Color */}
                    <div className="mt-6">
                        <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                            رنگ رویداد
                        </label>
                        <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                            {Object.entries(calendarsEvents).map(([key, ]) => (
                                <label key={key} className="flex items-center text-sm text-gray-700 dark:text-gray-400 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="event-level"
                                        value={key}
                                        checked={eventLevel === key}
                                        onChange={() => setEventLevel(key)}
                                        className="sr-only"
                                    />
                                    <span className={`w-5 h-5 mr-2 rounded-full border border-gray-300 flex items-center justify-center dark:border-gray-700`}>
                                        <span className={`h-2 w-2 rounded-full bg-white ${eventLevel === key ? "block" : "hidden"}`}></span>
                                    </span>
                                    {key}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Start Date */}
                    <div className="mt-6">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            تاریخ شروع
                        </label>
                        <input
                            type="date"
                            value={eventStartDate}
                            onChange={e => setEventStartDate(e.target.value)}
                            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        />
                    </div>

                    {/* End Date */}
                    <div className="mt-6">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            تاریخ پایان
                        </label>
                        <input
                            type="date"
                            value={eventEndDate}
                            onChange={e => setEventEndDate(e.target.value)}
                            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        />
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex items-center gap-3 mt-6 sm:justify-end">
                        <button
                            onClick={closeModal}
                            type="button"
                            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                        >
                            بستن
                        </button>
                        <button
                            onClick={handleAddOrUpdateEvent}
                            type="button"
                            className="btn btn-success flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                        >
                            {selectedEvent ? "به‌روزرسانی" : "افزودن"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Calendar;
