'use client'

import React, { useEffect, useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updateProject, Project } from "@/app/Redux/projectSlice";
import { AppDispatch } from "@/app/Redux/store";
import { UnknownAction } from "@reduxjs/toolkit";


interface EditProjectModalProps {
    selectedRowData: Project | null;
    isOpen: boolean;
    onClose: () => void;
    onSaved?: () => void | Promise<void | UnknownAction>
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
    selectedRowData,
    isOpen,
    onClose,
    onSaved,
}) => {
    const dispatch = useDispatch<AppDispatch>();

    const [title, setTitle] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        if (selectedRowData) {
            setTitle(selectedRowData.title);
            setProgress(selectedRowData.progress);
        }
    }, [selectedRowData]);

    const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProgress(Number(e.target.value));
    };

    const handleSave = async () => {
        if (!selectedRowData) return;

        const updated: Project = {
            ...selectedRowData,
            title,
            progress,
        };

        try {
            const actionResult = await dispatch(updateProject(updated));

            if (updateProject.fulfilled.match(actionResult)) {
                // موفقیت‌آمیز
                if (onSaved) await onSaved();
            } else if (updateProject.rejected.match(actionResult)) {
                console.error("خطا در ذخیره پروژه:", actionResult.error?.message);
            }
        } catch (error) {
            console.error("خطای غیرمنتظره:", error);
        } finally {
            onClose();
        }
    };

    if (!isOpen || !selectedRowData) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg w-1/3 max-w-md p-6" dir="rtl">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h5 className="text-lg font-semibold">ویرایش پروژه</h5>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-4">
                    {/* Title */}
                    <div className="flex items-center gap-4">
                        <label className="w-1/4 text-right">عنوان پروژه</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-3/4 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Progress */}
                    <div>
                        <label className="block mb-2">درصد پیشرفت: {progress}%</label>
                        <div className="w-full h-4 bg-gray-200 rounded">
                            <div
                                className={`h-4 rounded ${progress >= 70
                                        ? "bg-green-500"
                                        : progress >= 30
                                            ? "bg-yellow-400"
                                            : "bg-red-500"
                                    }`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={progress}
                            onChange={handleProgressChange}
                            className="w-full mt-3 accent-orange-500"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                        onClick={onClose}
                    >
                        بستن
                    </button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        onClick={handleSave}
                    >
                        ذخیره
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProjectModal;
