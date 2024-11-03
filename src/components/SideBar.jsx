import React from 'react';

const SideBar = () => {
    return (
        <div style={{width: '276px', height: '100vh', background: '#BEACEB', position: 'relative'}}>
            {/* 로고와 텍스트 */}
            <div style={{display: 'flex', alignItems: 'center', paddingLeft: '19.5px', paddingTop: '19.5px'}}>
                <img style={{width: 50, height: 50, marginRight: 10}} src="../Grosaas_logo.png" alt="Logo" />
                <div style={{color: '#2B00FF', fontSize: 24, fontFamily: 'Inter', fontWeight: '700'}}>GroSaaS</div>
            </div>

            {/* 대시보드 텍스트 */}
            <div style={{color: '#000', fontSize: 24, fontWeight: '700', marginLeft: '19.5px', marginTop: '20px'}}>
                Dashboard
            </div>

            {/* 메뉴 아이템들 */}
            <div style={{marginTop: '30px', marginLeft: '19.5px', color: '#FFFFFF', fontSize: 18, lineHeight: '2'}}>
                <div>Security Event</div>
                <div>Devices Status</div>
                <div>My Case List</div>
                <div>Download History</div>
            </div>

            {/* 구분선 */}
            <div style={{width: '225.5px', height: '1px', background: 'white', margin: '30px 19.5px'}}></div>

            {/* Admin 정보 */}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', bottom: '60px', width: '100%', padding: '0 19.5px'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img style={{width: 50, height: 50, marginRight: 10}} src="../usericon.png" alt="User Icon" />
                    <div style={{color: '#000', fontSize: 18, fontWeight: '700'}}>Admin</div>
                </div>
                <img style={{width: 20, height: 20}} src="../settingicon.png" alt="Setting Icon" />
            </div>

            {/* 로그아웃 */}
            <div style={{display: 'flex', alignItems: 'center', position: 'absolute', bottom: '20px', left: '19.5px', color: '#000', fontSize: 18, fontWeight: '700'}}>
                <img style={{width: 20, height: 20, marginRight: 10}} src="../logouticon.png" alt="Logout Icon" />
                <div>Log out</div>
            </div>
        </div>
    );
};

export default SideBar;
