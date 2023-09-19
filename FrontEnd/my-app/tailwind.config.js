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
      lgMain: ['20px', '32px'],
      xlMain: ['24px', '32px'],
      baseMain: ['19px', '32px'],
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
        playerSelectedTabColor:"#1E1E1E",
        orangeColor:"#E9671E",
        almostWhiteColor:"#C9C9C9",
        whiteGrayColor:"#474747",
        grayForCheckBox:"#1A1A1A",
        optionsGrayColor:"#EEF0F4",
        optionsGrayBlueColor: "#7D8FA9",
        optionsGrayDarkBlueColor: "#002A42",
        optionsWhiterDarkBlueColor: "#586A84",
        optionsBlueThumbColor: "#319DFF",
        optionsGrayForBorder:"#5A5B6A",
        bodyColor:"#FFFFFF",
        almostWhiteBlue:"#EBF2FF",
        almostWhiteGreen:"#ECF7ED",
        optionsGreenColorFor:"#37833B",
        whiteColor:"#FFFFFF",
        whiteGray:"#8B96A5",
        musicHeaderGray:"#697475",
        whiteGrayComment:"#F0F0F0",
        grayForProductToast:"#D9D9D9",
        litleYellow:"#fffbe8",
        veryYellowColor:"#BEBEBE",
        veryWhiteGrayColor:"#6F6F6F",
        mostWhiteGrayColor:"#8a8a8a"

      }
    },
    fontFamily: {
      'header': ['Raleway'],
      'mainImage': ['Centurygothic']
    }
  },
  plugins: [],
}