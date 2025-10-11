"use client";

import { Provider } from "react-redux";
import { store } from "@/app/Redux/store"; // مسیر استورت رو درست بذار

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
