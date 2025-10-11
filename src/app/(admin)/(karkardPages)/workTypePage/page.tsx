'use client'
import React, { useEffect, useState, ChangeEvent } from "react";
import AddWorkTypeModal from "@/components/AkarkardComponents/AddWorkTypeModal";
import EditWorkTypeModal from "@/components/AkarkardComponents/EditWorkTypeModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkTypes } from "@/app/Redux/workTypeSlice";
import { RootState, AppDispatch } from "@/app/Redux/store";

interface WorkType {
    id: number;
    title: string;
}

const WorkTypePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { workTypes, loading, error } = useSelector((state: RootState) => state.workType);

    const [selectedWorkType, setSelectedWorkType] = useState<WorkType | null>(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    useEffect(() => {
        dispatch(fetchWorkTypes());
    }, [dispatch]);

    const handleEditClick = (wt: WorkType) => setSelectedWorkType(wt);
    const handleEditClosed = () => setSelectedWorkType(null);

    const refreshGrid = () =>dispatch(fetchWorkTypes());

    const onAdded = () => refreshGrid();

    const onEdited = () => refreshGrid();

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentWorkTypeList = workTypes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(workTypes.length / itemsPerPage);

    if (error) return <div className="text-danger p-4">{error}</div>;
    if (loading) return <h4 className="p-4">در حال بارگیری...</h4>;

    return (
        < div className="p-4 bg-gray-100 rounded-2xl" dir="rtl" >
            {/* Header */}
            < div className="flex justify-between items-center mb-4" >
                < h4 className="text-lg font-semibold" > ایجاد نوع کار</ h4 >
                < AddWorkTypeModal onAdded={onAdded} />
            </ div >

            {/* Filter Section */}
            < div className="bg-white shadow p-4 rounded mb-4" >
                < div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4" >
                    {/* WorkType Title */}
                    < div className="flex items-center gap-2" >
                        < label className="bg-gray-200 text-gray-800 px-3 py-2 rounded flex-[1] font-medium" >
                            عنوان نوع کار
                        </ label >
                        < input
                            type="text"
                            className="flex-[4] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            placeholder="نام نوع کار"
                        />
                    </ div >
                </ div >
                < div className="flex justify-center gap-3 mt-4" >
                    < button className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-500 transition" > جستجو </ button >
                    < button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition" > پاک کردن </ button >
                </ div >
            </ div >

            {/* Table Section */}
            < div className="bg-white rounded shadow overflow-x-auto mt-5" >
                {/* Items per page */}
                < div className="flex justify-end  items-center p-2" >
                    < label className="ml-2" > نمایش محتویات </ label >
                    < select
                        className="border border-gray-300 rounded px-2 py-1 w-16 ml-2"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setItemsPerPage(Number(e.target.value))}
                        value={itemsPerPage}
                    >
                        < option value={10}> 10 </ option >
                        < option value={25}> 25 </ option >
                        < option value={50}> 50 </ option >
                    </ select >
                </ div >

                < table className="min-w-full divide-y divide-gray-200 text-center" >
                    < thead className="bg-gray-200" >
                        < tr >
                            < th className="px-4 py-2" > شماره </ th >
                            < th className="px-4 py-2" > عنوان نوع کار</ th >
                            < th className="px-4 py-2" > عملیات </ th >
                        </ tr >
                    </ thead >
                    < tbody className="bg-white divide-y divide-gray-200" >
                        {
                            currentWorkTypeList.map((wt: WorkType, index: number) => (
                                < tr key={wt.id}>
                                    < td className="px-4 py-2" >{index + 1}</ td >
                                    < td className="px-4 py-2" >{wt.title}</ td >
                                    < td className="px-4 py-2 flex justify-center gap-2" >
                                        < button
                                            className="bg-purple-400 text-white px-3 py-1 rounded hover:bg-orange-500 transition"
                                            onClick={() => handleEditClick(wt)}
                                        >
                                            ویرایش
                                        </ button >
                                    </ td >
                                </ tr >
                            ))}
                    </ tbody >
                </ table >
            </ div >

            {/* Pagination */}
            < div className="flex justify-end mt-4" >
                {
                    Array.from({ length: totalPages }, (_, i) => (
                        < button
                            key={i}
                            className={`px - 3 py - 1 border ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white text-gray-700"} hover: bg - blue - 500 transition`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </ button >
                    ))}
            </ div >

            {/* Edit Modal */}
            {
                selectedWorkType && (

                    < EditWorkTypeModal
                        selectedRowData={selectedWorkType}
                        isOpen={!!selectedWorkType}
                        onClose={handleEditClosed}
                        onEdited={onEdited}
                    />
                )}
        </ div >
    );
}
export default WorkTypePage;

    


