import './server-messages.scss';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useRef, useState } from 'react';

enum ConnType {
    CLOSE = 0,
    OPEN = 1,
}

function ServerMessages() {
    const [configFile, setConfigFile] = useState<File>();
    const [meshFile, setMeshFile] = useState<File>();
    const [execution, setExecution] = useState<string>();
    const [table, setTable] = useState<JSX.Element>();
    const hiddenConfigFileInputRef = useRef<HTMLInputElement>(null);
    const hiddenMeshFileInputRef = useRef<HTMLInputElement>(null);
    const [delay, setDelay] = useState<string>();

    const apiUrl: string = process.env.REACT_APP_API_URL as string;
    let connectionStatus;

    connectionStatus = ConnType.CLOSE;
    connectionStatus = ConnType.OPEN;

    const handleSelectConfigFile = (ref: React.RefObject<HTMLInputElement>) => {
        ref && ref.current && ref.current.click();
    };

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value) {
            setDelay(event.target.value);
        }
    };

    const sendFiles = () => {
        if (configFile && meshFile) {
            const formData = new FormData();

            // Update the formData object
            formData.append('configFile', configFile, configFile?.name);

            // Update the formData object
            formData.append('meshFile', meshFile, meshFile?.name);

            axios
                .post(apiUrl + '/api/v1.0/file/', formData)
                .then(function (response) {
                    setExecution(response.data as string);
                    setTable(loadTable());
                    // setShowModal(true);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const parseExecution = () => {
        if (execution) {
            const message = execution.trim().split(',');
            return message;
        }
    };

    const loadTable = () => {
        const items = parseExecution() || [];
        const columns = 7;
        const header = [];
        const body = [];
        let iterator = 0;

        for (iterator; iterator < columns; iterator++) {
            console.log(iterator, items[iterator]);
            if (items[iterator]) {
                header.push(<th scope='col'>{items[iterator].trim()}</th>);
            }
        }
        for (iterator; iterator < items.length; iterator += columns) {
            const data = [];
            for (let i = 0; iterator + i < items.length; i++) {
                console.log(iterator + i, items[iterator + i]);
                data.push(<td>{items[iterator + i].trim()}</td>);
            }
            body.push(
                <tr>
                    <th scope='row'>{iterator / columns}</th>
                    {data}
                </tr>,
            );
        }
        console.log(header);
        console.log(body);

        return (
            <table className='table'>
                <thead>
                    <tr>{header}</tr>
                </thead>
                <tbody>{body}</tbody>
            </table>
        );
    };

    return (
        <div className='messages-container'>
            <div className='form-container'>
                <h1>Send files to server</h1>

                <p>Send files to a server and read responses</p>

                <div className='my-3 files-selector d-flex flex-row'>
                    <span className='mr-3 d-flex flex-column'>
                        <input
                            ref={hiddenConfigFileInputRef}
                            className='hide_input_file'
                            type='file'
                            name='file'
                            onChange={(event) => {
                                if (event.target.files) {
                                    setConfigFile(event.target?.files[0]);
                                }
                            }}
                        ></input>

                        <Button
                            className='file-button'
                            variant={configFile ? 'success' : 'secondary'}
                            onClick={() => handleSelectConfigFile(hiddenConfigFileInputRef)}
                        >
                            {configFile ? 'Select another config file' : 'Select config file'}
                        </Button>
                        {configFile && (
                            <p className='file-descriptor'>Selected file: {configFile.name}</p>
                        )}
                    </span>
                    <span className='mx-3 d-flex flex-column'>
                        <input
                            ref={hiddenMeshFileInputRef}
                            className='hide_input_file'
                            type='file'
                            name='file'
                            onChange={(event) => {
                                if (event.target.files) {
                                    setMeshFile(event.target?.files[0]);
                                }
                            }}
                        ></input>

                        <Button
                            className='file-button'
                            variant={meshFile ? 'success' : 'secondary'}
                            onClick={() => handleSelectConfigFile(hiddenMeshFileInputRef)}
                        >
                            {meshFile ? 'Select another mesh file' : 'Select mesh file'}
                        </Button>
                        {meshFile && (
                            <p className='file-descriptor'>Selected file: {meshFile.name}</p>
                        )}
                    </span>
                </div>
                <div>
                    <label>Messages frecuency:</label>
                    <div className='select mb-3'>
                        <select className='form-select' onChange={handleOptionChange}>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                        <span className='mx-3'>(seconds)</span>
                    </div>
                </div>
                {connectionStatus === ConnType.CLOSE && configFile && meshFile && (
                    <div className='alert alert-info'>You must connect to a server first</div>
                )}
                <Button
                    variant='primary'
                    disabled={connectionStatus === ConnType.CLOSE}
                    onClick={() => {
                        sendFiles();
                    }}
                >
                    Send Files
                </Button>
            </div>
            {table}
        </div>
    );
}

export default ServerMessages;
