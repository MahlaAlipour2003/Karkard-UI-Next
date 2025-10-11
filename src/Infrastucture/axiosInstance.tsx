import axios, { AxiosError, InternalAxiosRequestConfig} from "axios";

interface UserInformation {
    token: string;
    [key: string]: unknown;
}

const axiosInstance = axios.create({
    baseURL: "https://localhost:8215",
    headers: {
        "Content-Type": "application/json",
    },
});

// درخواست قبل از ارسال
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const userInformationStr = localStorage.getItem("userInformation");
        if (userInformationStr) {
            try {
                const userInformation: UserInformation = JSON.parse(userInformationStr);
                if (userInformation?.token) {
                    // اینجا به‌جای spread باید از set استفاده بشه
                    config.headers.set("Authorization", `Bearer ${userInformation.token}`);
                }
            } catch (err) {
                console.error("Failed to parse user information from localStorage", err);
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);


// پاسخ بعد از دریافت
axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            const status = error.response.status;

            switch (status) {
                case 400:
                    console.error("400: Bad Request");
                    break;
                case 401:
                    console.error("401: Unauthorized - maybe redirect to login");
                    break;
                case 403:
                    console.error("403: Forbidden");
                    break;
                case 404:
                    console.error("404: Not Found");
                    break;
                case 500:
                    console.error("500: Server Error");
                    break;
                default:
                    console.error(`${status}: Unknown error`);
            }
        } else if (error.request) {
            console.error("Request sent but no response received");
        } else {
            console.error("Error setting up request:", error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
