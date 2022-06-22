import './dropdown.scss';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

interface DropdownProps {
    label: string;
    placeholder: string;
    options: {
        key: string;
        value: string;
    }[];
    changeOption: (_: string) => void;
}

export default function Dropdown({
    label,
    placeholder,
    options,
    changeOption,
}: DropdownProps): JSX.Element {
    const [value, setValue] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
        const value: string = event.target.value;

        changeOption(value);
    };

    return (
        <span className='menu'>
            <label className='menu__label'>{label}</label>
            <Select
                className='menu__select'
                variant='outlined'
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            >
                <MenuItem key='-1' value=''>
                    <em>-</em>
                </MenuItem>
                {options.map((item) => (
                    <MenuItem key={item.key} value={item.key}>
                        {item.value}
                    </MenuItem>
                ))}
            </Select>
        </span>
    );
}
