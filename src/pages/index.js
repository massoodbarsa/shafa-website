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
  Button,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../utils/supabase";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";
import NoRecords from "../components/NoRecords";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  countries.registerLocale(enLocale);

  // Get unique countries and specialties from doctors
  const uniqueCountries = [
    ...new Set(doctors.map((d) => d.location && d.location_flag && d.location)),
  ];
  const uniqueSpecialties = [...new Set(doctors.map((d) => d.speciality))];

  // console.log(userLocation);

  // Filter doctors based on selection
  const filteredDoctors = doctors.filter(
    (doctor) =>
      (!selectedCountry || doctor.location === selectedCountry) &&
      (!selectedSpecialty || doctor.speciality === selectedSpecialty) &&
      (!selectedRating || doctor.avg_rating >= selectedRating)
  );

  const getUserCountry = useCallback(async () => {
    try {
      const response = await fetch(
        "https://ipinfo.io/json?token=3c9c12f932e280"
      );
      const data = await response.json();
      return data.country; // Returns country code (e.g., "US", "IN")
    } catch (error) {
      console.error("Error fetching IP info:", error);
      return null;
    }
  }, []);

  //UseEffects

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

  useEffect(() => {
    async function fetchData() {
      const userCountryCode = await getUserCountry(); // Get country code (e.g., "US", "IN")
      if (userCountryCode) {
        // Convert country code to full country name
        const countryName = countries.getName(userCountryCode, "en");

        // Check if the country exists in doctors' locations
        if (countryName && doctors.some((d) => d.location === countryName)) {
          setSelectedCountry(countryName); // Auto-select country if found
        }
      }
    }
    fetchData();
  }, [getUserCountry, doctors]); // Runs when doctors data is available

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }} maxWidth="xl">
      {/* Filter Toolbar */}
      <Toolbar
        sx={{
          display: "flex",
          gap: 3,
          mb: 6,
          bgcolor: "ButtonFace",
          p: 3,
          justifyContent: "space-around",
        }}
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

        <Box
          sx={{
            display: "flex",
            gap: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="body2">Rating: </Typography>
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon
              key={index}
              sx={{
                cursor: "pointer",
                color: index < Math.round(selectedRating) ? "gold" : "gray",
              }}
              onClick={() => setSelectedRating(index + 1)} // Set the selected rating to the star clicked
            />
          ))}
          <Button
            onClick={() => setSelectedRating(null)} // Reset the filter
            sx={{ ml: 2 }}
            variant="outlined"
            size="small"
          >
            Reset
          </Button>
        </Box>
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
              <Link href={`/dashboard/doctor/${doctor.id}`} passHref>
                <Card>
                  <Box p={1}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon
                        key={index}
                        sx={{
                          cursor: "pointer",
                          color:
                            index < Math.round(doctor.avg_rating)
                              ? "gold"
                              : "gray",
                        }}
                      />
                    ))}
                  </Box>
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      doctor.profile_image || "https://via.placeholder.com/200"
                    }
                    alt={`${doctor.first_name} ${doctor.last_name}`}
                    sx={{ objectFit: "cover", objectPosition: "top" }}
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
              </Link>
            </Grid>
          ))
        ) : (
          <Box width="100%">
            <NoRecords />
          </Box>
        )}
      </Grid>
    </Container>
  );
}
