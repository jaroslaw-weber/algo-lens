/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
	],


	theme: {
		extend: {
			translate: {
				'full': '100%',
				'-full': '-100%',
			},
			keyframes: {
				falling: {
					'0%': { transform: 'translateY(-100px) scale(0.5)', opacity: '0' },
					'100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
				}
			},
			animation: {
				'falling': 'falling 0.5s ease-out forwards',
			},
			fontFamily: {
				'sans': ["Open Sans", 'sans-serif'],
				'display': ["Bungee", 'sans-serif'],
				'code': ["Fira Code", 'monospace']
			}
		},

	}, plugins: [
		require('daisyui'),
	],
	safelist: [
		{
			pattern: /bg-(primary|error|success|neutral)/,
			variants: ['lg', 'hover', 'focus', 'lg:hover'],
		}, {
			pattern: /text-(primary|error|success|neutral)-content/,
			variants: ['lg', 'hover', 'focus', 'lg:hover'],
		},
		'tooltip-left',"tooltip-right", "tooltip-top", "tooltip-bottom",
		'bg-error',
		'text-error-content',
		'bg-success',
		'text-success-content',
		'bg-secondary',
		'text-secondary-content',
		'bg-accent',
		'text-accent-content',
		'bg-warning',
		'text-warning-content'
	],
	daisyui: {
		themes: [
			'silk'
		],
	}
};