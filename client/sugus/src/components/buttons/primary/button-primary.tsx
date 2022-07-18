import './button-primary.scss';
import Icon from '@mui/material/Icon';

interface ButtonPrimaryProps {
    click: () => void;
    icon?: string;
    iconFirst?: boolean;
    label?: string;
    disable?: boolean;
}

export default function ButtonPrimary(props: ButtonPrimaryProps): JSX.Element {
    const disable: boolean = props.disable != null ? props.disable : false;

    return (
        <button
            className='primary-button'
            disabled={disable}
            tabIndex={0}
            onClick={props.click}
            onKeyPress={props.click}
        >
            {props.icon && props.iconFirst && (
                <span>
                    <Icon>{props.icon}</Icon>
                </span>
            )}
            {props.label && <label className='primary-button__name'>{props.label}</label>}
            {props.icon && !props.iconFirst && (
                <span>
                    <Icon>{props.icon}</Icon>
                </span>
            )}
        </button>
    );
}
