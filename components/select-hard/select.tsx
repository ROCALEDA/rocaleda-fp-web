"use client"
import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    text?: string;
    options?: Option[];
    selectedOptions: string[]; // nuevas propiedades
    onSelectionChange: (selected: string[]) => void; // callback
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.indexOf(name) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
  };
}

export default function BasicSelect({ text, options = [], selectedOptions, onSelectionChange }: SelectProps) {
    const theme = useTheme();
    const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
    const idFriendlyText = text?.toLowerCase().replace(/ /g, '-');
    const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
        const selectedOptionValues = event.target.value as string[];
        const selectedLabels = selectedOptionValues.map(value => 
            options.find(option => option.value === value)?.label || ''
        );
        
        setSelectedValues(selectedLabels);

        onSelectionChange(selectedLabels);
    };
    
    return (
        <div>
            <FormControl sx={{ m: 1, width: 400 }}>
                <InputLabel id={`${idFriendlyText}-label`}>{text}</InputLabel>
                <Select
                    data-testid={`select-${idFriendlyText}`}
                    labelId={`${idFriendlyText}-label`}
                    id={`${idFriendlyText}-select`}
                    multiple
                    value={selectedValues.map(label => 
                        options.find(option => option.label === label)?.value || ''
                    )}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label={text} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value: string) => {
                                const label = options.find(option => option.value === value)?.label;
                                return <Chip key={value} label={label} sx={{ backgroundColor: '#FAE8FF' }}  />;
                            })}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                {options.map((option) => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                        style={getStyles(option.label, selectedValues, theme)}
                    >
                        {option.label}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </div>
    );
}