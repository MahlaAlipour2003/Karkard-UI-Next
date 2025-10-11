'use client'

import React, { useEffect, useState } from "react";
import AddProjectModal from "@/components/AkarkardComponents/AddProjectModal";
import EditProjectModal from "@/components/AkarkardComponents/EditProjectModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "@/app/Redux/projectSlice";
import axiosInstance from "@/Infrastucture/axiosInstance";
import { RootState, AppDispatch } from "@/app/Redux/store";

interface Project {
    id: number;
    title: string;
    status: boolean;
    progress: number;
}

const ProjectPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { projects, loading, error } = useSelector((state: RootState) => state.project);

    const [selectedRowData, setSelectedRowData] = useState<Project | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const handleEditClick = (currentRow: Project) => setSelectedRowData(currentRow);
    const handleEditClosed = () => setSelectedRowData(null);
    const refreshGrid = () => dispatch(fetchProjects());
    const onAdded = () => refreshGrid();
    const onProjectSaved_Edited = () => refreshGrid();

    const handleToggleStatus = async (currentRow: Project) => {
        try {
            const data = {
                id: currentRow.id,
                title: currentRow.title,
                status: !currentRow.status,
                progress: currentRow.progress,
            };
            await axiosInstance.post("/baseInformation/project/addoredit", data);
            refreshGrid();
        } catch (error) {
            console.error("خطا در تغییر وضعیت", error);
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjectList = projects.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    if (error) return <div className="text-red-600 p-4">{error}</div>;
    if (loading) return <h4 className="p-4">در حال بارگیری...</h4>;

    return (
        <div className="p-4 bg-gray-100 rounded-2xl" dir="rtl">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg text-gray-800 font-semibold">ایجاد و تخصیص پروژه</h4>
                <AddProjectModal onAdded={onAdded} />
            </div>

            {/* فرم فیلتر */}
            <div className="bg-white shadow p-4 rounded mb-4 d-flex">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-6">
                    {/* عنوان پروژه */}
                    <div className="flex items-center gap-2">
                        <label className="bg-gray-200 text-gray-800 px-3 py-2 rounded flex-[1] font-medium">
                            عنوان پروژه
                        </label>
                        <input
                            type="text"
                            className="flex-[4] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                            placeholder="نام پروژه"
                        />
                    </div>

                    {/* وضعیت */}
                    <div className="flex items-center gap-2">
                        <label className="bg-gray-200 text-gray-800 px-3 py-2 rounded flex-[1] font-medium">
                            وضعیت
                        </label>
                        <select
                            className="flex-[4] border border-gray-300 text-gray-500 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                        >
                            <option>انتخاب کنید</option>
                            <option>فعال</option>
                            <option>غیر فعال</option>
                        </select>
                    </div>
                </div>

                <div>
                    <div className="md:col-span-2 flex justify-center gap-3 mt-7">
                        <button className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-500 transition">
                            جستجو
                        </button>
                        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition">
                            پاک کردن
                        </button>
                    </div>
                </div>
            </div>

            {/* جدول */}
            <div className="bg-white rounded shadow overflow-x-auto mt-5">
                <div className="flex justify-end items-center p-2">
                    <label className="ml-2">نمایش محتویات</label>
                    <select
                        className="border border-gray-300 rounded px-2 py-1 w-16 ml-2"
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    >
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                </div>
                <table className="min-w-full divide-y divide-gray-200 text-center">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-gray-800">شماره</th>
                            <th className="px-4 py-2 text-gray-700">عنوان پروژه</th>
                            <th className="px-4 py-2 text-gray-700">وضعیت</th>
                            <th className="px-4 py-2 text-gray-700">روند</th>
                            <th className="px-4 py-2 text-gray-700">عملیات</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-x divide-gray-200">
                        {currentProjectList.map((project, index) => (
                            <tr key={project.id}>
                                <td className="px-4 py-2 text-gray-700">{indexOfFirstItem + index + 1}</td>
                                <td className="px-4 py-2 text-gray-700 number">{project.title}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    <span
                                        className={`inline-flex items-center px-2 py-1 rounded-full ${project.status ? "text-green-400" : "text-red-400"
                                            }`}
                                    >
                                        {project.status ? "فعال" : "غیرفعال"}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-gray-700 number">
                                    <div className="flex items-center justify-center gap-2">
                                        <span>{project.progress}%</span>
                                        <div className="w-24 h-2 bg-gray-200 rounded">
                                            <div
                                                className={`h-2 rounded ${project.progress >= 60
                                                        ? "bg-green-300"
                                                        : project.progress >= 30
                                                            ? "bg-yellow-200"
                                                            : "bg-red-300"
                                                    }`}
                                                style={{ width: `${project.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-2 flex justify-center gap-2 text-gray-700">
                                    <button
                                        className="bg-purple-400 text-white px-3 py-1 rounded hover:bg-purple-500 transition"
                                        onClick={() => handleEditClick(project)}
                                    >
                                        ویرایش
                                    </button>
                                    <button
                                        className={`${project.status ? "bg-green-300" : "bg-red-300"
                                            } text-white px-3 py-1 rounded hover:opacity-90 transition`}
                                        onClick={() => handleToggleStatus(project)}
                                    >
                                        تغییر وضعیت
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end mt-4 space-x-2">
                <nav className="inline-flex -space-x-px">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={`px-3 py-1 border ${currentPage === i + 1
                                    ? "px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                                    : ""
                                } hover:bg-blue-500 transition`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </nav>
            </div>

            {selectedRowData && (
                <EditProjectModal
                    selectedRowData={selectedRowData}
                    isOpen={!!selectedRowData}
                    onClose={handleEditClosed}
                    onSaved={onProjectSaved_Edited}
                />
            )}
        </div>
    );
};

export default ProjectPage;
