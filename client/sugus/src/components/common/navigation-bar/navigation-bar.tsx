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
        <nav className='navbar' data-cy='navbar'>
            <Link to='/' className='navbar__logo'>
                <img
                    className='navbar__logo__img-item'
                    src='/assets/logo_su2us_subtitle.png'
                    alt='SU2US'
                />
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
                            disabled: !isConnected(),
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
            </div>
        </nav>
    );
};
