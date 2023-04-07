import React from "react";
import { Button as MUIButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

enum VariantStyles {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface ButtonProps {
  variant: string;
  text: string;
  onPress?: () => void;
  type?: string;
}

export default function Button({ variant, text, onPress, type }: ButtonProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#e29933",
        contrastText: "#fff",
      },
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MUIButton
        variant={variant === VariantStyles.PRIMARY ? "outlined" : "contained"}
        color={"primary"}
        onClick={onPress}
        type={type === "submit" ? "submit" : "reset"}
        style={{ textDecoration: "none" }}
        disableElevation
      >
        {text}
      </MUIButton>
    </ThemeProvider>
  );
}
