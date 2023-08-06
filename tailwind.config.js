import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            width: {
                'moz-available': '-moz-available',
            },
            backgroundColor: {
                'dark': 'rgb(15 23 42 / 0.3)',
            },
            borderColor: {
                'dark': 'rgb(51 65 85 / var(--tw-border-opacity))',
            },
        },
    },

    plugins: [forms, typography],
};
