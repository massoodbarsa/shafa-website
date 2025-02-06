import { Box, Typography } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const NoRecords = ({ message = "No records found" }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="50vh"
      textAlign="center"
    >
      <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: "Highlight" }} />
      <Typography variant="h6" color="textSecondary" mt={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default NoRecords;
