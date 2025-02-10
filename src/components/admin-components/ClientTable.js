import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";
import { supabase } from "../../utils/supabase"; // Import your Supabase client
import { useSnackbar } from "notistack";
import useBreakpointDown from "@/src/hooks/useBreakpointDown.hook";
import { UserRole } from "@/enums/UserRole";
import { Status } from "@/enums/PackageTypes";

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const [clientToEdit, setClientToEdit] = useState(null);
  const [editedName, setEditedName] = useState("");

  const [editedStatus, setEditedStatus] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const isMobile = useBreakpointDown();

  const { enqueueSnackbar } = useSnackbar(); // Initialize notistack

  const statusOptions = Object.values(Status).filter(
    (value) => value !== Status.ACTIVE && value !== Status.EXPIRED
  );

  // Open delete confirmation dialog
  const handleOPenDelteDialog = (client) => {
    console.log(client);
    setClientToDelete(client);
    setOpenDialog(true);
  };

  const handleStatusChange = (event) => {
    setEditedStatus(event.target.value);
  };

  const handleOpenEditDialog = (client) => {
    setClientToEdit(client);
    setEditedName(client.full_name);

    setEditedStatus(client.status);
    setOpenEditDialog(true);
  };

  const handleDelete = async () => {
    if (!clientToDelete) return;

    setDeleteLoading(true);

    try {
      const response = await fetch("/api/delete-user/deleteUser", {
        method: "POST", // You may want to use POST depending on your API design
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: clientToDelete.user_id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setClients((prevClients) =>
          prevClients.filter((client) => client.id !== clientToDelete.id)
        ); // Remove the client from the local state
        enqueueSnackbar("Client deleted successfully.", {
          variant: "success",
        });
      } else {
        throw new Error(data.error || "Unknown error");
      }
      setDeleteLoading(false);

      setOpenDialog(false); // Close the confirmation dialog
    } catch (error) {
      setDeleteLoading(false);
      enqueueSnackbar(`Error: ${error.message}`, {
        variant: "error",
      });
    }
  };

  const handleEdit = async () => {
    if (!clientToEdit) return;

    try {
      const { error, data } = await supabase
        .from("clients")
        .update({
          full_name: editedName,
          status: editedStatus,
        })
        .eq("id", clientToEdit.id);

      if (error) {
        throw new Error(error.message);
      }

      console.log(data);

      // Update the client in the local state
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === clientToEdit.id
            ? {
                ...client,
                full_name: editedName,
                status: editedStatus,
              }
            : client
        )
      );

      enqueueSnackbar("Client updated successfully.", { variant: "success" });
      setOpenEditDialog(false); // Close the edit dialog
    } catch (error) {
      enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase.from("clients").select("*");
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        // Filter out clients with the role 'admin'
        const nonAdminClients = data.filter(
          (client) => client.role !== UserRole.Admin
        );
        setClients(nonAdminClients);
      }
    };
    fetchClients();
  }, []);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.full_name}</TableCell>
              <TableCell>{client.status}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleOpenEditDialog(client)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleOPenDelteDialog(client)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullScreen={isMobile}
        fullWidth
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent sx={{ p: 5 }}>
          Are you sure you want to delete {clientToDelete?.full_name}?
        </DialogContent>
        <DialogActions sx={{ pb: 2, mb: 2 }}>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="secondary"
            loading={deleteLoading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit Client Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullScreen={isMobile}
        fullWidth
      >
        <DialogTitle sx={{ p: 3 }} color="primary">
          Edit Client
        </DialogTitle>
        <DialogContent sx={{ p: 5 }}>
          <Box mt={3} display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              fullWidth
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                value={editedStatus}
                onChange={handleStatusChange}
                label="Status"
              >
                {statusOptions.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ pb: 2, mb: 2 }}>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="secondary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClientTable;
