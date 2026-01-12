import Navbar from '@/components/Navbar/Navbar';
import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex'>
            <Navbar />
            <div className="py-2 px-8 w-full">
                { children }
            </div>
        </div>
    )
}