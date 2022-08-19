import './server-connection.scss';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';

enum ConnType {
    CLOSE = 0,
    OPEN = 1,
}

function ServerConnection() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [showError, setShowError] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<ConnType>(ConnType.CLOSE);
    // const [response, setResponse] = useState('');
    const apiUrl: string = process.env.REACT_APP_API_URL as string;

    const handleSetUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            setUser(event.target.value);
        }
    };

    const handleSetAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            setAddress(event.target.value);
        }
    };

    const handleSetPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            setPassword(event.target.value);
        }
    };

    const connection = () => {
        const connType = connectionStatus === ConnType.CLOSE ? ConnType.OPEN : ConnType.CLOSE;
        axios
            .post(apiUrl + '/api/v1.0/test/', {
                connType: connType,
                dir: address,
                user: user,
                passwd: password,
            })
            .then(function (response) {
                setShowError(false);
                const messg = connType ? 'connection created' : 'disconnected';
                setConnectionStatus(connType);
                console.log(messg);
            })
            .catch(function (error) {
                setShowError(true);
                console.log('connection error');
            });
    };

    return (
        <div className='connection-container'>
            <div className='center-container w-50 m-3'>
                <div className='description'>
                    <h1>Server connection</h1>
                    <p>Connect/Disconnect to the server</p>
                </div>

                <div className='input-group my-3'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Username'
                        aria-label='Username'
                        onChange={handleSetUser}
                    />
                    <span className='input-group-text'>@</span>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Server'
                        aria-label='Server'
                        onChange={handleSetAddress}
                    />
                </div>
                <div className='input-group my-3'>
                    <span className='input-group-text'>
                        <i className='bi bi-lock'></i>
                    </span>
                    <input
                        type='password'
                        className='form-control'
                        placeholder='Password'
                        aria-label='Password'
                        onChange={handleSetPassword}
                    />
                </div>

                {connectionStatus === ConnType.OPEN && (
                    <Alert className='alert-info my-3'>
                        <p>It is possible only one connection at the same time</p>
                        <p>
                            Please, close connection to allow other users to open a new connection
                        </p>
                    </Alert>
                )}

                {showError && (
                    <Alert className='alert-primary my-3'>
                        <p>Not possible to connect</p>
                    </Alert>
                )}

                <Button
                    className='mt-4'
                    variant={connectionStatus === ConnType.OPEN ? 'primary' : 'light'}
                    onClick={() => {
                        connection();
                    }}
                >
                    {connectionStatus === ConnType.OPEN ? 'Disconnect' : 'Connect'}
                </Button>
            </div>
        </div>
    );
}

export default ServerConnection;
