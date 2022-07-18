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
    const [file, setFile] = React.useState<File>();

    const getMssg = () => {
        console.log('hola');
        axios
            .get(`http://localhost:8090/api/v1.0/test/`)
            .then((res) => {
                setResponse(res.data as string);
            })
            .catch(() => console.log('You are disconnected'));
    };

    const connection = (type: ConnType) => {
        axios
            .post('http://localhost:8090/api/v1.0/test/', {
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
        if (file) {
            const formData = new FormData();

            // Update the formData object
            formData.append('configFile', file, file?.name);

            // Details of the uploaded file
            console.log(file);
            console.log(JSON.stringify(Object.fromEntries(formData)));

            axios
                .post('http://localhost:8090/api/v1.0/file/', formData)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
        // const file = event.target.files?.item(0);
        // if (file) {
        //     const name = event.target.value.split('/').pop() as string;
        //     setFile(file);
        //     setFileName(name);
        // }
    };

    // const loadText = (f: File | null | undefined) => {
    //     if (f) {
    //         f.text()
    //             .then((text) => {
    //                 console.log(text);
    //                 return text;
    //             })
    //             .catch((e) => console.log(e));
    //     }
    // };

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

                <input type='file' onChange={loadFile} />

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
