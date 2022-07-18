import './textfield.scss';
import { TextField } from '@mui/material';

interface TextfieldProps {
    label: string;
    placeholder: string;
    onChangeInput: (_: string) => void;
    type?: string;
}

export default function CustomTextfield({
    label,
    placeholder,
    onChangeInput,
    type,
}: TextfieldProps): JSX.Element {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChangeInput(value);
    };

    return (
        <span className='textfield'>
            <label className='textfield__label'>{label}</label>
            <TextField
                className='textfield_input'
                variant='outlined'
                placeholder={placeholder}
                onChange={handleChange}
                type={type || 'text'}
            ></TextField>
        </span>
    );
}
