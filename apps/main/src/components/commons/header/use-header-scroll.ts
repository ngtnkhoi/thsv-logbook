import { useState, useEffect, useRef } from "react";

export function useHeaderScroll() {
	const [isRolling, setIsRolling] = useState(false);
	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsRolling(!entry.isIntersecting);
			},
			{
				root: null,
				threshold: 0,
			}
		);

		observer.observe(sentinel);

		return () => {
			observer.unobserve(sentinel);
		};
	}, []);

	return { isRolling, sentinelRef };
}