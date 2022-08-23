import './App.scss';
import Home from './routes/home/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ServerConnection from './routes/server/connection/server-connection';
import { NavigationBar } from './components/common/navigation-bar/navigation-bar';
import { Footer } from './components/common/footer/footer';
import ServerMessages from './routes/server/messages/server-messages';
import WizardCreate from './routes/wizard/create/wizard-create';
import WizardContinue from './routes/wizard/continue/wizard-continue';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
    const [user, setUser] = useState('');
    const [address, setAddress] = useState('');
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const apiUrl: string = process.env.REACT_APP_API_URL as string;
    const state = {
        user: user,
        setUser: setUser,
        address: address,
        setAddress: setAddress,
        dataLoaded: dataLoaded,
    };

    useEffect(() => {
        !dataLoaded && getConnectionStatus();
    }, [dataLoaded]);

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
            <NavigationBar connectionState={state}></NavigationBar>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='wizard/create' element={<WizardCreate />} />
                    <Route path='wizard/continue' element={<WizardContinue />} />
                    <Route
                        path='server/connection'
                        element={<ServerConnection connectionState={state} />}
                    />
                    <Route path='server/messages' element={<ServerMessages />} />
                    <Route></Route>
                </Routes>
            </BrowserRouter>
            <Footer></Footer> {/* FOOTER PROVISIONAL */}
        </>
    );
}

export default App;
