import * as React from "react";
import { TextField, MenuItem, Button, Paper } from "@mui/material";

export default function PatientForm({ initial = {}, onSubmit, submitting }) {
  const [form, setForm] = React.useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    ...initial,
  });

  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    setForm((f) => ({ ...f, ...initial }));
    setErrors({}); // Clear errors when initial data changes
  }, [initial]);

  const validatePhone = (phone) => {
    if (!phone) return true; // Phone is optional
    // Basic phone validation: 10-15 digits, may include spaces, dashes, parentheses
    const phoneRegex = /^[\d\s\-\(\)\+]{10,15}$/;
    return phoneRegex.test(phone);
  };

  const validateAge = (age) => {
    const numAge = parseInt(age);
    return numAge >= 0 && numAge <= 150;
  };

  const change = (e) => {
    const { name, value } = e.target;
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    // Special handling for age - only allow numbers
    if (name === "age") {
      if (value && !/^\d+$/.test(value)) {
        return; // Don't update if not a number
      }
    }

    // Special handling for phone - format as user types
    if (name === "phone") {
      // Remove non-digit characters for validation
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length <= 15) {
        setForm({ ...form, [name]: value });
      }
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    // Required fields
    if (!form.name.trim()) {
      newErrors.name = "Patient name is required";
    }

    if (!form.age) {
      newErrors.age = "Age is required";
    } else if (!validateAge(form.age)) {
      newErrors.age = "Age must be between 0 and 150";
    }

    if (!form.gender) {
      newErrors.gender = "Gender is required";
    }

    // Optional but validated fields
    if (form.phone && !validatePhone(form.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Trim string fields before submitting
      const cleanedForm = {
        ...form,
        name: form.name.trim(),
        address: form.address.trim(),
        phone: form.phone.trim(),
      };
      onSubmit(cleanedForm);
    }
  };

  return (
    <Paper className="p-6 space-y-4">
      <div onSubmit={submit} className="space-y-4">
        <TextField
          label="Patient Name"
          name="name"
          value={form.name}
          onChange={change}
          fullWidth
          required
          disabled={submitting}
          error={!!errors.name}
          helperText={errors.name}
          placeholder="Enter patient's full name"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextField
            label="Age"
            name="age"
            type="number"
            value={form.age}
            onChange={change}
            required
            disabled={submitting}
            error={!!errors.age}
            helperText={errors.age}
            inputProps={{ 
              min: 0, 
              max: 150,
              step: 1
            }}
            placeholder="0"
          />
          
          <TextField
            select
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={change}
            required
            disabled={submitting}
            error={!!errors.gender}
            helperText={errors.gender}
          >
            <MenuItem value="">
              <em>Select gender</em>
            </MenuItem>
            {["Male", "Female", "Other"].map((g) => (
              <MenuItem key={g} value={g}>{g}</MenuItem>
            ))}
          </TextField>
          
          <TextField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={change}
            disabled={submitting}
            error={!!errors.phone}
            helperText={errors.phone || "Optional"}
            placeholder="1234567890"
            inputProps={{ maxLength: 15 }}
          />
        </div>
        
        <TextField
          label="Address"
          name="address"
          value={form.address}
          onChange={change}
          multiline
          minRows={2}
          maxRows={4}
          fullWidth
          disabled={submitting}
          placeholder="Enter patient's address (optional)"
        />
        
        <div className="flex gap-3">
          <Button 
            type="submit" 
            variant="contained" 
            disabled={submitting}
            onClick={submit}
            size="large"
          >
            {submitting ? "Saving..." : initial.id ? "Update Patient" : "Add Patient"}
          </Button>
          
          {!initial.id && (
            <Button 
              type="button" 
              variant="outlined" 
              disabled={submitting}
              onClick={() => {
                setForm({
                  name: "",
                  age: "",
                  gender: "",
                  phone: "",
                  address: "",
                });
                setErrors({});
              }}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </Paper>
  );
}