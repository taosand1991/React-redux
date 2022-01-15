import { extendTheme } from "@chakra-ui/react";

const breakPoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const theme = extendTheme({
  shadows: {
    purple: "0 0 0 3px rgba(159, 122, 234, 0.6)",
    red: "1px 1px 3px rgba(0, 235, 254, 0.5)",
  },
  breakPoints,
});
export default theme;
