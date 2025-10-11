'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios, { AxiosError } from 'axios';

interface TimerProps {
    userId?: number;
    tableRef?: React.RefObject<{ refresh: () => void } | null>;
}

const Timer: React.FC<TimerProps> = ({ userId: propUserId, tableRef }) => {
    const userId: number = propUserId ?? Number(localStorage.getItem('userId') ?? 0);
    const [isRunning, setIsRunning] = useState(false);
    const [liveTime, setLiveTime] = useState('00:00:00');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimestampRef = useRef<number | null>(null);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const startLiveTimer = useCallback((startTime: number) => {
        startTimestampRef.current = startTime;
        intervalRef.current = setInterval(() => {
            if (startTimestampRef.current) {
                const elapsed = Date.now() - startTimestampRef.current;
                setLiveTime(formatTime(elapsed));
            }
        }, 1000);
        setIsRunning(true);
    }, []);

    const stopLiveTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsRunning(false);
        setLiveTime('00:00:00');
    };

    const handleCheckIn = async () => {
        try {
            const res = await axios.post(`https://localhost:8215/baseInformation/time/checkin/${userId}`);
            if (res.status === 200) {
                startLiveTimer(Date.now());
                tableRef?.current?.refresh();
            }
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            alert(err.response?.data || 'خطا در ثبت ورود');
        }
    };

    const handleCheckOut = async () => {
        try {
            const res = await axios.post(`https://localhost:8215/baseInformation/time/checkout/${userId}`);
            if (res.status === 200) {
                stopLiveTimer();
                tableRef?.current?.refresh();
            }
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            alert(err.response?.data || 'خطا در ثبت خروج');
        }
    };

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await axios.get(`https://localhost:8215/baseInformation/time/status/${userId}`);
                if (res.data.isRunning) {
                    const startTime = new Date(res.data.startTime).getTime();
                    startLiveTimer(startTime);
                }
            } catch {
                console.error('خطا در دریافت وضعیت کاربر');
            }
        };
        fetchStatus();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [userId, startLiveTimer]);


    return (
        <div className="mt-5 flex flex-col md:flex-row items-center justify-center w-full bg-gradient-to-br from-purple-90 to-indigo-90 p-8 gap-21">

            <div className={`${isRunning ? 'scale-up-down w-120 h-69 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.63)_0%,transparent_83%)] backdrop-blur-lg rounded-full' : 'bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.42)_0%,transparent_83%)]'}`}>
                <img
                    src="images/bg/Illustrator1.png"
                    alt="تصویر"
                    className={`w-120 h-69 object-contain ${isRunning ? 'scale-up-down' : ''}`}
                />
            </div>


            {/* کارت تایمر */}
            <div className={`${isRunning ? 'border-7 border-green-500/39 ' : 'border-6 border-red-500'} bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center p-6 w-67`}>
                <h2 className="text-primary text-2xl font-bold">ثبت ورود و خروج</h2>

                <div className="relative flex items-center justify-center w-30 h-30 rounded-full my-4 p-4">
                    <span className="text-2xl font-mono text-primary p-4 m-2 rounded-full border-4 border-green-500/39">{liveTime}</span>
                    {isRunning && <span className="absolute w-40 h-40 rounded-full m-4"></span>}
                </div>

                <button
                    onClick={isRunning ? handleCheckOut : handleCheckIn}
                    className={`mb-2 w-36 py-2 rounded-full text-white font-semibold shadow-lg transition transform hover:scale-105 ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500/63 hover:bg-green-500/90'
                        }`}
                >
                    {isRunning ? '⏹ ثبت خروج' : '✔ ثبت ورود'}
                </button>
            </div>

            {/* تصویر */}
        </div>
    );
};

export default Timer;
