/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Open Sans"],
			},
			transitionProperty: {
				height: "height",
			},
			fontSize: {
				"2xs": ["0.5rem", "0.5rem"],
			},
			zIndex: {
				1: "1",
			},
		},
	},
	plugins: [],
};
