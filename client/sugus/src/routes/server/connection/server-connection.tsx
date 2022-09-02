import './server-connection.scss';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { ConnectionProps } from '../../../interfaces/connection-props';
import { ConnType } from '../../../interfaces/connection-type';
import { AiOutlineLock } from 'react-icons/ai';
import { MdAlternateEmail } from 'react-icons/md';

function ServerConnection(props: ConnectionProps) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [showError, setShowError] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnectionOwner, setIsConnectionOwner] = useState<boolean>();
    const [connectionStatus, setConnectionStatus] = useState<ConnType>(ConnType.CLOSE);
    const apiUrl: string = process.env.REACT_APP_API_URL as string;

    useEffect(() => {
        setUser(props.connectionState.user);
        setAddress(props.connectionState.address);
        if (props.connectionState.user && props.connectionState.address) {
            setConnectionStatus(ConnType.OPEN);
        } else {
            setConnectionStatus(ConnType.CLOSE);
        }
        const isConnectionOwnerStorage = localStorage.getItem('isConnectionOwner');

        if (isConnectionOwnerStorage) {
            setIsConnectionOwner(JSON.parse(isConnectionOwnerStorage) as boolean);
        }
    }, []);

    useEffect(() => {
        updateState();
    }, [connectionStatus]);

    useEffect(() => {
        localStorage.setItem('isConnectionOwner', JSON.stringify(isConnectionOwner));
    }, [isConnectionOwner]);

    const isConnected = () => {
        return !!props.connectionState.user && !!props.connectionState.address;
    };

    const updateState = () => {
        if (connectionStatus === ConnType.OPEN) {
            props.connectionState.setUser(user);
            props.connectionState.setAddress(address);
        } else {
            props.connectionState.setUser('');
            props.connectionState.setAddress('');
        }
    };

    const clearPassword = () => {
        const input = document.getElementById('password') as HTMLInputElement;
        if (input) {
            input.value = '';
            setPassword('');
        }
    };

    const getInputStyle = () => {
        return isConnected()
            ? {
                  fontStyle: 'italic',
                  color: '#b4b4b4',
              }
            : {};
    };

    const handleSetUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value || event.target.value === '') {
            setUser(event.target.value);
        }
    };

    const handleSetAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value || event.target.value === '') {
            setAddress(event.target.value);
        }
    };

    const handleSetPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value || event.target.value === '') {
            setPassword(event.target.value);
        }
    };

    const connection = () => {
        const params: {
            connType?: ConnType;
            address?: string;
            user?: string;
            password?: string;
        } = {};

        if (connectionStatus === ConnType.CLOSE) {
            params.connType = ConnType.OPEN;
            params.address = address;
            params.user = user;
            params.password = password;
            setIsConnecting(true);
        } else {
            params.connType = ConnType.CLOSE;
            params.password = password;
        }

        axios
            .post(apiUrl + '/api/v1.0/connection/', params)
            .then(function (response) {
                setShowError(false);
                const messg = params.connType ? 'connection created' : 'disconnected';
                setConnectionStatus(params.connType || ConnType.CLOSE);
                console.log(messg);
                if (params.connType === ConnType.OPEN) {
                    setIsConnecting(false);
                    setIsConnectionOwner(true);
                } else {
                    setIsConnectionOwner(false);
                }
                clearPassword();
            })
            .catch(function (error) {
                setIsConnecting(false);
                setShowError(true);
                console.log('connection error');
                clearPassword();
            });
    };

    return (
        <div className='connection-page'>
            <div className='connection-page__container'>
                <div>
                    <h1 className='connection-page__container__title'>Server connection</h1>
                    <p className='connection-page__container__description'>
                        Connect/Disconnect to the server
                    </p>
                </div>

                <div className='input-group my-3'>
                    <input
                        style={getInputStyle()}
                        disabled={isConnected()}
                        type='text'
                        className='form-control'
                        placeholder='Username'
                        aria-label='Username'
                        value={user}
                        onChange={handleSetUser}
                    />
                    <span className='input-group-text'>
                        <MdAlternateEmail />
                    </span>
                    <input
                        style={getInputStyle()}
                        disabled={isConnected()}
                        type='text'
                        className='form-control'
                        placeholder='Server'
                        aria-label='Server'
                        value={address}
                        onChange={handleSetAddress}
                    />
                </div>
                <div className='input-group my-3'>
                    <span className='input-group-text'>
                        <AiOutlineLock />
                    </span>
                    <input
                        type='password'
                        id='password'
                        className='form-control'
                        placeholder='Password'
                        aria-label='Password'
                        onChange={handleSetPassword}
                    />
                </div>

                {isConnected() && (
                    <Alert className='alert-info my-3'>
                        <p>It is possible only one connection at the same time</p>
                        <p>
                            Please, don't forget to close the connection to allow other users to
                            open a new one
                        </p>
                        <p className='fw-bold'>Enter password to close connection</p>
                    </Alert>
                )}

                {showError && (
                    <Alert className='alert-primary my-3'>
                        <p>Not possible to {isConnected() ? 'disconnect' : 'connect'}, try again</p>
                    </Alert>
                )}

                <Button
                    className='connection-page__container__button'
                    disabled={!password}
                    // variant={isConnected() ? 'primary' : 'light'}
                    onClick={() => {
                        connection();
                    }}
                >
                    {isConnecting && (
                        <div className='loading-button'>
                            <img alt='loading' src='/assets/loader.gif'></img>
                            <span className='loading-label'>Connecting. . .</span>
                        </div>
                    )}
                    {!isConnecting && <span>{isConnected() ? 'Disconnect' : 'Connect'}</span>}
                </Button>
            </div>
        </div>
    );
}

export default ServerConnection;

// import './server-connection.scss';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import { useEffect, useState } from 'react';
// import { Alert } from 'react-bootstrap';
// import { ConnectionProps } from '../../../interfaces/connection-props';
// import { ConnType } from '../../../interfaces/connection-type';

// function ServerConnection(props: ConnectionProps) {
//     const [user, setUser] = useState('');
//     const [password, setPassword] = useState('');
//     const [address, setAddress] = useState('');
//     const [showError, setShowError] = useState(false);
//     const [connectionStatus, setConnectionStatus] = useState<ConnType>(ConnType.CLOSE);
//     const apiUrl: string = process.env.REACT_APP_API_URL as string;

//     useEffect(() => {
//         setUser(props.connectionState.user);
//         setAddress(props.connectionState.address);
//         if (props.connectionState.user && props.connectionState.address) {
//             setConnectionStatus(ConnType.OPEN);
//         } else {
//             setConnectionStatus(ConnType.CLOSE);
//         }
//     }, []);

//     useEffect(() => {
//         updateState();
//     }, [connectionStatus]);

//     const isConnected = () => {
//         return !!props.connectionState.user && !!props.connectionState.address;
//     };

//     const updateState = () => {
//         if (connectionStatus === ConnType.OPEN) {
//             props.connectionState.setUser(user);
//             props.connectionState.setAddress(address);
//         } else {
//             props.connectionState.setUser('');
//             props.connectionState.setAddress('');
//         }
//     };

//     const clearPassword = () => {
//         const input = document.getElementById('password') as HTMLInputElement;
//         if (input) {
//             input.value = '';
//             setPassword('');
//         }
//     };

//     const getInputStyle = () => {
//         return isConnected()
//             ? {
//                   fontStyle: 'italic',
//                   color: '#b4b4b4',
//               }
//             : {};
//     };

//     const handleSetUser = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.value) {
//             setUser(event.target.value);
//         }
//     };

//     const handleSetAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.value) {
//             setAddress(event.target.value);
//         }
//     };

//     const handleSetPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.value) {
//             setPassword(event.target.value);
//         }
//     };

//     const connection = () => {
//         const params: {
//             connType?: ConnType;
//             address?: string;
//             user?: string;
//             password?: string;
//         } = {};

//         if (connectionStatus === ConnType.CLOSE) {
//             params.connType = ConnType.OPEN;
//             params.address = address;
//             params.user = user;
//             params.password = password;
//         } else {
//             params.connType = ConnType.CLOSE;
//             params.password = password;
//         }

//         axios
//             .post(apiUrl + '/api/v1.0/connection/', params)
//             .then(function (response) {
//                 setShowError(false);
//                 const messg = params.connType ? 'connection created' : 'disconnected';
//                 setConnectionStatus(params.connType || ConnType.CLOSE);
//                 console.log(messg);
//             })
//             .catch(function (error) {
//                 setShowError(true);
//                 console.log('connection error');
//             });
//         clearPassword();
//     };

//     return (
//         <div className='connection-container'>
//             <div className='center-container w-50 m-3'>
//                 <div className='description'>
//                     <h1>Server connection</h1>
//                     <p>Connect/Disconnect to the server</p>
//                 </div>

//                 <div className='input-group my-3'>
//                     <input
//                         style={getInputStyle()}
//                         disabled={isConnected()}
//                         type='text'
//                         className='form-control'
//                         placeholder='Username'
//                         aria-label='Username'
//                         value={user}
//                         onChange={handleSetUser}
//                     />
//                     <span className='input-group-text'>@</span>
//                     <input
//                         style={getInputStyle()}
//                         disabled={isConnected()}
//                         type='text'
//                         className='form-control'
//                         placeholder='Server'
//                         aria-label='Server'
//                         value={address}
//                         onChange={handleSetAddress}
//                     />
//                 </div>
//                 <div className='input-group my-3'>
//                     <span className='input-group-text'>
//                         <i className='bi bi-lock'></i>
//                     </span>
//                     <input
//                         type='password'
//                         id='password'
//                         className='form-control'
//                         placeholder='Password'
//                         aria-label='Password'
//                         onChange={handleSetPassword}
//                     />
//                 </div>

//                 {isConnected() && (
//                     <Alert className='alert-info my-3'>
//                         <p>It is possible only one connection at the same time</p>
//                         <p>
//                             Please, don't forget to close the connection to allow other users to
//                             open a new one
//                         </p>
//                         <p className='fw-bold'>Enter password to close connection</p>
//                     </Alert>
//                 )}

//                 {showError && (
//                     <Alert className='alert-primary my-3'>
//                         <p>Not possible to {isConnected() ? 'disconnect' : 'connect'}, try again</p>
//                     </Alert>
//                 )}

//                 <Button
//                     className='mt-4'
//                     disabled={!password}
//                     variant={isConnected() ? 'primary' : 'light'}
//                     onClick={() => {
//                         connection();
//                     }}
//                 >
//                     {isConnected() ? 'Disconnect' : 'Connect'}
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default ServerConnection;
