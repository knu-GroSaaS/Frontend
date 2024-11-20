import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SideBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 로컬 스토리지에 저장된 토큰 삭제
        localStorage.removeItem('authToken');

        // 메인 페이지로 이동
        navigate('/');
    };

    return (
        <div className="w-[276px] h-screen bg-[#BEACEB] relative py-16">
            {/* Logo and Text */}
            <div className="flex items-center pl-[19.5px] mb-1.5">
                <img className="w-12 h-12 mr-1.5" src="src/assets/Grosaas_logo.png" alt="Logo" />
                <div className="text-[#2B00FF] text-xl font-bold" style={{ fontFamily: 'Inter' }}>GroSaaS</div>
            </div>

            {/* Dashboard Title */}
            <div className="text-black text-2xl font-bold ml-[19.5px] mt-1.5" style={{ fontFamily: 'Inter' }}>
                Dashboard
            </div>

            {/* Menu Items */}
            <div className="mt-8 ml-[19.5px] text-white text-lg font-bold leading-relaxed space-y-2">
                <Link to="/security-event" className="block">Security Event</Link>
                <Link to="/devices-status" className="block">Devices Status</Link>
                <Link to="/dashboard" className="block">My Case List</Link>
                <Link to="/download-history" className="block">Download History</Link>
            </div>

            {/* Admin Information */}
            <div className="flex items-center justify-between absolute bottom-16 w-full px-[19.5px]">
                <div className="flex items-center">
                    <img className="w-12 h-12 mr-2.5" src="src/assets/usericon.png" alt="User Icon" />
                    <div className="text-black text-base font-bold">Admin</div>
                </div>
                <img className="w-5 h-5" src="src/assets/settingicon.png" alt="Setting Icon" />
            </div>

            {/* Logout */}
            <div className="flex items-center absolute bottom-5 left-[19.5px] text-black text-base font-bold cursor-pointer" onClick={handleLogout}>
                <img className="w-5 h-5 mr-2.5" src="src/assets/logouticon.png" alt="Logout Icon" />
                <div>Log out</div>
            </div>
        </div>
    );
};

export default SideBar;
