"use client";

import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CircularProgress,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await supabase.from("doctors").select("*");

      if (error) {
        console.error("Error fetching doctors:", error);
      } else {
        setDoctors(data);
      }
      setLoading(false);
    };

    fetchDoctors();
  }, []);

  // Get unique countries and specialties from doctors
  const uniqueCountries = [
    ...new Set(doctors.map((d) => d.location && d.location_flag && d.location)),
  ];
  const uniqueSpecialties = [...new Set(doctors.map((d) => d.speciality))];

  // Filter doctors based on selection
  const filteredDoctors = doctors.filter(
    (doctor) =>
      (!selectedCountry || doctor.location === selectedCountry) &&
      (!selectedSpecialty || doctor.speciality === selectedSpecialty)
  );

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }} maxWidth="xl">
      {/* Filter Toolbar */}
      <Toolbar
        sx={{ display: "flex", gap: 2, mb: 6, bgcolor: "ButtonFace", p: 3 }}
      >
        {/* Country Filter */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel shrink={true}>Country</InputLabel>
          <Select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Countries</MenuItem>
            {uniqueCountries.map((location) => {
              const doctorWithFlag = doctors.find(
                (d) => d.location === location
              );
              return (
                <MenuItem key={location} value={location}>
                  {doctorWithFlag?.location_flag && (
                    <img
                      src={doctorWithFlag.location_flag}
                      alt={location}
                      width="20"
                      height="14"
                      style={{ marginRight: 8 }}
                    />
                  )}
                  {location}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {/* Specialty Filter */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel shrink={true}>Specialty</InputLabel>
          <Select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Specialties</MenuItem>
            {uniqueSpecialties.map((specialty) => (
              <MenuItem key={specialty} value={specialty}>
                {specialty}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Toolbar>

      {/* Doctors Grid */}
      <Grid container spacing={3}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    doctor.profile_image || "https://via.placeholder.com/200"
                  }
                  alt={`${doctor.first_name} ${doctor.last_name}`}
                />
                <CardContent>
                  <Typography variant="h6">
                    {doctor.first_name} {doctor.last_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.speciality || "Specialty not available"}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={2}>
                    {doctor.location_flag && (
                      <img
                        src={doctor.location_flag}
                        alt={doctor.location}
                        width="20"
                        height="14"
                        style={{ marginRight: 8 }}
                      />
                    )}
                    <Typography variant="body2">{doctor.location}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No doctors found.</Typography>
        )}
      </Grid>
    </Container>
  );
}
