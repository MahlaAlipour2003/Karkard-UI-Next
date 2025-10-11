import Calendar from "@/components/AkarkardComponents/calendar/Calendar";
import PageBreadcrumb from "@/components/AkarkardComponents/common/PageBreadCrumb"
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "تقویم",
  description:
    "ساملنه حضورو وغیاب و کنترل ورود و خروج کارمندان | تقویم",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="تقویم" />
      <Calendar />
    </div>
  );
}
