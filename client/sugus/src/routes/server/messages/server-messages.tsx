import './server-messages.scss';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useEffect, useRef, useState } from 'react';
import { ConnectionProps } from '../../../interfaces/connection-props';
import { ConnType } from '../../../interfaces/connection-type';

const DEFAULT_DELAY = '2';

function ServerMessages(props: ConnectionProps) {
    const [configFile, setConfigFile] = useState<File>();
    const [meshFile, setMeshFile] = useState<File>();
    const [table, setTable] = useState<JSX.Element>();
    const [delay, setDelay] = useState<string>();
    const [connectionStatus, setConnectionStatus] = useState<ConnType>();
    const hiddenConfigFileInputRef = useRef<HTMLInputElement>(null);
    const hiddenMeshFileInputRef = useRef<HTMLInputElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    const header: JSX.Element[] = [
        <th key={'header-empty'} scope='col'>
            {'-'}
        </th>,
    ];
    const body: JSX.Element[] = [];

    const apiUrl: string = process.env.REACT_APP_API_URL as string;
    let messaggeInterval: NodeJS.Timer;

    useEffect(() => {
        if (props.connectionState.user && props.connectionState.address) {
            setConnectionStatus(ConnType.OPEN);
        } else {
            setConnectionStatus(ConnType.CLOSE);
        }
        if (props.connectionState.configFile) {
            setConfigFile(props.connectionState.configFile);
        }
    }, []);

    useEffect(() => {
        props.connectionState.setConfigFile(configFile);
    }, [configFile]);

    useEffect(() => {
        scrollToBottom();
    }, [table]);

    const scrollToBottom = () => {
        if (resultRef.current) {
            resultRef.current.scrollIntoView(false);
        }
    };

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

            formData.append('delay', delay || DEFAULT_DELAY);

            axios
                .post(apiUrl + '/api/v1.0/file/', formData)
                .then(function (response) {
                    // console.log(response);
                    messaggeInterval = setInterval(() => {
                        getMessage(response.data as string);
                    }, parseInt(delay || DEFAULT_DELAY, 10) * 1000);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const getMessage = (hash: string) => {
        // console.log('1234');
        if (hash) {
            // console.log('5678');
            axios
                .get(apiUrl + '/api/v1.0/message/' + hash)
                .then(function (response) {
                    if (!(response.data as string).includes('Any messages yet')) {
                        // console.log(response.data);
                        const table = loadTable(response.data as string);
                        // console.log(table);
                        setTable(table);
                        if ((response.data as string).includes('EOF')) {
                            clearInterval(messaggeInterval);
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const parseData = (data: string) => {
        if (data) {
            const messages: string[] = data.split('\n').filter((message: string) => message !== '');
            // console.log('mssgs: ', messages);

            const messagesMatrix: string[][] = [];

            messages.forEach((line: string) => {
                const lineArray = line.split(',');
                messagesMatrix.push(lineArray);
            });

            return messagesMatrix;
        }
    };

    const loadTable = (data: string) => {
        const items = parseData(data) || [];

        items.forEach((line, index) => {
            const data = [];

            for (let iterator = 0; iterator < line.length; iterator++) {
                if (body.length === 0 && index === 0) {
                    header.push(
                        <th key={`header-${iterator}`} scope='col'>
                            {line[iterator].trim()}
                        </th>,
                    );
                } else {
                    data.push(
                        <td key={`cell-${body.length}-${iterator}`}>{line[iterator].trim()}</td>,
                    );
                }
            }

            if (data.length) {
                body.push(
                    <tr key={`row-${body.length}`}>
                        <th key={`rowNumber-${body.length}`} scope='row'>
                            {body.length}
                        </th>
                        {data}
                    </tr>,
                );
            }
        });

        // console.log(header);
        // console.log(body);

        return (
            <table className='table'>
                <thead>
                    <tr key={'header'}>{header}</tr>
                </thead>
                <tbody>{body}</tbody>
            </table>
        );
    };

    return (
        <>
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
                        <label className='send-files__input-label'>Messages frecuency:</label>
                        <div className='select mb-3'>
                            <select className='form-select' onChange={handleOptionChange}>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                            <span className='mx-3' style={{ fontSize: '1.4rem' }}>
                                (seconds)
                            </span>
                        </div>
                    </div>
                    {connectionStatus === ConnType.CLOSE && configFile && meshFile && (
                        <div className='alert alert-info'>You must connect to a server first</div>
                    )}
                    <Button
                        variant='primary'
                        className='send-files__button'
                        disabled={connectionStatus === ConnType.CLOSE}
                        onClick={() => {
                            sendFiles();
                        }}
                    >
                        Send Files
                    </Button>
                </div>
            </div>
            {table && (
                <div className='results-container' ref={resultRef}>
                    <div className='table-container'>
                        <h1>Server Results</h1>
                        {table}
                    </div>
                </div>
            )}
        </>
    );
}

export default ServerMessages;
