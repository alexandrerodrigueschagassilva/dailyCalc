/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Escaneia os arquivos na pasta 'app'
    './pages/**/*.{js,ts,jsx,tsx}', // Se estiver usando 'pages'
    './components/**/*.{js,ts,jsx,tsx}', // Componentes reutilizáveis
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
