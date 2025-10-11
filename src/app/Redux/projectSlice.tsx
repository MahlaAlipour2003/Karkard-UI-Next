// src/redux/projectSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/Infrastucture/axiosInstance";

// --------------------- Types ---------------------
export interface Project {
    id: number;
    title: string;
    status: boolean;
    progress: number;
}

interface ProjectState {
    projects: Project[];
    loading: boolean;
    error: string | null;
}

// --------------------- Initial State ---------------------
const initialState: ProjectState = {
    projects: [],
    loading: false,
    error: null,
};

// --------------------- Async Thunks ---------------------
// گرفتن لیست پروژه‌ها
export const fetchProjects = createAsyncThunk<Project[]>(
    "project/fetchProjects",
    async () => {
        const response = await axiosInstance.get<Project[]>("/baseInformation/project/list");
        return response.data;
    }
);

// به‌روزرسانی پروژه
export const updateProject = createAsyncThunk<Project, Project>(
    "project/updateProject",
    async (project) => {
        const response = await axiosInstance.post<Project>("/baseInformation/project/addoredit", project);
        return response.data;
    }
);

// --------------------- Slice ---------------------
const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        // آپدیت محلی (در صورت نیاز)
        localUpdateProject(state, action: PayloadAction<Project>) {
            const index = state.projects.findIndex(p => p.id === action.payload.id);
            if (index !== -1) state.projects[index] = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchProjects
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
                state.projects = action.payload;
                state.loading = false;
            })
            .addCase(fetchProjects.rejected, (state) => {
                state.error = "خطا در دریافت اطلاعات پروژه‌ها";
                state.loading = false;
            })
            // updateProject
            .addCase(updateProject.fulfilled, (state, action: PayloadAction<Project>) => {
                const index = state.projects.findIndex(p => p.id === action.payload.id);
                if (index !== -1) state.projects[index] = action.payload;
            });
    },
});

// export const { localUpdateProject } = projectSlice.actions;
export default projectSlice.reducer;
