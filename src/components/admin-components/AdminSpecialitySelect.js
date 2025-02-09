import { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { supabase } from "../../utils/supabase"; // Import your Supabase client

const AdminSpecialitySelect = ({ value, onChange, disabled }) => {
  console.log(value);
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch specialities from Supabase
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
    <FormControl fullWidth margin="normal" disabled={disabled} error={!!error}>
      <InputLabel>Medical Speciality</InputLabel>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <Select
          value={value || ""}
          onChange={onChange}
          label="Medical Speciality"
        >
          {specialities.map((speciality) => (
            <MenuItem key={speciality.id} value={speciality.name}>
              {speciality.name}
            </MenuItem>
          ))}
        </Select>
      )}
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default AdminSpecialitySelect;
