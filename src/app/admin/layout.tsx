import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Notifications from "@/components/Notification/Notification";
import QueryProvider from "@/components/QueryProvider/QueryProvider";
import Navbar from "@/components/Navbar";
import "@/style/globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: '400'
});

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} antialiased`}>
                <div className="flex">
                    <Navbar />
                    <div className="py-2 px-8 w-full">
                        { children }
                    </div>
                    <Notifications />
                </div>
            </body>
        </html>
    );
}