import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteProfileDialog from "./dialogs/DeleteProfileDialog";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState } from "react";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import UpgradeProfileDialog from "./dialogs/UpgradeProfileDialog";
import SubscriptionInfoDialog from "./dialogs/SubscriptionInfoDialog";

export default function OpenIconSpeedDial({ doctorData }) {
  const [openDeleteProfile, setOpenDeleteProfile] = useState(false);
  const [openUpgradeProfileDialog, setOpenUpgradeProfileDialog] =
    useState(false);
  const [openSubscriptionInfoDialog, setOpenSubscriptionInfoDialog] =
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
          icon={<InfoOutlinedIcon color="primary" />} // New icon for subscription info
          tooltipTitle="Subscription Info"
          onClick={() => setOpenSubscriptionInfoDialog(true)} // Open the subscription dialog
        />
        <SpeedDialAction
          icon={<UpgradeIcon color="success" />}
          tooltipTitle="Upgrade profile"
          onClick={() => setOpenUpgradeProfileDialog(true)}
        />
        <SpeedDialAction
          icon={<DeleteIcon color="error" />}
          tooltipTitle="Delete profile"
          onClick={() => setOpenDeleteProfile(true)}
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
      <SubscriptionInfoDialog
        open={openSubscriptionInfoDialog}
        onClose={() => setOpenSubscriptionInfoDialog(false)}
        user={doctorData}
      />
    </Box>
  );
}
