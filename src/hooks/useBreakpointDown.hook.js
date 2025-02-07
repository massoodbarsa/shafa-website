import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/system/useTheme";

export default function useBreakpointDown(key = "md", defaultMatches = true) {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(key), { defaultMatches });
}
