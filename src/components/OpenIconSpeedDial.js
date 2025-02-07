import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteProfileButton from "./DeleteProfileDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteProfileDialog from "./DeleteProfileDialog";
import react, { useState } from "react";

export default function OpenIconSpeedDial({ doctorData }) {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: "absolute", top: -40, right: -10 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        direction="down"
      >
        <SpeedDialAction
          icon={<DeleteIcon color="error" />}
          tooltipTitle="Delete profile"
          onClick={() => setOpen(true)}
        />
        <SpeedDialAction
          icon={<DeleteIcon />}
          tooltipTitle="Delete profile"
          onClick={() => setOpen(true)}
        />
      </SpeedDial>

      <DeleteProfileDialog
        user={doctorData}
        open={open}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
}
