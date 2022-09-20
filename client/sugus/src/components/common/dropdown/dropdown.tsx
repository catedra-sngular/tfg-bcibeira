import { useEffect, useRef, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './dropdown.scss';

export interface DropdownOption {
    label: string;
    path: string;
    disabled?: boolean;
}

interface DropdownProps {
    label: string;
    options: DropdownOption[];
}

export const Dropdown = ({ label, options }: DropdownProps) => {
    const [openSubmenu, setOpenSubmenu] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setOpenSubmenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    const handleToggleSubmenu = () => {
        setOpenSubmenu(!openSubmenu);
    };

    return (
        <div className='dropdown' data-cy='dropdown-button' ref={wrapperRef}>
            <div className='dropdown__button' onClick={handleToggleSubmenu}>
                <span className='dropdown__button__label'>{label}</span>
                {openSubmenu ? (
                    <AiFillCaretUp className='dropdown__button__icon' />
                ) : (
                    <AiFillCaretDown className='dropdown__button__icon' />
                )}
            </div>

            {openSubmenu && (
                <ul className='dropdown__submenu'>
                    {options &&
                        options.map((option: DropdownOption, index: number) => {
                            return (
                                <>
                                    <li
                                        key={index}
                                        className='dropdown__submenu__item'
                                        data-cy='dropdown-submenu-link'
                                    >
                                        {option.disabled && (
                                            <span className='dropdown__submenu__item__label dropdown__submenu__item__label--disabled'>
                                                {option.label}
                                            </span>
                                        )}
                                        {!option.disabled && (
                                            <Link
                                                onClick={handleToggleSubmenu}
                                                to={option.path}
                                                className='dropdown__submenu__item__link'
                                            >
                                                <span className='dropdown__submenu__item__label'>
                                                    {option.label}
                                                </span>
                                            </Link>
                                        )}
                                    </li>
                                    {options && options.length > 1 ? (
                                        <span className='dropdown__submenu__item__separation'></span>
                                    ) : null}
                                </>
                            );
                        })}
                </ul>
            )}
        </div>
    );
};
