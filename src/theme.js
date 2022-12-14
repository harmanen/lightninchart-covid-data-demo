import { createTheme } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      light: yellow[100],
      main: yellow[300],
      dark: yellow[500],
    },
    background: {
      light: grey[500],
      main: grey[700],
      dark: grey[900],
    }
  }
})
