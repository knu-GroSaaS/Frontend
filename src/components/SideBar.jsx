import React from 'react';

const SideBar = () => {
    return (
        <div style={{width: '276px', height: '100vh', background: '#BEACEB', position: 'relative'}}>
            {/* 로고와 텍스트 */}
            <div style={{display: 'flex', alignItems: 'center', padding: '20px', marginTop: '20px'}}>
                <img style={{width: 50, height: 50, marginRight: 10}} src="../Grosaas_logo.png" alt="Logo" />
                <div style={{color: '#2B00FF', fontSize: 24, fontFamily: 'Inter', fontWeight: '700'}}>GroSaaS</div>
            </div>

            {/* 대시보드 텍스트 */}
            <div style={{color: '#000', fontSize: 24, fontWeight: '700', marginLeft: '20px', marginTop: '20px'}}>
                Dashboard
            </div>

            {/* 메뉴 아이템들 */}
            <div style={{marginTop: '30px', marginLeft: '20px', color: '#FFFFFF', fontSize: 18, lineHeight: '2'}}>
                <div>Security Event</div>
                <div>Devices Status</div>
                <div>My Case List</div>
                <div>Download History</div>
            </div>

            {/* 구분선 */}
            <div style={{width: '80%', height: '1px', background: 'white', margin: '30px auto'}}></div>

            {/* Admin 정보 */}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', bottom: '60px', width: '100%', padding: '0 20px'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{width: 30, height: 30, borderRadius: '50%', background: '#000', marginRight: '10px'}}></div>
                    <div style={{color: '#000', fontSize: 18, fontWeight: '700'}}>Admin</div>
                </div>
                <div style={{width: 20, height: 20, background: '#000'}}></div>
            </div>

            {/* 로그아웃 */}
            <div style={{display: 'flex', alignItems: 'center', position: 'absolute', bottom: '20px', left: '20px', color: '#000', fontSize: 18, fontWeight: '700'}}>
                <div style={{marginRight: '10px'}}>Log out</div>
                <div style={{width: 20, height: 20, background: '#000'}}></div>
            </div>
        </div>
    );
};

export default SideBar;
