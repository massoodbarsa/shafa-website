"use client";

import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CircularProgress,
  Toolbar,
  FormControl,
  Button,
  Autocomplete,
  TextField,
  InputAdornment,
  Grid2,
  Drawer,
  IconButton,
  Avatar,
  Pagination,
} from "@mui/material";
import { useEffect, useState, useCallback, useMemo } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { supabase } from "../../utils/supabase";
import StarIcon from "@mui/icons-material/Star";

import { NextSeo } from "next-seo";

import NoRecords from "../../components/NoRecords";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import useBreakpointDown from "../../hooks/useBreakpointDown.hook";
import useAuthStore from "../../store/authStore";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { Status } from "@/src/enums/PackageTypes";
import Image from "next/image";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]); // New state for specialties
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { user } = useAuthStore();
  const router = useRouter();
  const itemsPerPage = 6;
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useBreakpointDown();
  countries.registerLocale(enLocale);

  // Fetch specialties from Supabase
  const fetchSpecialities = async () => {
    try {
      const { data, error } = await supabase
        .from("specialities")
        .select("name, farsi_name");
      if (error) throw error;
      setSpecialities(data || []);
    } catch (error) {
      console.error("Error fetching specialties:", error.message);
    }
  };

  const uniqueCountries = useMemo(
    () => [...new Set(doctors.map((d) => d.location))],
    [doctors]
  );

  const uniqueSpecialties = useMemo(() => {
    const specialtiesFromDoctors = [
      ...new Set(doctors.map((d) => d.speciality)),
    ];
    return specialtiesFromDoctors
      .filter((specialty) => specialty) // Filter out null or undefined
      .map((specialty) => {
        const specialtyData =
          specialities.find((s) => s.name === specialty) || {};
        return {
          label: specialty,
          farsiLabel: specialtyData.farsi_name || "",
        };
      });
  }, [doctors, specialities]);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      (!selectedCountry || doctor.location === selectedCountry) &&
      (!selectedSpecialty || doctor.speciality === selectedSpecialty) &&
      (!selectedRating || doctor.averageRating >= selectedRating) &&
      doctor.status !== Status.CANCELLED &&
      doctor.status !== Status.EXPIRED &&
      doctor.status !== Status.PENDING
  );

  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getUserCountry = useCallback(async () => {
    try {
      const response = await fetch(
        "https://ipinfo.io/json?token=3c9c12f932e280"
      );
      const data = await response.json();
      return data.country;
    } catch (error) {
      console.error("Error fetching IP info:", error);
      return null;
    }
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRouteToProfile = (doctorId) => {
    if (!user) {
      enqueueSnackbar("Register to see doctor page.", {
        variant: "warning",
      });
      return;
    }
    router.push(`/dashboard/doctor/${doctorId}`);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await supabase
        .from("doctors")
        .select("*, reviews (rating)");

      if (error) {
        console.error("Error fetching doctors:", error);
      } else {
        const doctorsWithRatings = data.map((doctor) => {
          const ratings = doctor.reviews?.map((r) => r.rating) || [];
          const average =
            ratings.length > 0
              ? ratings.reduce((a, b) => a + b, 0) / ratings.length
              : 0;
          return { ...doctor, averageRating: average };
        });
        setDoctors(doctorsWithRatings);
      }
      setLoading(false);
    };

    fetchDoctors();
    fetchSpecialities(); // Fetch specialties
  }, []);

  useEffect(() => {
    async function fetchData() {
      const userCountryCode = await getUserCountry();
      if (userCountryCode) {
        const countryName = countries.getName(userCountryCode, "en");
        if (countryName && doctors.some((d) => d.location === countryName)) {
          setSelectedCountry(countryName);
        }
      }
    }
    fetchData();
  }, [getUserCountry, doctors]);

  const filterContent = (
    <Grid2 container gap={5} justifyContent="space-around" alignItems="center">
      <Grid2 item sm={4} xs={12}>
        <FormControl sx={{ width: 200 }}>
          <Autocomplete
            options={uniqueCountries
              .filter((location) => location)
              .map((location) => {
                const doctorWithFlag = doctors.find(
                  (d) => d.location === location
                );
                return {
                  label: location,
                  flag: doctorWithFlag?.location_flag || "",
                };
              })}
            value={
              selectedCountry
                ? {
                    label: selectedCountry,
                    flag:
                      doctors.find((d) => d.location === selectedCountry)
                        ?.location_flag || "",
                  }
                : null
            }
            onChange={(event, newValue) =>
              setSelectedCountry(newValue ? newValue.label : "")
            }
            getOptionLabel={(option) => option.label || ""}
            renderOption={(props, option) => (
              <li {...props}>
                {option.flag && (
                  <img
                    src={option.flag}
                    alt={option.label}
                    style={{ width: 20, height: 14, marginRight: 8 }}
                  />
                )}
                {option.label}
              </li>
            )}
            slotProps={{
              input: {
                startAdornment: selectedCountry && (
                  <InputAdornment position="start">
                    <img
                      src={
                        doctors.find((d) => d.location === selectedCountry)
                          ?.location_flag || ""
                      }
                      alt={selectedCountry}
                      style={{ width: 20, height: 14, marginRight: 8 }}
                    />
                  </InputAdornment>
                ),
              },
            }}
            renderInput={(params) => (
              <TextField {...params} label="Country" variant="outlined" />
            )}
          />
        </FormControl>
      </Grid2>
      <Grid2 item sm={4} xs={12}>
        <FormControl sx={{ width: 250 }}>
          <Autocomplete
            options={uniqueSpecialties}
            value={
              uniqueSpecialties.find(
                (spec) => spec.label === selectedSpecialty
              ) || null
            }
            onChange={(event, newValue) =>
              setSelectedSpecialty(newValue ? newValue.label : "")
            }
            getOptionLabel={(option) => option.label || ""}
            renderOption={(props, option) => (
              <li
                {...props}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>{option.label}</Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {option.farsiLabel}
                </Typography>
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Specialty" variant="outlined" />
            )}
          />
        </FormControl>
      </Grid2>
      <Grid2 item sm={4} xs={12}>
        <Box sx={{ gap: 1, display: "flex", alignItems: "center" }}>
          <Typography variant="body2">Rating: </Typography>
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon
              key={index}
              sx={{
                cursor: "pointer",
                color: index < Math.round(selectedRating) ? "gold" : "gray",
              }}
              onClick={() => setSelectedRating(index + 1)}
            />
          ))}
          <Button
            onClick={() => setSelectedRating(null)}
            sx={{ ml: 2 }}
            variant="outlined"
            size="small"
          >
            Reset
          </Button>
        </Box>
      </Grid2>
    </Grid2>
  );

  return (
    <>
      <NextSeo
        title="Find Farsi-Speaking Doctors"
        description="Discover a directory of Farsi-speaking doctors worldwide. Browse by specialty, country, and rating."
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/list`, // Adjust the URL as per your base URL
          title: "Find Farsi-Speaking Doctors",
          description:
            "Browse through a list of Farsi-speaking doctors outside Iran. Filter by specialty, location, and rating.",
          images: [
            {
              url: "/main.webp", // Adjust the image as per your content
              width: 800,
              height: 600,
              alt: "Doctor Directory Image",
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "farsi-speaking doctors, doctor directory, healthcare, medical professionals, find doctors, persian doctors,iranian doctors,persian speaking doctors,iranian outside,iranian abroad",
          },
          {
            name: "robots",
            content: "index, follow",
          },
        ]}
      />

      <Container
        sx={{ display: "flex", flexDirection: "column" }}
        maxWidth="xl"
      >
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
          {isMobile ? (
            <IconButton
              onClick={() => setMobileFiltersOpen(true)}
              aria-label="open-filters"
              color="primary"
              size="large"
            >
              <FilterListIcon />
            </IconButton>
          ) : (
            filterContent
          )}
        </Toolbar>

        {isMobile && (
          <Drawer
            anchor="bottom"
            open={mobileFiltersOpen}
            onClose={() => setMobileFiltersOpen(false)}
          >
            <Box sx={{ p: 2 }}>
              {filterContent}
              <Button
                onClick={() => setMobileFiltersOpen(false)}
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Apply Filters
              </Button>
            </Box>
          </Drawer>
        )}

        <Grid2 container spacing={5} justifyContent="center">
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
          ) : paginatedDoctors.length > 0 ? (
            paginatedDoctors.map((doctor) => {
              const farsiSpeciality =
                specialities.find((spec) => spec.name === doctor.speciality)
                  ?.farsi_name || "";
              return (
                <Grid2 item xs={12} sm={6} md={4} key={doctor.id}>
                  <Card
                    sx={{
                      width: 250,
                      height: 400,
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRouteToProfile(doctor.id)}
                  >
                    <Box p={1}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <StarIcon
                          key={index}
                          sx={{
                            color:
                              index < Math.round(doctor.averageRating)
                                ? "gold"
                                : "gray",
                          }}
                        />
                      ))}
                    </Box>
                    {doctor.profile_image ? (
                      <CardMedia
                        sx={{
                          position: "relative",
                          height: 200, // Set the desired height
                          width: "100%", // Ensure it takes the full width of the card
                        }}
                      >
                        <Image
                          loading="lazy"
                          src={doctor.profile_image}
                          alt={`${doctor.first_name} ${doctor.last_name}`}
                          fill // This ensures the image takes the full size of its container
                          style={{
                            objectFit: "contain",
                            objectPosition: "center",
                          }}
                        />
                      </CardMedia>
                    ) : (
                      <Avatar
                        sx={{ width: 170, height: 200, mx: "auto", mb: 2 }}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="body1">
                        {doctor.first_name} {doctor.last_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {doctor.speciality || "Specialty not available"}
                      </Typography>
                      {farsiSpeciality && (
                        <Typography variant="body2" color="text.secondary">
                          ({farsiSpeciality})
                        </Typography>
                      )}
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
                        <Typography variant="body2">
                          {doctor.location}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid2>
              );
            })
          ) : (
            <Box width="100%">
              <NoRecords />
            </Box>
          )}
        </Grid2>
        {Math.ceil(filteredDoctors.length / itemsPerPage) > 1 && (
          <Pagination
            count={Math.ceil(filteredDoctors.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{ mt: 5, display: "flex", justifyContent: "center" }}
          />
        )}
      </Container>
    </>
  );
}
