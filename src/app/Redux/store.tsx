// src/app/Redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./projectSlice";
import workTypeSlice from "./workTypeSlice";

export const store = configureStore({
    reducer: {
        project: projectSlice,
        workType: workTypeSlice,
    },
});

// تایپ RootState و AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
