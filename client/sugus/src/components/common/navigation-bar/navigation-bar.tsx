import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ConnectionProps } from '../../../interfaces/connection-props';
import './navigation-bar.scss';

export const NavigationBar = (props: ConnectionProps) => {
    const isConnected = () => {
        return !!props.connectionState.user && !!props.connectionState.address;
    };

    return (
        <nav className='navbar navbar-expand-lg navbar-secondary bg-secondary'>
            <div className='container-header d-flex align-items-center'>
                <NavLink className='navbar-brand' to='/'>
                    <span className='h1'>Su2uS</span>
                    <span>{' by '}</span>
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
            </div>
        </nav>
    );
};
