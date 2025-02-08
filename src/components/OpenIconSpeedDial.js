import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteProfileDialog from "./dialogs/DeleteProfileDialog";
import { useState } from "react";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import UpgradeProfileDialog from "./dialogs/UpgradeProfileDialog";

export default function OpenIconSpeedDial({ doctorData }) {
  const [openDeleteProfile, setOpenDeleteProfile] = useState(false);
  const [openUpgradeProfileDialog, setOpenUpgradeProfileDialog] =
    useState(false);
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
          onClick={() => setOpenDeleteProfile(true)}
        />
        <SpeedDialAction
          icon={<UpgradeIcon color="success" />}
          tooltipTitle="Upgrade profile"
          onClick={() => setOpenUpgradeProfileDialog(true)}
        />
      </SpeedDial>

      <DeleteProfileDialog
        user={doctorData}
        open={openDeleteProfile}
        onClose={() => setOpenDeleteProfile(false)}
      />
      <UpgradeProfileDialog
        open={openUpgradeProfileDialog}
        onClose={() => setOpenUpgradeProfileDialog(false)}
        user={doctorData}
      />
    </Box>
  );
}
