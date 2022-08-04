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
    const [dir, setDir] = React.useState('');
    const [configFile, setConfigFile] = React.useState<File>();
    const [meshFile, setMeshFile] = React.useState<File>();
    const apiUrl: string = process.env.REACT_APP_API_URL as string;

    const getMssg = () => {
        axios
            .get(apiUrl + '/api/v1.0/test/')
            .then((res) => {
                setResponse(res.data as string);
            })
            .catch(() => console.log('You are disconnected'));
    };

    const connection = (type: ConnType) => {
        axios
            .post(apiUrl + '/api/v1.0/test/', {
                connType: type,
                dir: dir,
                user: user,
                passwd: passwd,
            })
            .then(function (response) {
                const messg = type ? 'connection created' : 'disconnected';
                console.log(messg);
            })
            .catch(function (error) {
                console.log('connection error');
            });
    };

    const sendFile = () => {
        if (configFile && meshFile) {
            const formData = new FormData();

            // Update the formData object
            formData.append('configFile', configFile, configFile?.name);

            // Details of the uploaded file
            console.log(configFile);
            console.log(JSON.stringify(Object.fromEntries(formData)));

            // Update the formData object
            formData.append('meshFile', meshFile, meshFile?.name);

            // Details of the uploaded file
            console.log(configFile);
            console.log(JSON.stringify(Object.fromEntries(formData)));

            axios
                .post(apiUrl + '/api/v1.0/file/', formData)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const loadFile = (event: React.ChangeEvent<HTMLInputElement>, type: number) => {
        if (event.target.files) {
            if (type) {
                setMeshFile(event.target.files[0]);
            } else {
                setConfigFile(event.target.files[0]);
            }
        }
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
                    <CustomTextfield
                        label='Direction'
                        placeholder='Escribe aquí'
                        onChangeInput={(value) => {
                            setDir(value);
                        }}
                    ></CustomTextfield>
                </div>

                <div>
                    <label>Config File </label>
                    <input type='file' onChange={(e) => loadFile(e, 0)} />
                </div>
                <div>
                    <label>Mesh File </label>
                    <input type='file' onChange={(e) => loadFile(e, 1)} />
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
                <ButtonPrimary
                    icon='send'
                    iconFirst={true}
                    label='SendFile'
                    click={() => {
                        sendFile();
                    }}
                ></ButtonPrimary>
                {response && <pre>{response}</pre>}
            </header>
        </div>
    );
}

export default App;
