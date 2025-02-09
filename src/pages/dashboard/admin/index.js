import { useState } from "react";
import { Container, Tabs, Tab } from "@mui/material";
import ClientTable from "../../../components/admin-components/ClientTable"; // Import the ClientTable component
import DoctorTable from "@/src/components/admin-components/DoctorTable";

const AdminDashboard = () => {
  const [tab, setTab] = useState(0);

  return (
    <Container>
      <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)}>
        <Tab label="Doctors" />
        <Tab label="Clients" />
      </Tabs>

      {tab === 0 && <DoctorTable />}

      {tab === 1 && <ClientTable />}
    </Container>
  );
};

export default AdminDashboard;
