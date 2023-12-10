/** @type {import('tailwindcss').Config}*/

/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
				title: ['Montserrat', ...defaultTheme.fontFamily.sans],
				mono: ['Noto Sans Mono', ...defaultTheme.fontFamily.mono],
			},
		}
	},

	plugins: [
		
	]
};

module.exports = config;
