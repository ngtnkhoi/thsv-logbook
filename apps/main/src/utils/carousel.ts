import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

export function useCarouselButtons(emblaApi: EmblaCarouselType | undefined) {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollPrev();
	}, [emblaApi]);

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollNext();
	}, [emblaApi]);

	const toggleButtonsDisabled = useCallback((api: EmblaCarouselType) => {
		setPrevBtnDisabled(!api.canScrollPrev());
		setNextBtnDisabled(!api.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		toggleButtonsDisabled(emblaApi);

		emblaApi.on("select", toggleButtonsDisabled);
		emblaApi.on("init", toggleButtonsDisabled);
	}, [emblaApi, toggleButtonsDisabled]);

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	};
}