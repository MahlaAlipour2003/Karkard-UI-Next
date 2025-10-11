'use client'
import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function PersianDatePicker() {
    const [date, setDate] = useState<DateObject | null>(null);

    return (
        <div className="container">
            <DatePicker
                value={date}
                onChange={setDate}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                inputClass="number bg-gray-50 border py-1 px-6 rounded transition focus:border-purple-400 focus:ring-2 focus:ring-purple-400"
                format="YYYY/MM/DD"
            />
        </div>
    );
}
