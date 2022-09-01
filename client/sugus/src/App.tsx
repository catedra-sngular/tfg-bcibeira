import './App.scss';
import Home from './routes/home/home';
import { Route, Routes } from 'react-router-dom';
import ServerConnection from './routes/server/connection/server-connection';
import { NavigationBar } from './components/common/navigation-bar/navigation-bar';
import ServerMessages from './routes/server/messages/server-messages';
import { useEffect, useState } from 'react';
import axios from 'axios';
import WizardPage from './routes/wizard/wizard-page';
import { ConnectionProps } from './interfaces/connection-props';

function App() {
    const [user, setUser] = useState('');
    const [address, setAddress] = useState('');
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const [configFile, setConfigFile] = useState<File>();
    const apiUrl: string = process.env.REACT_APP_API_URL as string;
    const state: ConnectionProps = {
        connectionState: {
            user: user,
            setUser: setUser,
            address: address,
            setAddress: setAddress,
            configFile: configFile,
            setConfigFile: setConfigFile,
            dataLoaded: dataLoaded,
        },
    };

    useEffect(() => {
        getConnectionStatus();
    }, []);

    const getConnectionStatus = () => {
        axios
            .get(apiUrl + '/api/v1.0/connection/')
            .then(function (response) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const {
                    user,
                    address,
                }: {
                    user: string;
                    address: string;
                } = response.data;

                if (user && address) {
                    setUser(user);
                    setAddress(address);
                }
                setDataLoaded(true);
            })
            .catch(function (error) {
                console.log('connection error');
            });
    };

    return (
        <>
            <NavigationBar connectionState={state.connectionState}></NavigationBar>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route
                    path='wizard/create'
                    element={<WizardPage props={state} isNewWizard={true} />}
                />
                <Route
                    path='wizard/continue'
                    element={<WizardPage props={state} isNewWizard={false} />}
                />
                <Route
                    path='server/connection'
                    element={<ServerConnection connectionState={state.connectionState} />}
                />
                <Route
                    path='server/messages'
                    element={<ServerMessages connectionState={state.connectionState} />}
                />
                <Route></Route>
            </Routes>
        </>
    );
}

export default App;
