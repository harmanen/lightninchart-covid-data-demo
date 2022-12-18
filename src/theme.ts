import { createTheme } from "@mui/material";

import {
  Palette as MuiPalette,
  PaletteOptions as MuiPaletteOptions,
} from '@mui/material/styles/createPalette';

// Not sure if this is the best way but seems to work although there is a 
// warning about "recursively references itself as a base type"
declare module '@mui/material/styles/createPalette' {
  interface Palette extends MuiPalette {
    wallpaper: {light: string, main: string, dark: string};
  }

  interface PaletteOptions extends MuiPaletteOptions {
    wallpaper?: {light: string, main: string, dark: string};
  }
}

export const theme = createTheme({
  palette: {
    // An educated guess for "yellow"
    primary: {
      light: "#ffff8f",
      main: "#fefe5b",
      dark: "#c8cb21",
    },
    // An educated guess for "dark"
    wallpaper: {
      light: "#595959",
      main: "#313233",
      dark: "#070707",
    }
  }
})
