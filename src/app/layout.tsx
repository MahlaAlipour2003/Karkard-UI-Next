//import { Outfit } from 'next/font/google';
import './globals.css';
/*import "@/assets/css/argon-dashboard-react.css";*/
/*import "@/assets/scss/argon-dashboard-react.scss";*/
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ReduxProvider } from "@/app/Redux/providers"

//const outfit = Outfit({
//  subsets: ["latin"],
//});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      {/*<body className={`${outfit.className} dark:bg-gray-900`}>*/}
      <body className="dark:bg-gray-900">
        <ReduxProvider>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
