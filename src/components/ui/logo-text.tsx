import React, { useEffect, useState } from "react";

interface LogoTextProps {
    /** Prop điều khiển thu nhỏ thủ công từ bên ngoài (nếu cần) */
    isRolling?: boolean;
}

export const LogoText: React.FC<LogoTextProps> = ({ isRolling = false }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Hàm kiểm tra trạng thái cuộn trang
        const handleScroll = () => {
            // Nếu người dùng cuộn xuống quá 20px, kích hoạt trạng thái thu nhỏ
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Đăng ký sự kiện scroll với { passive: true } để tối ưu hiệu năng trình duyệt
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Dọn dẹp sự kiện khi component bị unmount để tránh rò rỉ bộ nhớ
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Trạng thái thu nhỏ kích hoạt khi CUỘN TRANG hoặc được ép bằng PROP isRolling
    const shouldShrink = isScrolled || isRolling;

    return (
        <div
            className="fixed inset-0 pointer-events-none z-50"
            aria-hidden="true"
        >
            <h1
                className={`
          absolute pointer-events-auto font-bold whitespace-nowrap
          transition-all duration-500 ease-in-out
          ${
                    shouldShrink
                        ? "top-4 left-4 translate-x-0 translate-y-0 text-xl" // Trạng thái thu nhỏ góc trái trên
                        : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-5xl lg:text-6xl" // Trạng thái to đùng ở giữa màn hình
                }
        `}
            >
                SAI GON UNFOLDED
            </h1>
        </div>
    );
};

export default LogoText;