import './navigation-bar.scss';

export const NavigationBar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-secondary bg-secondary'>
            <div className='container-header d-flex align-items-center'>
                <a className='navbar-brand' href='/'>
                    <span className='h1'>Su2uS</span>
                    <span>{' by '}</span>
                    <img className='logo' src='/assets/logoSU2.png' alt='logo' />
                </a>
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
                                <a className='dropdown-item' href='/server/connection'>
                                    {'Connection'}
                                </a>
                                <div className='dropdown-divider'></div>
                                <a className='dropdown-item' href='/server/messages'>
                                    {'Send files'}
                                </a>
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
                                <a className='dropdown-item' href='/wizard/create'>
                                    {'New Wizard'}
                                </a>
                                <div className='dropdown-divider'></div>
                                <a className='dropdown-item' href='/wizard/continue'>
                                    {'Upload & continue'}
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
