'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    nationalCode: string;
    entryDate: string;
    phone: string;
    personnelCode: string;
    status: boolean;
}


const UsersPage: React.FC = () => {
    //const navigate = useNavigate();
    const router = useRouter();

    // ثبت کاربر جدید
    const handleNewUserBtn = () => router.push("/auth/insertnewuser");

    // ویرایش کاربر
    const handleEditUser = (userId: number) => router.push(`/auth/edituser/${userId}`);

    // داده تستی
    const users: User[] = [
        {
            id: 1,
            firstName: "مهلا",
            lastName: "علی پور",
            nationalCode: "1363507206",
            entryDate: "1403/07/20",
            phone: "09222915567",
            personnelCode: "76",
            status: true,
        },
    ];
   
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    return (
        <div className="p-4 bg-gray-100 rounded-2xl" dir="rtl">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg text-gray-800 font-semibold">لیست همکاران</h4>
                {/*<AddProjectModal onAdded={onAdded} />*/}
                <button
                    onClick={handleNewUserBtn}
                    className="flex items-center gap-2 bg-purple-400 text-white px-4 py-2 rounded hover:bgblue-700transition"
                >
                    <i className="ni ni-fat-add" />
                    ثبت مورد جدید
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded shadow overflow-x-auto mt-5">
                <div className="flex justify-end  items-center p-2">
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
                            <th className="px-4 py-2 text-gray-800">نام</th>
                            <th className="px-4 py-2 text-gray-800">نام خانوادگی</th>
                            <th className="px-4 py-2 text-gray-800">کد ملی</th>
                            <th className="px-4 py-2 text-gray-800">تاریخ ورود</th>
                            <th className="px-4 py-2 text-gray-800">شماره موبایل</th>
                            <th className="px-4 py-2 text-gray-800">کد پرسنلی</th>
                            <th className="px-4 py-2 text-gray-800">وضعیت</th>
                            <th className="px-9 py-2 text-gray-800">عملیات</th>
                         </tr>
                     </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {users.slice(0, itemsPerPage).map((user, idx) => (
                            <tr key={user.id} className="hover:bg-gray-50 rounded-lg">
                                <td className="px-4 py-2">{idx + 1}</td>
                                <td className="px-4 py-2">{user.firstName}</td>
                                <td className="px-4 py-2">{user.lastName}</td>
                                <td className="px-4 py-2">{user.nationalCode}</td>
                                <td className="px-4 py-2">{user.entryDate}</td>
                                <td className="px-4 py-2">{user.phone}</td>
                                <td className="px-4 py-2">{user.personnelCode}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`inline-flex items-center px-2 py-1 rounded-full ${user.status ? "text-green-400" : "text-red-400"
                                            }`}
                                    >
                                        {user.status ? "فعال" : "غیرفعال"}
                                    </span>
                                </td>
                                <td className="px-4 py-2 flex justify-center gap-2 whitespace-nowrap">
                                    <button
                                        className="bg-purple-400 text-white px-2 py-1 rounded hover:bg-purple-500 transition text-sm"
                                        onClick={() => handleEditUser(user.id)}
                                    >
                                        ویرایش
                                    </button>
                                    <button
                                        className={`inline-flex items-center px-2 py-1 rounded text-sm text-white ${user.status
                                                ? "bg-green-300 hover:bg-green-400"
                                                : "bg-red-300 hover:bg-red-400"
                                            } transition`}
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
               <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">
                   &lt;
               </button>
               <button className="px-3 py-1 bg-gray-400 text-white rounded">1</button>
               <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">
                   &gt;
               </button>
            </div>

        </div>
    );
};

export default UsersPage;
