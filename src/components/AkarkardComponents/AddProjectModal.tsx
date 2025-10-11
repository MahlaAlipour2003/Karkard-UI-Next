import React, { useState, ChangeEvent } from "react";
import axiosInstance from "@/Infrastucture/axiosInstance";

interface AddProjectModalProps {
    onAdded: () => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ onAdded }) => {
    const [title, setTitle] = useState<string>("");
    const [modalState, setModalState] = useState<boolean>(false);

    const changeModalState = () => setModalState(!modalState);

    const callMethod = async () => {
        const data = {
            id: null,
            title: title,
            status: null,
        };
        await axiosInstance.post("/baseInformation/project/addoredit", data);
    };

    const handleSave = async () => {
        await callMethod();
        onAdded();
        changeModalState();
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

    return (
        <>
            <button
                className="w-1/5 bg-purple-500 text-white font-semibold py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-purple-400 transition"
                onClick={changeModalState}
            >
                <i className="ni ni-fat-add" />
                <span>ثبت مورد جدید</span>
            </button>

            {modalState && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-xl shadow-lg w-1/3 max-w-md flex flex-col">
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h5 className="text-lg font-semibold">ثبت پروژه جدید</h5>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={changeModalState}
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-1/4 text-right">عنوان پروژه</div>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={handleTitleChange}
                                    className="w-3/4 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-center gap-4 p-4 border-t border-gray-200">
                            <button
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition"
                                onClick={changeModalState}
                            >
                                بستن
                            </button>
                            <button
                                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
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

export default AddProjectModal;
