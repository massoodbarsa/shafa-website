import { useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Drawer,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const AdminDashboard = () => {
  const [tab, setTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const doctors = [
    { id: 1, name: "Dr. John Doe", status: "Active" },
    { id: 2, name: "Dr. Jane Smith", status: "Pending" },
  ];

  const clients = [
    { id: 1, name: "Alice Johnson", status: "Active" },
    { id: 2, name: "Bob Brown", status: "Expired" },
  ];

  const handleEdit = (user) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleDelete = (id) => {
    console.log("Delete user with ID:", id);
  };

  return (
    <Container>
      <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)}>
        <Tab label="Doctors" />
        <Tab label="Clients" />
      </Tabs>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(tab === 0 ? doctors : clients).map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(user)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(user.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Container>
          <h3>Edit User</h3>
          <p>Name: {selectedUser?.name}</p>
          <Button variant="contained" onClick={() => setDrawerOpen(false)}>
            Save Changes
          </Button>
        </Container>
      </Drawer>
    </Container>
  );
};

export default AdminDashboard;
