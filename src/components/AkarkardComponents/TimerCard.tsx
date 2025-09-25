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
            <Card className="text-white bg-red-500 h-full mt-2">
                <CardBody className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "210px" }}>
                    <Timer tableRef={tableRef} />
                </CardBody>
            </Card>
        </Col>
    );
}
