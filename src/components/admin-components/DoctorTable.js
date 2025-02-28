import { useState, useEffect, useMemo } from "react";
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
  Avatar,
  TablePagination,
} from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";
import { supabase } from "../../utils/supabase";
import { useSnackbar } from "notistack";
import useBreakpointDown from "@/src/hooks/useBreakpointDown.hook";
import { UserRole } from "@/src/enums/UserRole";
import { Status } from "@/src/enums/PackageTypes";
import { formatDate } from "../../utils/formatDate";
import AdminSpecialitySelect from "./AdminSpecialitySelect";
import EmailIcon from "@mui/icons-material/Email";
import EmailToDoctorDialog from "./EmailToDoctorDialog";
import { useRouter } from "next/router";
import StatusDot from "./StatusDot";

const DoctorTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [doctorToEdit, setDoctorToEdit] = useState(null);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  // const [editedRole, setEditedRole] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [editedStartDate, setEditedStartDate] = useState("");
  const [editedEndDate, setEditedEndDate] = useState("");
  const [editedSpeciality, setEditedSpeciality] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [emailTo, setEmailTo] = useState("");
  const [emailToFullname, setEmailToFullname] = useState("");
  const [openEmailDialog, setOpenEmailDialog] = useState(false);

  const isMobile = useBreakpointDown();
  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const router = useRouter();

  // Handle page change
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter and sort doctors
  const filteredAndSortedDoctors = useMemo(() => {
    return [...doctors].sort((a, b) => {
      const aIsExpired =
        (a.end_date && new Date(a.end_date) < new Date()) ||
        a.status === Status.EXPIRED;
      const bIsExpired =
        (b.end_date && new Date(b.end_date) < new Date()) ||
        b.status === Status.EXPIRED;

      // If both are expired or both are not expired, maintain original order
      if (aIsExpired === bIsExpired) return 0;
      // Put expired doctors first
      return aIsExpired ? -1 : 1;
    });
  }, [doctors]);

  const handleOpenEditDialog = (doctor) => {
    setDoctorToEdit(doctor);
    setEditedFirstName(doctor.first_name || "");
    setEditedLastName(doctor.last_name || "");
    // setEditedRole(doctor.role || "");
    setEditedStatus(doctor.status || "");

    // Format dates as yyyy-mm-dd for the TextField
    setEditedStartDate(
      doctor.start_date
        ? new Date(doctor.start_date).toISOString().split("T")[0]
        : ""
    );
    setEditedEndDate(
      doctor.end_date
        ? new Date(doctor.end_date).toISOString().split("T")[0]
        : ""
    );
    setEditedSpeciality(doctor.speciality || "");

    setOpenEditDialog(true);
  };

  const isFormValid = useMemo(() => {
    const isStartEndDateValid =
      new Date(editedStartDate) <= new Date(editedEndDate);
    const areNamesValid =
      editedFirstName.trim() !== "" && editedLastName.trim() !== "";

    return isStartEndDateValid && areNamesValid;
  }, [editedFirstName, editedLastName, editedStartDate, editedEndDate]);
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setEditedStartDate(newStartDate);

    // Validate if the start date is later than the end date
    if (
      newStartDate &&
      editedEndDate &&
      new Date(newStartDate) > new Date(editedEndDate)
    ) {
      enqueueSnackbar("Start date cannot be later than end date.", {
        variant: "error",
      });
      // Optionally, reset the start date to match end date or handle error
      setEditedStartDate(editedEndDate);
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEditedEndDate(newEndDate);

    // Validate if the end date is earlier than the start date
    if (
      newEndDate &&
      editedStartDate &&
      new Date(newEndDate) < new Date(editedStartDate)
    ) {
      enqueueSnackbar("End date cannot be earlier than start date.", {
        variant: "error",
      });
      // Optionally, reset the end date to match start date or handle error
      setEditedEndDate(editedStartDate);
    }
  };

  const handleOpenEmailDialog = (doctor) => {
    console.log(doctor);
    setEmailTo(doctor.email);
    setEmailToFullname(doctor.full_name);
    setOpenEmailDialog(true);
  };

  const handleEdit = async () => {
    if (!doctorToEdit) return;

    try {
      // Convert dates to yyyy-mm-dd format for database
      const formattedStartDate = formatDate(new Date(editedStartDate));
      const formattedEndDate = formatDate(new Date(editedEndDate));

      const updates = {
        ...(editedFirstName !== doctorToEdit.first_name && {
          first_name: editedFirstName,
        }),
        ...(editedLastName !== doctorToEdit.last_name && {
          last_name: editedLastName,
        }),
        // ...(editedRole !== doctorToEdit.role && { role: editedRole }),
        ...(editedStatus !== doctorToEdit.status && { status: editedStatus }),
        ...(editedSpeciality !== doctorToEdit.editedSpeciality && {
          speciality: editedSpeciality,
        }),

        ...(formattedStartDate !== doctorToEdit.start_date && {
          start_date: formattedStartDate,
        }),
        ...(formattedEndDate !== doctorToEdit.end_date && {
          end_date: formattedEndDate,
        }),
      };

      if (Object.keys(updates).length === 0) {
        enqueueSnackbar("No changes made.", { variant: "info" });
        return;
      }

      const { error } = await supabase
        .from("doctors")
        .update(updates)
        .eq("id", doctorToEdit.id);

      if (error) {
        throw new Error(error.message);
      }

      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor.id === doctorToEdit.id ? { ...doctor, ...updates } : doctor
        )
      );

      enqueueSnackbar("Doctor updated successfully.", { variant: "success" });
      setOpenEditDialog(false);
    } catch (error) {
      enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
    }
  };

  //Delete functions

  const handleOpenDeleteDialog = (doctor) => {
    setDoctorToDelete(doctor);
    setOpenDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!doctorToDelete) return;

    setDeleteLoading(true);

    try {
      const response = await fetch("/api/delete-user/deleteUser", {
        method: "POST", // You may want to use POST depending on your API design
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: doctorToDelete.user_id,
          role: doctorToDelete.role,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setDoctors((prevDoctors) =>
          prevDoctors.filter((doctor) => doctor.id !== doctorToDelete.id)
        ); // Remove the client from the local state
        enqueueSnackbar("Doctor deleted successfully.", {
          variant: "success",
        });
      } else {
        throw new Error(data.error || "Unknown error");
      }
      setDeleteLoading(false);

      setOpenDeleteDialog(false); // Close the confirmation dialog
    } catch (error) {
      setDeleteLoading(false);
      console.log(error);
      enqueueSnackbar(`Error: ${error.message}`, {
        variant: "error",
      });
    }
  };

  //UseEffects
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await supabase.from("doctors").select("*");
      if (error) {
        console.error(error);
      } else {
        setDoctors(data);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <Box sx={{ overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ minWidth: 110 }}>Send email</TableCell>
            <TableCell>Photo</TableCell>
            <TableCell sx={{ minWidth: 110 }}>First Name</TableCell>
            <TableCell sx={{ minWidth: 110 }}>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell sx={{ minWidth: 200 }}>Address</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Speciality</TableCell> {/* New column for Speciality */}
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell sx={{ minWidth: 110 }}>Start Date</TableCell>
            <TableCell sx={{ minWidth: 110 }}>End Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredAndSortedDoctors
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((doctor) => {
              const isEndDatePastCurrent = doctor.end_date
                ? new Date(doctor.end_date) < new Date() ||
                  doctor.status === Status.EXPIRED
                : false;

              return (
                <TableRow
                  key={doctor.id}
                  sx={{
                    ...(isEndDatePastCurrent && {
                      backgroundColor: "rgba(255, 0, 0, 0.1)", // Light red background for expired
                    }),
                  }}
                >
                  <TableCell>
                    <IconButton onClick={() => handleOpenEmailDialog(doctor)}>
                      <EmailIcon color="primary" />
                    </IconButton>
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      router.push(`/dashboard/doctor/${doctor.id}`)
                    }
                    sx={{ cursor: "pointer" }}
                  >
                    {doctor.profile_image ? (
                      <Avatar
                        src={doctor.profile_image}
                        alt="Doctor's Photo"
                        sx={{ width: 40, height: 40 }}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          mx: "auto",
                          mb: 2,
                        }}
                      />
                    )}
                  </TableCell>{" "}
                  {/* First column for Photo */}
                  <TableCell>{doctor.first_name}</TableCell>
                  <TableCell>{doctor.last_name}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.address}</TableCell>
                  <TableCell>{doctor.location}</TableCell>
                  <TableCell>{doctor.speciality}</TableCell>{" "}
                  <TableCell>{doctor.role}</TableCell>
                  <TableCell>
                    <StatusDot
                      status={doctor.status}
                      endDate={doctor.end_date}
                    />
                    {doctor.status}
                  </TableCell>
                  <TableCell>
                    {doctor.start_date &&
                      new Date(doctor.start_date).toISOString().split("T")[0]}
                  </TableCell>{" "}
                  {/* For table display */}
                  <TableCell>
                    {doctor.end_date &&
                      new Date(doctor.end_date).toISOString().split("T")[0]}
                  </TableCell>{" "}
                  {/* For table display */}
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenEditDialog(doctor)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenDeleteDialog(doctor)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullScreen={isMobile}
        fullWidth
      >
        <DialogTitle>Edit Doctor</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} sx={{ p: 3 }}>
            <TextField
              label="First Name"
              value={editedFirstName}
              onChange={(e) => setEditedFirstName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Last Name"
              value={editedLastName}
              onChange={(e) => setEditedLastName(e.target.value)}
              fullWidth
            />
            {/* <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={editedRole}
                onChange={(e) => setEditedRole(e.target.value)}
              >
                {Object.values(UserRole).map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={editedStatus}
                onChange={(e) => setEditedStatus(e.target.value)}
              >
                {Object.values(Status).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <AdminSpecialitySelect
              value={editedSpeciality} // Bind the selected speciality to state
              onChange={(e) => setEditedSpeciality(e.target.value)} // Update the state on change
              disabled={false} // Disable while submitting
            />

            <TextField
              label="Start Date"
              type="date"
              value={editedStartDate}
              onChange={handleStartDateChange} // Use the custom handler
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              value={editedEndDate}
              onChange={handleEndDateChange} // Use the custom handler
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, mb: 2 }}>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleEdit}
            color="secondary"
            disabled={!isFormValid} // Disable the button if the form is invalid
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        fullScreen={isMobile}
        fullWidth
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent sx={{ p: 5 }}>
          Are you sure you want to delete {doctorToDelete?.first_name}{" "}
          {doctorToDelete?.last_name}?
        </DialogContent>
        <DialogActions sx={{ pb: 2, mb: 2 }}>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
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
      <EmailToDoctorDialog
        open={openEmailDialog}
        emailTo={emailTo}
        onClose={() => setOpenEmailDialog(false)}
        emailToFullname={emailToFullname}
      />

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={doctors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ mt: 5, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default DoctorTable;
