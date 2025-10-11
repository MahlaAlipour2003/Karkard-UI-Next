'use client'
import React, { useState, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';
import axios from "axios";
import { Input, Label } from "reactstrap";

localStorage.setItem("userId", "74");

// نوع داده‌هایی که از API برمی‌گرده
interface TimeRecord {
    id: number;
    startDateTime: string;
    endDateTime: string;
    duration: number; // برحسب ثانیه
}

// پراپس‌های کامپوننت
interface DashboardTimerTblProps {
    userId?: string;
}

export interface DashboardTimerTblRef {
    refresh: () => void;
}

const DashboardTimerTbl = forwardRef<DashboardTimerTblRef, DashboardTimerTblProps>(
    ({ userId: propUserId }, ref) => {
        const userId = propUserId || localStorage.getItem("userId");
        const [timeList, setTimeList] = useState<TimeRecord[]>([]);
        const [itemsPerPage, setItemsPerPage] = useState<number>(3); // پیش‌فرض ۳
        const [currentPage, setCurrentPage] = useState<number>(1);

        const fetchList = useCallback(async () => {
            try {
                const res = await axios.get<TimeRecord[]>(
                    `https://localhost:8215/baseInformation/time/list/${userId}`
                );
                setTimeList(res.data);
            } catch {
                console.error("خطا در دریافت لیست ورود و خروج");
            }
        }, [userId]);

        useEffect(() => {
            fetchList();
        }, [fetchList]);

        // اجازه میده از بیرون fetchList رو صدا بزنیم
        useImperativeHandle(ref, () => ({
            refresh: fetchList,
        }));

        // محاسبه رکوردهای صفحه جاری
        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentData = timeList.slice(startIndex, startIndex + itemsPerPage);

        // تعداد صفحات
        const totalPages = Math.ceil(timeList.length / itemsPerPage);

        return (
            <div dir="rtl" className="w-full">
                <div className="bg-white rounded-md shadow p-4">
                    <div className="flex justify-end items-center space-x-2 space-x-reverse">
                        <Label className="text-gray-700 font-medium m-4">نمایش محتویات</Label>
                        <Input
                            type="select"
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1); // وقتی تغییر کرد برگرده به صفحه اول
                            }}
                            className="ml-3 w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={3}>3</option>
                            <option value={6}>6</option>
                            <option value={8}>8</option>
                        </Input>
                    </div>

                    {/* جدول */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 text-center text-sm">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="border px-4 py-2">ردیف</th>
                                    <th className="border px-4 py-2">زمان ورود</th>
                                    <th className="border px-4 py-2">زمان خروج</th>
                                    <th className="border px-4 py-2">زمان کل (ساعت)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((currentRow, index) => (
                                    <tr key={currentRow.id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">
                                            {startIndex + index + 1}
                                        </td>
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
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md border ${currentPage === 1
                                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                                : "border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        قبلی
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 mx-1 py-1 rounded-md border ${currentPage === i + 1
                                    ? "border-blue-500 bg-blue-500 text-white"
                                    : "border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md border ${currentPage === totalPages
                                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                                : "border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        بعدی
                    </button>
                </div>
            </div>
        );
    }
);

DashboardTimerTbl.displayName = "DashboardTimerTbl";
export default DashboardTimerTbl;
