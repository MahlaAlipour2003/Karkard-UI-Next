'use client'
import React, { useState, ChangeEvent } from "react";
import axiosInstance from "@/Infrastucture/axiosInstance";

interface WorkType {
    id: number | null;
    title: string;
}

interface AddWorkTypeModalProps {
    onAdded: () => void;
}

const AddWorkTypeModal: React.FC<AddWorkTypeModalProps> = ({ onAdded }) => {
    const [title, setTitle] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleModal = () => setIsOpen(!isOpen);

    const handleSave = async () => {
        const data: WorkType = { id: null, title };
        try {
            await axiosInstance.post("/baseInformation/worktype/addoredit", data);
            onAdded();
            setTitle(""); // ریست کردن فیلد بعد از ذخیره
        } catch (err) {
            console.error("خطا در ذخیره:", err);
        } finally {
            toggleModal();
        }
    };

    return (
        <>
            <button
                onClick={toggleModal}
                className="flex items-center justify-center gap-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-400 transition w-1/5"
            >
                <i className="ni ni-fat-add" />
                ثبت مورد جدید
            </button>


            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6" dir="rtl">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h5 className="text-lg font-semibold">ثبت نوع کار جدید</h5>
                            <button
                                aria-label="Close"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={toggleModal}
                            >
                                ×
                            </button>
                        </div>

                        {/* Body */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <label className="w-1/3 text-right font-medium">عنوان کار</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                                    className="w-2/3 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="نام نوع کار"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                                onClick={toggleModal}
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
            )}
        </>
    );
};

export default AddWorkTypeModal;
