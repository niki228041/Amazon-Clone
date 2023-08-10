/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
    },
    screens:{
      sm:'480px',
      md:'768px',
      lg:'976px',
      xl:'1440px'
    },
    extend: {
      colors:{
        grayColorForBorder:'#DEE2E7',
        grayForText:'#8B96A5',
        mainYellowColor:"#FF9A02",
        darkBlueColor:"#002A42",
        grayColorForHeader:'#666666',
        whiteForHeader:'#FFFFFF',
        lightOrangeColor:"#FFF0DF",
        grayForPlayerColor:"#252525",
        almostBlackColor:"#101010",
        middleGrayColor:"#353535",
        orangeColor:"#E9671E",
        almostWhiteColor:"#C9C9C9",
        whiteGrayColor:"#474747"
      }
    }
  },
  plugins: [],
}

