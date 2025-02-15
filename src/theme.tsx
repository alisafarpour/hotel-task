import iranYekanRegular from '/fonts/IRANYekanX-Regular.woff'
import { createTheme } from '@mui/material'

const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#316f6d',
                },
                secondary: {
                    main: '#c3c3c3',
                },
            },
        },
    },
    typography: {
        fontFamily: ['yekanNormal'].join(','),
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'yekanNormal';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: url(${iranYekanRegular}) format('woff');
        }
        html {
          scroll-behavior: smooth;
          height:100%;
        }
        * {
          scroll-margin-top: 20px;
        }
        body {
          user-select: none;
          overflow-x: hidden;
          min-height: 100vh;
          min-width: 100wv;
          height:100%;
          background-color: #f9f9f9;
          & a {
            text-decoration: none;
            color: inherit;
          }
          & .MuiList-root {
            padding-top: 0px;
            padding-bottom: 0px;
          }
          & .max-width-1136 {
            max-width: 1136px !important;
          }
          & .max-width-1312 {
            max-width: 1312px !important;
          }
          & .section-margin-bottom {
            margin-bottom: 144px !important;
            @media (max-width:900px) {
              margin-bottom: 104px !important;
            }
          } 
          min-height: 100%;
          margin: 0px;
          &::-webkit-scrollbar, & *::-webkit-scrollbar {
            background-color: transparent;
            width: 6px;
            height: 6px;
            border-radius: 2px;
          }
          &::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb {
            border-radius: 20px;
            background-color: #CCCCCC;
            padding: 0px 1px;
            min-height: 110px;
          }     
          scrollbar-color: #ccc transparent;
          scrollbar-width: thin;
        }
      `,
        },
    },
})

export default theme
