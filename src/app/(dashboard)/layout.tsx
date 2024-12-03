import Navbar from '@/components/Navbar'
import { ReactNode } from 'react'

function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className='relative flex h-screen w-full flex-col'>
            <Navbar />
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout
