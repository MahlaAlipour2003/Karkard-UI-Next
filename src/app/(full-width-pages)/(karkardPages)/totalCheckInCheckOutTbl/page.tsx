'use client'
import React from "react";
import WeeklyCheckInCheckOutTbl from "@/app/(full-width-pages)/(karkardPages)/weeklyCheckInCheckOutTbl/page";
import DatePicker from "@/components/AkarkardComponents/DatePicker";

//type TotalCheckInCheckOutTblProps = {
//    // اگر قراره دیتایی از بیرون بیاد اینجا تایپ بده
//    // مثلا: projects?: any[];
//};

//const TotalCheckInCheckOutTbl: React.FC<TotalCheckInCheckOutTblProps> = () => {
const TotalCheckInCheckOutTbl = () => {
    // Pagination logic
    //const [currentPage, setCurrentPage] = useState<number>(1);
    //const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    //const indexOfLastItem = currentPage * itemsPerPage;
    //const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentProjectList = projects.slice(indexOfFirstItem, indexOfLastItem);
    // const totalPages = Math.ceil(projects.length / itemsPerPage);

    //const [startDate, setStartDate] = useState<Date | null>(null);

    return (
        <div className="w-full p-6 bg-green-50 rounded-2xl text-right">
            {/* فرم فیلتر */}
            <div className="bg-white shadow p-4 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap">از تاریخ</label>
                        <DatePicker />
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap">تا تاریخ</label>
                        <DatePicker />
                    </div>
                </div>

                <div className="flex justify-center gap-3 mt-6">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
                        جستجو
                    </button>
                    <button className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500">
                        پاک کردن
                    </button>
                </div>
            </div>

            {/* جدول */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-bold">جدول ورود و خروج</h2>
                </div>
                <div className="p-4">
                    <WeeklyCheckInCheckOutTbl />
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-end mt-4">
                {/* 
        {Array.from({ length: totalPages }, (_, pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => setCurrentPage(pageIndex + 1)}
            className={`mx-1 px-3 py-1 rounded-lg ${
              currentPage === pageIndex + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {pageIndex + 1}
          </button>
        ))}
        */}
            </div>
        </div>
    );
};

export default TotalCheckInCheckOutTbl;
