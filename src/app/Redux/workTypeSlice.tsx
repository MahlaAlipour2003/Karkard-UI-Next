// src/redux/workTypeSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/Infrastucture/axiosInstance";

// --------------------- Types ---------------------
export interface WorkType {
    id: number;
    title: string;
    status: boolean;
}

interface WorkTypeState {
    workTypes: WorkType[];
    loading: boolean;
    error: string | null;
}

// --------------------- Initial State ---------------------
const initialState: WorkTypeState = {
    workTypes: [],
    loading: false,
    error: null,
};

// --------------------- Async Thunks ---------------------
// گرفتن لیست WorkType ها
export const fetchWorkTypes = createAsyncThunk<WorkType[]>(
    "worktype/fetchWorkTypes",
    async () => {
        const response = await axiosInstance.get<WorkType[]>("/baseInformation/worktype/list");
        return response.data;
    }
);

// به‌روزرسانی WorkType
export const updateWorkTypeAsync = createAsyncThunk<WorkType, WorkType>(
    "worktype/update",
    async (worktype) => {
        const response = await axiosInstance.post<WorkType>(
            "/baseInformation/worktype/addoredit",
            worktype
        );
        return response.data;
    }
);

// --------------------- Slice ---------------------
const workTypeSlice = createSlice({
    name: "workType",
    initialState,
    reducers: {
        // آپدیت محلی WorkType (اختیاری)
        updateWorkType(state, action: PayloadAction<WorkType>) {
            const index = state.workTypes.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state.workTypes[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchWorkTypes
            .addCase(fetchWorkTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWorkTypes.fulfilled, (state, action: PayloadAction<WorkType[]>) => {
                state.workTypes = action.payload;
                state.loading = false;
            })
            .addCase(fetchWorkTypes.rejected, (state) => {
                state.error = "خطا در دریافت اطلاعات WorkType ها";
                state.loading = false;
            })
            // updateWorkTypeAsync
            .addCase(updateWorkTypeAsync.fulfilled, (state, action: PayloadAction<WorkType>) => {
                const index = state.workTypes.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.workTypes[index] = action.payload;
                } else {
                    state.workTypes.push(action.payload);
                }
            })
            .addCase(updateWorkTypeAsync.rejected, (state) => {
                state.error = "خطا در به‌روزرسانی WorkType";
            });
    },
});

// --------------------- Exports ---------------------
export const { updateWorkType } = workTypeSlice.actions;
export default workTypeSlice.reducer;
