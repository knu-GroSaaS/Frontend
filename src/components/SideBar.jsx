import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div style={{ width: '276px', height: '100vh', background: '#BEACEB', position: 'relative', padding: '60px 0' }}>
            {/* Logo and Text */}
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '19.5px', marginBottom: '5px' }}>
                <img style={{ width: 50, height: 50, marginRight: 5 }} src="../Grosaas_logo.png" alt="Logo" />
                <div style={{ color: '#2B00FF', fontSize: 25, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>GroSaaS</div>
            </div>

            {/* Dashboard Title */}
            <div style={{ color: '#040404', fontSize: 30, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word',marginLeft: '19.5px', marginTop: '5px' }}>
                Dashboard
            </div>

            {/* Menu Items */}
            <div style={{ marginTop: '30px', marginLeft: '19.5px', color: 'white', fontSize: 20, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word', lineHeight: '2.5' }}>
                <Link to="/security-event" style={{ color: 'white', textDecoration: 'none', display: 'block' }}>Security Event</Link>
                <Link to="/devices-status" style={{ color: 'white', textDecoration: 'none', display: 'block' }}>Devices Status</Link>
                <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', display: 'block' }}>My Case List</Link>
                <Link to="/download-history" style={{ color: 'white', textDecoration: 'none', display: 'block' }}>Download History</Link>
            </div>

            {/* Admin Information */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', bottom: '60px', width: '100%', padding: '0 19.5px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img style={{ width: 50, height: 50, marginRight: 10 }} src="../usericon.png" alt="User Icon" />
                    <div style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Admin</div>
                </div>
                <img style={{ width: 20, height: 20 }} src="../settingicon.png" alt="Setting Icon" />
            </div>

            {/* Logout */}
            <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', bottom: '20px', left: '19.5px', color: '#000', fontSize: 18, fontWeight: '700' }}>
                <img style={{ width: 20, height: 20, marginRight: 10 }} src="../logouticon.png" alt="Logout Icon" />
                <div>Log out</div>
            </div>
        </div>
    );
};

export default SideBar;
