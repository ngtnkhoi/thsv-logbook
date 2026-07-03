import { useState, useEffect } from 'react';

export function useHeroScroll() {
	const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const vh = window.innerHeight;
			if (window.scrollY >= vh * 0.75) {
				setIsScrolledPastHero(true);
			} else {
				setIsScrolledPastHero(false);
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return isScrolledPastHero;
}