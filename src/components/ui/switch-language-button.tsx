import React, { useState, useEffect } from 'react';

// 1. BỘ TỪ ĐIỂN CHỨA CHỮ (Gộp trực tiếp vào đây)
export const translations = {
    VN: {
        switchBtn: "VN",
        searchBtn: "Tìm kiếm",
        title: "Tiêu đề",
        home: "Trang chủ",
        about: "Giới thiệu",
        contact: "Liên hệ"
    },
    EN: {
        switchBtn: "EN",
        searchBtn: "Search",
        title: "Title",
        home: "Home",
        about: "About",
        contact: "Contact"
    }
};

export const SwitchLanguageButton = () => {
    // 2. QUẢN LÝ NGÔN NGỮ (Mặc định ban đầu là Tiếng Việt 'VN')
    const [language, setLanguage] = useState<'VN' | 'EN'>('VN');

    // Kiểm tra xem trước đó người dùng có bấm chọn Tiếng Anh không để giữ nguyên khi reload trang
    useEffect(() => {
        const savedLang = localStorage.getItem('ngon_ngu_da_luu');
        if (savedLang === 'VN' || savedLang === 'EN') {
            setLanguage(savedLang);
        }
    }, []);

    // Hàm xử lý khi click vào nút bấm thì đổi qua lại giữa VN <-> EN
    const toggleLanguage = () => {
        const nextLang = language === 'VN' ? 'EN' : 'VN';
        setLanguage(nextLang);
        localStorage.setItem('ngon_ngu_da_luu', nextLang); // Lưu vào máy người dùng

        // Tạo một sự kiện nhỏ để báo cho toàn bộ các file khác biết ngôn ngữ vừa thay đổi
        window.dispatchEvent(new Event('languageChange'));
    };

    return (
        <button
            onClick={toggleLanguage}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                background: '#ffffff',
                color: '#1e293b',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                transition: 'all 0.2s'
            }}
        >
            {/* Icon Quả địa cầu độ nét cao vẽ bằng code */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>

            {/* Chữ hiển thị VN hoặc EN trên nút bấm */}
            <span>{language}</span>
        </button>
    );
};

// 3. HÀM TIỆN ÍCH (Dùng để các file khác như Search, Nav gọi chữ ra hiển thị)
export const useTranslation = () => {
    const [language, setLanguage] = useState<'VN' | 'EN'>((localStorage.getItem('ngon_ngu_da_luu') as 'VN' | 'EN') || 'VN');

    useEffect(() => {
        const handleLangChange = () => {
            setLanguage((localStorage.getItem('ngon_ngu_da_luu') as 'VN' | 'EN') || 'VN');
        };
        window.addEventListener('languageChange', handleLangChange);
        return () => window.removeEventListener('languageChange', handleLangChange);
    }, []);

    return { t: translations[language], language };
};