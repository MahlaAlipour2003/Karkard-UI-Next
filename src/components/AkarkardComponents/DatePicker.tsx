'use client'
import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function PersianDatePicker() {
    const [date, setDate] = useState<DateObject | null>(null);

    return (
        <div className="container m-4">
            <DatePicker
                value={date}
                onChange={setDate}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                inputClass="form-control"
                format="YYYY/MM/DD"
            />
        </div>
    );
}


//'use client'
//import React, { useState } from "react";

//type DatePickerrProps = {
//    value?: string;
//    onChange?: (value: string) => void;
//    placeholder?: string;
//};

//const DatePicker: React.FC<DatePickerrProps> = ({
//    value,
//    onChange,
//    placeholder = "تاریخ را انتخاب کنید",
//}) => {
//    const [selectedDate, setSelectedDate] = useState < string > (value || "");

//    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//        setSelectedDate(e.target.value);
//        onChange?.(e.target.value);
//    };

//    return (
//        <input
//            type="date"
//            value={selectedDate}
//            onChange={handleChange}
//            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//            placeholder={placeholder}
//        />
//    );
//};

//export default DatePicker;
