import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";
import { supabase } from "../../utils/supabase"; // Import your Supabase client
import { useSnackbar } from "notistack";
import useBreakpointDown from "@/src/hooks/useBreakpointDown.hook";

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const isMobile = useBreakpointDown();

  const { enqueueSnackbar } = useSnackbar(); // Initialize notistack

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase.from("clients").select("*");
      if (error) {
        console.error(error);
      } else {
        setClients(data);
      }
    };

    fetchClients();
  }, []);

  // Open delete confirmation dialog
  const handleOPenDelteDialog = (client) => {
    console.log(client);
    setClientToDelete(client);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (!clientToDelete) return;

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

      console.log(clientToDelete.user_id);

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

      setOpenDialog(false); // Close the confirmation dialog
    } catch (error) {
      enqueueSnackbar(`Error: ${error.message}`, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.full_name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>
                <IconButton onClick={handleDelete}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleOPenDelteDialog(client)}>
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
        <DialogActions sx={{ pb: 2 }}>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClientTable;
