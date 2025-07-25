
export default {
    darkMode: ["class"],

    content: [
        './components/**/*.{ts,tsx,js,jsx}',
        './app/**/*.{ts,tsx,js,jsx}',
        './src/**/*.{ts,tsx,js,jsx}',
    ],

    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                'chart-1': 'hsl(var(--chart-1))',
                'chart-2': 'hsl(var(--chart-2))',
                'chart-3': 'hsl(var(--chart-3))',
                'chart-4': 'hsl(var(--chart-4))',
                'chart-5': 'hsl(var(--chart-5))',
                'sidebar-background': 'hsl(var(--sidebar-background))',
                'sidebar-foreground': 'hsl(var(--sidebar-foreground))',
                'sidebar-primary': 'hsl(var(--sidebar-primary))',
                'sidebar-primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                'sidebar-accent': 'hsl(var(--sidebar-accent))',
                'sidebar-accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                'sidebar-border': 'hsl(var(--sidebar-border))',
                'sidebar-ring': 'hsl(var(--sidebar-ring))',
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: ['tailwindcss-animate', require("tailwindcss-animate")],
};
