'use client'

import React from "react";
import Timer from "./Timer";
import { Col, Card, CardBody } from "reactstrap";

interface TimerCardProps {
    tableRef?: React.RefObject<{ refresh: () => void | null }>;
}

export default function TimerCard({ tableRef }: TimerCardProps) {
    return (
        <Col>
            <Card
                className="text-white bg-transparent h-full mt-2 rounded shadow-lg"
                style={{
                    backgroundImage: "url('/images/bg/6.jpg')", // مسیر عکس
                    backgroundSize: "cover",   // کل کارت پر بشه
                    backgroundPosition: "center", // وسط‌چین باشه
                    border: "none"
                }}
            >
                <CardBody
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: "210px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "12px" }} // لایه نیمه‌شفاف برای خوانایی متن
                >
                    <Timer tableRef={tableRef} />
                </CardBody>
            </Card>
        </Col>

        //<Col>
        //    <Card className="text-white bg-timer-gradient  h-full m-4 rounded">
        //        <CardBody className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "390px" }}>
        //            <Timer tableRef={tableRef} />
        //        </CardBody>
        //    </Card>
        //</Col>
    );
}
