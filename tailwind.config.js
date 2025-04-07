/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*.njk",
    "src/**/*.js",
    "src/**/*.ts",
    "src/**/*.jsx",
    "src/**/*.tsx",
    "src/**/*.md",
    "src/**/*.mdx",
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx,scss}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",  

  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.875rem",  
        sm: "1.875rem", 
        md: "1.875rem", 
        lg: "1.875rem", 
        xl: "1.875rem", 
        "2xl": "1.875rem", 
      },
      screens: {
        xs: "467px",  
        sm: "633px",  
        md: "825px",  
        lg: "1049px", 
        xl: "1257px", 
        "2xl": "1457px",
      },
    }
    ,
    extend: {
      colors: {
        mainColor:'var(--mainColor)',
        subColor: "var(--subColor)",
        customBlack:"#242424",
        customGray:"#929A9A",
        secondaryColor:"#808080",
        borderColor:"#E5E5E5",
      },
      order: {
        '13': '13'
      },
      borderRadius: {
         mainRadius: 'var(--mainRadius)'
      },
      screens:{
        xs:"410px",
        sm:"576px",
        md:"768px",
        lg:"992px",
        xl:"1200px",
        "2xl":"1400px",
      }
      ,
      container: {
				center: true,
				padding: {
					DEFAULT: "0.5rem",
					sm: "0.5rem",
					md: "1rem",
					lg: "2rem",
					xl: "3rem",
					"2xl": "4rem",
				},
			},
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    require("tailwindcss-animate"),
  ],
}

