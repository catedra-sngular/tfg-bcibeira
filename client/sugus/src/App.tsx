import './App.scss';
import Home from './routes/home/home';
import { Route, Routes } from 'react-router-dom';
import ServerConnection from './routes/server/connection/server-connection';
import { NavigationBar } from './components/common/navigation-bar/navigation-bar';
import ServerMessages from './routes/server/messages/server-messages';
import { useEffect, useState } from 'react';
import WizardPage from './routes/wizard/wizard-page';
import { ConnectionProps } from './interfaces/connection-props';
import { updateConnectionStatus } from './helpers/update-connection-status';
import { Modal } from 'react-bootstrap';

function App() {
    const [user, setUser] = useState('');
    const [address, setAddress] = useState('');
    const [configFile, setConfigFile] = useState<File>();
    const [statusChangedOutside, setStatusChangedOutside] = useState<boolean>(false);
    const state: ConnectionProps = {
        connectionState: {
            user: user,
            setUser: setUser,
            address: address,
            setAddress: setAddress,
            configFile: configFile,
            setConfigFile: setConfigFile,
            statusChangedOutside: statusChangedOutside,
            setStatusChangedOutside: setStatusChangedOutside,
        },
    };

    useEffect(() => {
        updateConnectionStatus(state);
    }, []);

    const handleCloseWarning = () => {
        setStatusChangedOutside(false);
    };

    const getWarningText = () => {
        let variantText = undefined;

        if (user && address) {
            variantText = (
                <div className='connection-warning-variant__connected'>
                    <p>Now, server is connected to:</p>
                    <p>User: {user}</p>
                    <p>Address: {address}</p>
                </div>
            );
        } else {
            variantText = (
                <div className='connection-warning-variant__disconnected'>
                    <p>Now, server is disconnected</p>
                </div>
            );
        }

        return (
            <div className='connection-warning'>
                <p>Another user has changed the server connection status</p>
                {variantText}
            </div>
        );
    };

    return (
        <>
            <NavigationBar connectionState={state.connectionState}></NavigationBar>
            <Routes>
                <Route path='/' element={<Home props={state} />} />
                <Route
                    path='wizard/create'
                    element={<WizardPage props={state} isNewWizard={true} />}
                />
                <Route
                    path='wizard/continue'
                    element={<WizardPage props={state} isNewWizard={false} />}
                />
                <Route path='server/connection' element={<ServerConnection props={state} />} />
                <Route path='server/messages' element={<ServerMessages props={state} />} />
                <Route></Route>
            </Routes>
            <Modal show={statusChangedOutside} onHide={handleCloseWarning} centered>
                <Modal.Header closeButton>Attention</Modal.Header>
                <Modal.Body>{getWarningText()}</Modal.Body>
            </Modal>
        </>
    );
}

export default App;
