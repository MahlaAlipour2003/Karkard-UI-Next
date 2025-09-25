'use client'
import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import axios from "axios";
import {
    Input,
    Label,
} from "reactstrap";

localStorage.setItem("userId", "74");

// نوع داده‌هایی که از API برمی‌گرده
interface TimeRecord {
    id: number;
    startDateTime: string;
    endDateTime: string;
    duration: number; // برحسب ثانیه
}
// پراپس‌های کامپوننت
interface WeeklyCheckInCheckOutTblProps {
    userId?: string;
}
export interface WeeklyCheckInCheckOutTblRef {
    refresh: () => void;
}
const WeeklyCheckInCheckOutTbl = forwardRef<WeeklyCheckInCheckOutTblRef, WeeklyCheckInCheckOutTblProps>(({ userId: propUserId }, ref) => {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const userId = propUserId || localStorage.getItem("userId");
    const [timeList, setTimeList] = useState<TimeRecord[]>([]);

    const fetchList = useCallback(async () => {
        try {
            const res = await axios.get<TimeRecord[]>(`https://localhost:8215/baseInformation/time/list/${userId}`);
            setTimeList(res.data);
        } catch {
            console.error("خطا در دریافت لیست ورود و خروج");
        }
    }, [userId]);

    useEffect(() => {
        fetchList();
        const interval = intervalRef.current;
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [fetchList]);

    // اجازه میده از بیرون fetchList رو صدا بزنیم
    useImperativeHandle(ref, () => ({
        refresh: fetchList
    }));

    return (
        <div dir="rtl" className="w-full">
            <div className="bg-white rounded-md shadow p-4">
                <div className="flex items-center justify-start space-x-2 space-x-reverse">
                    <Label className="text-gray-700 font-medium">نمایش محتویات</Label>
                    <Input type="select" className="ml-3 w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </Input>
                </div>

                {/* جدول */}
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 text-center text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="border px-4 py-2">شماره ستون</th>
                                <th className="border px-4 py-2">زمان ورود</th>
                                <th className="border px-4 py-2">زمان خروج</th>
                                <th className="border px-4 py-2">زمان کل</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timeList.map((currentRow, index) => (
                                <tr key={currentRow.id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{currentRow.startDateTime}</td>
                                    <td className="border px-4 py-2">{currentRow.endDateTime}</td>
                                    <td className="border px-4 py-2">
                                        {Math.round(currentRow.duration / 3600)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-end mt-6 space-x-1 space-x-reverse">
                <button
                    disabled
                    className="px-3 py-1 rounded-md border border-gray-300 text-gray-400 cursor-not-allowed"
                >
                    قبلی
                </button>
                <button className="px-3 py-1 rounded-md border border-blue-500 bg-blue-500 text-white">
                    1
                </button>
                <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
                    بعدی
                </button>
            </div>
        </div>
    );
});
WeeklyCheckInCheckOutTbl.displayName = "WeeklyCheckInCheckOutTbl";
export default WeeklyCheckInCheckOutTbl;
