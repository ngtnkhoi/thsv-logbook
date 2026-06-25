import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";

interface LogoTextProps {
    /** Prop điều khiển thu nhỏ thủ công từ bên ngoài (nếu cần) */
    isRolling?: boolean;
}

export const LogoText: React.FC<LogoTextProps> = ({ isRolling = false }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const shouldShrink = isScrolled || isRolling;

    return (
        <Box
            position="fixed"
            inset={0}
            pointerEvents="none"
            zIndex={50}
        >
            <Text
                as="h1" // Giữ nguyên định dạng thẻ h1 về mặt SEO/Semantic HTML
                position="absolute"
                pointerEvents="auto"
                fontWeight="bold"
                whiteSpace="nowrap"

                // Cấu hình Transition mượt mà chuẩn Chakra UI
                transition="all 0.5s ease-in-out"

                // Biện luận vị trí và kích thước dựa theo trạng thái cuộn
                top={shouldShrink ? "1rem" : "50%"}
                left={shouldShrink ? "1rem" : "50%"}
                transform={shouldShrink ? "translate(0, 0)" : "translate(-50%, -50%)"}

                // Định dạng cỡ chữ: Khi thu nhỏ là 'xl', khi ở giữa sẽ responsive theo màn hình
                fontSize={
                    shouldShrink
                        ? "xl"
                        : { base: "4xl", md: "5xl", lg: "6xl" }
                }
            >
                SÀI GÒN UNFOLDED
            </Text>
        </Box>
    );
};

export default LogoText;