import { useEffect, useRef, useState } from 'react';
import { ConnectionProps } from '../../../interfaces/connection-props';
import { Link } from 'react-router-dom';
import { Dropdown } from '../dropdown/dropdown';
import { AiTwotoneCheckCircle } from 'react-icons/ai';
import './navigation-bar.scss';

export const NavigationBar = (props: ConnectionProps) => {
    const isConnected = () => {
        return !!props.connectionState.user && !!props.connectionState.address;
    };

    return (
        <nav className='navbar'>
            <Link to='/' className='navbar__logo'>
                <span className='navbar__logo__first-item'>Su2uS</span>
                <span className='navbar__logo__second-item'>by</span>
                <img className='navbar__logo__img-item' src='/assets/logoSU2.png' alt='logo' />
            </Link>

            <div className='navbar__navigation'>
                <Dropdown
                    label='Server'
                    options={[
                        {
                            label: 'Connection',
                            path: '/server/connection',
                        },
                        {
                            label: 'Send Files',
                            path: '/server/messages',
                        },
                    ]}
                />

                <Dropdown
                    label='Wizard'
                    options={[
                        {
                            label: 'New Wizard',
                            path: '/wizard/create',
                        },
                        {
                            label: 'Upload & Continue',
                            path: '/wizard/continue',
                        },
                    ]}
                />
            </div>

            <div>
                {/* {props.connectionState.dataLoaded && ( */}
                <Link className='navbar__connection-status' to='/server/connection'>
                    <AiTwotoneCheckCircle
                        className={
                            isConnected()
                                ? 'navbar__connection-status__icon connected'
                                : 'navbar__connection-status__icon disconnected'
                        }
                    />
                    <span
                        className={
                            isConnected()
                                ? 'navbar__connection-status__label connected'
                                : 'navbar__connection-status__label disconnected'
                        }
                    >
                        {isConnected() ? 'Connected' : 'Disconnected'}
                    </span>
                </Link>
                {/* )} */}
            </div>

            {/* <div className='container-header d-flex align-items-center'>
                <NavLink className='navbar-brand' to='/'>
                    <span className='h1'>Su2uS</span>
                    <span className='by'>{' by '}</span>
                    <img className='logo' src='/assets/logoSU2.png' alt='logo' />
                </NavLink>
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className='nav-item dropdown'>
                            <a
                                className='nav-link dropdown-toggle'
                                id='navbarDropdown'
                                role='button'
                                data-bs-toggle='dropdown'
                                aria-haspopup='true'
                                aria-expanded='false'
                                href=' '
                            >
                                Server
                            </a>
                            <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
                                <NavLink className='dropdown-item' to='/server/connection'>
                                    {'Connection'}
                                </NavLink>
                                <div className='dropdown-divider'></div>
                                {isConnected() && (
                                    <NavLink className='dropdown-item' to='/server/messages'>
                                        {'Send files'}
                                    </NavLink>
                                )}
                                {!isConnected() && <div className='joker-item'>{'Send files'}</div>}
                            </div>
                        </li>
                        <li className='nav-item dropdown'>
                            <a
                                className='nav-link dropdown-toggle'
                                id='navbarDropdown'
                                role='button'
                                data-bs-toggle='dropdown'
                                aria-haspopup='true'
                                aria-expanded='false'
                                href=' '
                            >
                                Wizard
                            </a>
                            <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
                                <NavLink className='dropdown-item' to='/wizard/create'>
                                    {'New Wizard'}
                                </NavLink>
                                <div className='dropdown-divider'></div>
                                <NavLink className='dropdown-item' to='/wizard/continue'>
                                    {'Upload & continue'}
                                </NavLink>
                            </div>
                        </li>
                    </ul>
                </div>

                <div style={{ width: '250px' }}>
                    {props.connectionState.dataLoaded && (
                        <Button variant={isConnected() ? 'success' : 'primary'}>
                            <NavLink
                                className='redirect'
                                style={{ color: isConnected() ? 'black' : 'white' }}
                                to='/server/connection'
                            >
                                {isConnected() ? 'Connection is UP!' : 'Not connected'}
                            </NavLink>
                        </Button>
                    )}
                </div>
            </div> */}
        </nav>
    );
};
