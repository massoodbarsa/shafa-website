"use client";

import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const SpecialitySelect = ({ control, errors, disabled }) => {
  const supabase = createClientComponentClient();
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpecialities = async () => {
      setLoading(true);
      setError("");
      try {
        const { data, error } = await supabase
          .from("specialities")
          .select("id, name");
        if (error) throw error;
        setSpecialities(data);
      } catch (error) {
        setError("Failed to load specialities.");
        console.error("Error fetching specialities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialities();
  }, []);

  return (
    <FormControl fullWidth margin="normal" error={!!errors.speciality}>
      <InputLabel>Medical Speciality</InputLabel>
      <Controller
        name="speciality"
        control={control}
        render={({ field }) => (
          <Select {...field} disabled={loading || disabled}>
            {specialities.map((spec) => (
              <MenuItem key={spec.id} value={spec.name}>
                {spec.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors.speciality && (
        <Typography color="error">{errors.speciality.message}</Typography>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </FormControl>
  );
};

export default SpecialitySelect;
