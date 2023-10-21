"use client";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function LanguageSelector() {
  const [age, setAge] = React.useState("es");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <FormControl
      data-testid="language-selector"
      sx={{ m: 1, minWidth: 120 }}
      size="small"
    >
      <InputLabel id="select-language-label">Idioma</InputLabel>
      <Select
        labelId="select-language-label"
        value={age}
        label="Idioma"
        onChange={handleChange}
      >
        <MenuItem value="es">Español</MenuItem>
        <MenuItem value="en">Inglés</MenuItem>
      </Select>
    </FormControl>
  );
}
