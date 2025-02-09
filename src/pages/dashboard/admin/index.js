import { useState } from "react";
import { Container, Tabs, Tab, Drawer, Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import ClientTable from "../../../components/admin-components/ClientTable"; // Import the ClientTable component

const AdminDashboard = () => {
  const [tab, setTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const doctors = [
    { id: 1, name: "Dr. John Doe", status: "Active" },
    { id: 2, name: "Dr. Jane Smith", status: "Pending" },
  ];

  return (
    <Container>
      <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)}>
        <Tab label="Doctors" />
        <Tab label="Clients" />
      </Tabs>

      {tab === 0 && (
        <></>
        // <Table>
        //   <TableHead>
        //     <TableRow>
        //       <TableCell>Name</TableCell>
        //       <TableCell>Status</TableCell>
        //       <TableCell>Actions</TableCell>
        //     </TableRow>
        //   </TableHead>
        //   <TableBody>
        //     {doctors.map((doctor) => (
        //       <TableRow key={doctor.id}>
        //         <TableCell>{doctor.name}</TableCell>
        //         <TableCell>{doctor.status}</TableCell>
        //         <TableCell>
        //           <IconButton onClick={() => handleEdit(doctor)}>
        //             <Edit />
        //           </IconButton>
        //           <IconButton onClick={() => handleDelete(doctor.id)}>
        //             <Delete />
        //           </IconButton>
        //         </TableCell>
        //       </TableRow>
        //     ))}
        //   </TableBody>
        // </Table>
      )}

      {tab === 1 && <ClientTable />}

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
