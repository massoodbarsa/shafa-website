import { Box, Tooltip } from "@mui/material";
import { Status } from "@/src/enums/PackageTypes";

const StatusDot = ({ status, endDate }) => {
  const currentDate = new Date();
  const isExpired =
    (endDate && new Date(endDate) > currentDate) || status === Status.EXPIRED;

  const getDotColor = () => {
    if (isExpired) return "red";
    switch (status) {
      case Status.PENDING:
        return "yellow";
      case Status.EXPIRED:
        return "red";
      case Status.CANCELLED:
        return "black";
      case Status.ACTIVE:
        return "green";
      case Status.FREE:
        return "cyan";
      default:
        return "grey";
    }
  };

  const getTooltipText = () => {
    if (isExpired) return "Expired - Contact doctor to renew";
    return status || "Unknown status";
  };

  return (
    <Tooltip title={getTooltipText()}>
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: getDotColor(),
          display: "inline-block",
          marginRight: 1,
        }}
      />
    </Tooltip>
  );
};

export default StatusDot;
