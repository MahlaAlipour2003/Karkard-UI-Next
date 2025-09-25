'use client'
import axios, { AxiosError } from 'axios';
import { useCallback } from 'react';
import React, { useState, useEffect, useRef } from 'react';
//import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "@/icons";
//import Badge from "../ui/badge/Badge";
import { Button } from 'reactstrap';

localStorage.setItem("userId", "74");


interface TimerProps {
    userId?: number;
    tableRef?: React.RefObject<{ refresh: () => void } | null>;
}
const Timer: React.FC<TimerProps> = ({ userId: propUserId, tableRef }) => {
    const userId: number = propUserId ?? Number(localStorage.getItem("userId") ?? 0);
    const [isRunning, setIsRunning] = useState(false);
    const [liveTime, setLiveTime] = useState("00:00:00");
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
    }, [])

    const stopLiveTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setLiveTime("00:00:00");
    };

    const handleCheckIn = async () => {
        try {
            const res = await axios.post(`https://localhost:8215/baseInformation/time/checkin/${userId}`);
            if (res.status === 200) {
                startLiveTimer(Date.now());
                tableRef?.current?.refresh(); // بعد از ثبت ورود جدول رو رفرش کن
            }
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            alert(err.response?.data || "خطا در ثبت ورود");
        }
    };

    const handleCheckOut = async () => {
        try {
            const res = await axios.post(`https://localhost:8215/baseInformation/time/checkout/${userId}`);
            if (res.status === 200) {
                stopLiveTimer();
                tableRef?.current?.refresh(); // بعد از ثبت خروج جدول رو رفرش کن
            }
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            alert(err.response?.data || "خطا در ثبت خروج");
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
                console.error("خطا در دریافت وضعیت کاربر");
            }
        };
        fetchStatus();
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [userId, startLiveTimer]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",  // اصلاح شده
                border: "none"
            }}
        >
            <h2 className="text-black mt-9">ثبت ورود و خروج</h2>

            {isRunning && (
                <div
                    className="alert alert-info text-center w-100"
                    style={{ maxWidth: "300px", padding: "5px 10px" }}
                >
                    زمان در حال حرکت: {liveTime}
                </div>
            )}

            <Button
                className={isRunning ? "btn btn-danger mt-2" : "btn btn-primary mt-2"}
                style={{
                    width: "100%",
                    maxWidth: "300px",
                    padding: "10px 0",
                    fontSize: "1rem",
                    display: "flex",
                    justifyContent: "center"
                }}
                onClick={isRunning ? handleCheckOut : handleCheckIn}
            >
                {isRunning ? "ثبت خروج" : "ثبت ورود"}
            </Button>
        </div>


    );
};

export default Timer;
