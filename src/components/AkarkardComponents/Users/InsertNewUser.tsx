'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface UserForm {
    firstName: string;
    lastName: string;
    nationalCode: string;
    birthDate: string;
    mobile: string;
    entryDate: string;
    gender: string;
    maritalStatus: string;
}

const InsertNewUser: React.FC = () => {
    const router = useRouter();

    const [formData, setFormData] = useState<UserForm>({
        firstName: "",
        lastName: "",
        nationalCode: "",
        birthDate: "",
        mobile: "",
        entryDate: "",
        gender: "",
        maritalStatus: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        try {
            await axios.post("/api/users", formData, {
                headers: { "Content-Type": "application/json" },
            });
            router.back();
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    const handleBack = () => router.back();

    return (
        <div className="w-full flex justify-center mt-10">
            <div className="w-11/12 max-w-5xl bg-gray-100 rounded-xl p-6" dir="rtl">
                <h2 className="text-xl font-bold mb-6 text-right">ثبت کاربر جدید</h2>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* ستون اول */}
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label className="mb-1 text-right">نام</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="نام"
                                className="w-full md:w-3/4 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 text-right">کد ملی</label>
                            <input
                                type="text"
                                name="nationalCode"
                                value={formData.nationalCode}
                                onChange={handleChange}
                                placeholder="کد ملی"
                                className="w-full md:w-3/4 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 text-right">شماره موبایل</label>
                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="شماره موبایل"
                                className="w-full md:w-3/4 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 text-right">تاریخ تولد</label>
                            <input
                                type="text"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                placeholder="تاریخ تولد"
                                className="w-full md:w-3/4 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>

                    {/* ستون دوم */}
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label className="mb-1 text-right">نام خانوادگی</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="نام خانوادگی"
                                className="w-full md:w-3/4 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 text-right">تاریخ ورود</label>
                            <input
                                type="text"
                                name="entryDate"
                                value={formData.entryDate}
                                onChange={handleChange}
                                placeholder="تاریخ ورود"
                                className="w-full md:w-3/4 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 text-right">جنسیت</label>
                            <input
                                type="text"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                placeholder="جنسیت"
                                className="w-full md:w-3/4 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 text-right">وضعیت تاهل</label>
                            <input
                                type="text"
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleChange}
                                placeholder="وضعیت تاهل"
                                className="w-full md:w-3/4 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                </div>

                {/* دکمه‌ها */}
                <div className="flex justify-center mt-10 gap-4">
                    <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
                    >
                        ثبت اطلاعات
                    </button>
                    <button
                        onClick={handleBack}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
                    >
                        بازگشت
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InsertNewUser;
