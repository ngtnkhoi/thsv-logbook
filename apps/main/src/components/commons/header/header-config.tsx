export const HEADER_STYLES = {
	wrapper: {
		position: "sticky",
		top: 0,
		zIndex: 100,
		w: "full",
		backgroundImage: "url('/buu-dien.jpg')",
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		backgroundBlendMode: "multiply",
		transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
	},

	leftActions: {
		position: "absolute",
		top: 3,
		left: 4,
		zIndex: 10,
	},

	rightLogo: {
		position: "absolute",
		top: 3,
		right: 6,
		zIndex: 10,
		w: "max-content",
		transform: "scale(0.4)",
		transformOrigin: "top right",
		transition: "opacity 0.25s ease-in-out",
		opacity: 0,
		pointerEvents: "none",
		"[data-scrolled='true'] &": {
			opacity: 1,
			pointerEvents: "auto",
		},
	},

	centerStack: {
		pt: { base: "50px", md: 3 },
		gap: 0,
		justify: "flex-start",
		transition: "padding 0.4s ease-in-out",
		pb: 0,
		"[data-scrolled='true'] &": {
			pb: 6,
		},
	},

	logoTextWrapper: {
		overflow: "hidden",
		transition: "opacity 0.2s ease-in-out, max-height 0.35s ease-in-out",
		opacity: 1,
		maxH: "150px",
		"[data-scrolled='true'] &": {
			opacity: 0,
			maxH: 0,
		},
	},
};