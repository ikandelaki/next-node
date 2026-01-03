import Navbar from '@/components/Navbar/Navbar';
import React from 'react';
import './admin_styles.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='AdminLayout flex'>
            <Navbar />
            { children }
        </div>
    )
}