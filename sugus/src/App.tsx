import logo from './logo.svg';
import './App.css';
import ButtonPrimary from './components/buttons/primary/button-primary';
import CustomTextfield from './components/textfield/textfield';
import React from 'react';
import axios from 'axios';

enum ConnType {
    CLOSE = 0,
    OPEN = 1,
}

function App() {
    const [response, setResponse] = React.useState('');
    const [user, setUser] = React.useState('');
    const [passwd, setPasswd] = React.useState('');

    // const getMssg = () => {
    //     console.log('hola');
    //     axios
    //         .get(`http://localhost:27000/api/v1.0/test/`)
    //         .then((res) => {
    //             setResponse(res.data as string);
    //         })
    //         .catch((error) => console.log(error));
    // };

    const getMssg = () => {
        console.log('hola');
        axios
            .get(`http://localhost:5000/api/v1.0/test/`)
            .then((res) => {
                setResponse(res.data as string);
            })
            .catch(() => console.log('You are disconnected'));
    };

    const connection = (type: ConnType) => {
        axios
            .post('http://localhost:5000/api/v1.0/test/', {
                connType: type,
                dir: 'localhost',
                user: user,
                passwd: passwd,
            })
            .then(function (response) {
                console.log('connection created');
            })
            .catch(function (error) {
                console.log('connection error');
            });
    };

    return (
        <div className='App'>
            <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <div className='credentials'>
                    <CustomTextfield
                        label='Username'
                        placeholder='Escribe aquí'
                        onChangeInput={(value) => {
                            setUser(value);
                        }}
                    ></CustomTextfield>
                    <CustomTextfield
                        label='Password'
                        placeholder='Escribe aquí'
                        type='password'
                        onChangeInput={(value) => {
                            setPasswd(value);
                        }}
                    ></CustomTextfield>
                </div>
                <ButtonPrimary
                    icon='filter_list'
                    iconFirst={true}
                    label='Connect'
                    click={() => {
                        setTimeout(() => {
                            setResponse('');
                        }, 5000);
                        connection(ConnType.OPEN);
                    }}
                ></ButtonPrimary>
                <ButtonPrimary
                    icon='filter_list_off'
                    iconFirst={true}
                    label='Disconnect'
                    click={() => {
                        connection(ConnType.CLOSE);
                    }}
                ></ButtonPrimary>
                <ButtonPrimary
                    icon='accessibility'
                    iconFirst={true}
                    label='Test'
                    click={() => {
                        setTimeout(() => {
                            setResponse('');
                        }, 5000);
                        getMssg();
                    }}
                ></ButtonPrimary>
                {response && <pre>{response}</pre>}
            </header>
        </div>
    );
}

export default App;
