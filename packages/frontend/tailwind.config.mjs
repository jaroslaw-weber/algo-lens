import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
		"../frontend-premium/src/**/*.{js,ts,jsx,tsx}"
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
			},
			colors: {
				primary: {
					100: '#dbeafe',
					200: '#bfdbfe',
					300: '#93c5fd',
					400: '#60a5fa',
					500: '#3b82f6',
					600: '#2563eb',
					700: '#1d4ed8',
					800: '#1e40af',
					900: '#1e3a8a'
				},
				...colors
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
		}, {
			pattern: /bg-primary-\d+/,
			variants: ['lg', 'hover', 'focus', 'lg:hover'],
		},
		'tooltip-left', "tooltip-right", "tooltip-top", "tooltip-bottom",
		'bg-error',

		'text-error-content',
		'bg-success',
		'text-success-content',
		'bg-secondary',
		'text-secondary-content',
		'bg-accent',
		'text-accent-content',
		'bg-warning',
		'text-warning-content',
		'bg-neutral',
		'text-neutral-content',
		"text-7xl",
		"text-5xl",
		"py-8",
		"mt-16",
		'font-extrabold',
		'mb-16',
		'text-gray-800',
		'modal',
		'modal-box',
		'modal-action'
	],
	daisyui: {
		themes: [
			{
				silk: {
					'primary-100': '#dbeafe',
					'primary-200': '#bfdbfe',
					'primary-300': '#93c5fd',
					'primary-400': '#60a5fa',
					'primary-500': '#3b82f6',
					'primary-600': '#2563eb',
					'primary-700': '#1d4ed8',
					'primary-800': '#1e40af',
					'primary-900': '#1e3a8a'
				}
			}
		],
	}
};