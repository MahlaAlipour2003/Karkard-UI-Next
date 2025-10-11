'use client'
import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updateWorkType } from "@/app/Redux/workTypeSlice"; // مسیر صحیح پروژه خودت

interface WorkType {
    id: number;
    title: string;
}

interface EditWorkTypeModalProps {
    selectedRowData: WorkType | null;
    isOpen: boolean;
    onClose: () => void;
    onEdited: () => void;
}

const EditWorkTypeModal: React.FC<EditWorkTypeModalProps> = ({
    selectedRowData,
    isOpen,
    onClose,
    onEdited,
}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState<string>("");

    // مقداردهی اولیه هنگام باز شدن مودال
    useEffect(() => {
        if (selectedRowData) {
            setTitle(selectedRowData.title ?? "");
        }
    }, [selectedRowData]);

    const handleSave = async () => {
        if (!selectedRowData) return;

        const updated: WorkType = {
            id: selectedRowData.id,
            title,
        };

        try {
            await dispatch(updateWorkType(updated));
            onEdited();
        } catch (err) {
            console.error("خطا در ذخیره:", err);
        } finally {
            onClose();
        }
    };

    if (!isOpen || !selectedRowData) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6" dir="rtl">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h5 className="text-lg font-semibold">ویرایش نوع کار</h5>
                    <button
                        aria-label="Close"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <label className="w-1/3 text-right font-medium">عنوان نوع کار</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                            className="w-2/3 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

export default EditWorkTypeModal;
