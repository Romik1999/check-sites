import colors from "./colors";


declare module '@mui/material/styles' {
    interface Palette {
        white: Palette['primary'];
        grey: Palette['primary'];
        red: Palette['primary'];
        black: Palette['primary']
    }

    interface PaletteOptions {
        white?: PaletteOptions['primary'];
        grey?: PaletteOptions['primary'];
        red?: PaletteOptions['primary'];
        black?: PaletteOptions['primary'];
    }
}

const palette = {
    primary: {
        light: colors.Blue[60],
        main: colors.Blue[80],
        dark: colors.Blue[100],
    },
    secondary: {
        light: colors.Green[60],
        main: colors.Green[80],
        dark: colors.Green[100]
    },
    white:  colors.White.main,
    grey: {
        light: colors.Black[40],
        main: colors.Black[60],
        dark: colors.Black[80],
    },
    red: {
        main: colors.Red
    },
    black:{
        main: colors.Black[100]
    },
    success:{
        main: colors.Green[100]
    }
}

export default palette
