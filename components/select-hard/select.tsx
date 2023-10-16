"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Option {
    value: string | number;
    label: string;
}

interface SelectProps {
    text?: string;
    options?: Option[];
}

export default function BasicSelect( { text, options = [] }: SelectProps) {
    const [selectedValue, setSelectedValue] = React.useState<string | number>('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedValue(event.target.value as string | number);
    };

    return (
    <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">{ text }</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValue}
        label={ text}
        onChange={handleChange}
        >
        {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
            {option.label}
            </MenuItem>
        ))}
        </Select>
    </FormControl>
    </Box>
);
}