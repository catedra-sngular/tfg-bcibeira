import './server-messages.scss';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useEffect, useRef, useState } from 'react';
import { ConnectionProps } from '../../../interfaces/connection-props';
import { ConnType } from '../../../interfaces/connection-type';
import { Alert } from 'react-bootstrap';
import { updateConnectionStatus } from '../../../helpers/update-connection-status';

const DEFAULT_DELAY = '2';
const MAX_SERVER_TRIES = 5;
const INITIAL_HEADER = [
    <th key={'header-empty'} scope='col'>
        {'-'}
    </th>,
];

interface ServerMessagesProps {
    props: ConnectionProps;
}

function ServerMessages({ props }: ServerMessagesProps) {
    const [configFile, setConfigFile] = useState<File>();
    const [meshFile, setMeshFile] = useState<File>();
    const [table, setTable] = useState<JSX.Element>();
    const [delay, setDelay] = useState<string>();
    const [connectionStatus, setConnectionStatus] = useState<ConnType>();
    const [waitingData, setWaitingData] = useState<boolean>(false);
    const [sendingFiles, setSendingFiles] = useState<boolean>(false);
    const [showServerError, setShowServerError] = useState<boolean>(false);
    const [isConnectionOwner, setIsConnectionOwner] = useState<boolean>();
    const hiddenConfigFileInputRef = useRef<HTMLInputElement>(null);
    const hiddenMeshFileInputRef = useRef<HTMLInputElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    const apiUrl: string = process.env.REACT_APP_API_URL as string;

    let header: JSX.Element[] = [...INITIAL_HEADER];
    let body: JSX.Element[] = [];
    let messagesInterval: NodeJS.Timer;
    let serverTries = 0;

    useEffect(() => {
        updateConnectionStatus(props);

        if (props.connectionState.user && props.connectionState.address) {
            setConnectionStatus(ConnType.OPEN);
        } else {
            setConnectionStatus(ConnType.CLOSE);
        }
        if (props.connectionState.configFile) {
            setConfigFile(props.connectionState.configFile);
        }

        const isConnectionOwnerStorage = localStorage.getItem('isConnectionOwner');

        if (isConnectionOwnerStorage === 'true') {
            setIsConnectionOwner(true);
        } else {
            setIsConnectionOwner(false);
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

    const isSendBlocked = () => {
        return (
            connectionStatus === ConnType.CLOSE ||
            waitingData ||
            sendingFiles ||
            !configFile ||
            !meshFile ||
            !isConnectionOwner
        );
    };

    const sendFiles = () => {
        setTable(undefined);
        header = [...INITIAL_HEADER];
        body = [];
        setShowServerError(false);
        setSendingFiles(true);
        const formData = new FormData();

        // Update the formData object
        formData.append('configFile', configFile as File, configFile?.name);

        // Update the formData object
        formData.append('meshFile', meshFile as File, meshFile?.name);

        formData.append('delay', delay || DEFAULT_DELAY);

        axios
            .post(apiUrl + '/api/v1.0/file/', formData)
            .then(function (response) {
                messagesInterval = setInterval(() => {
                    getMessage(response.data as string);
                }, parseInt(delay || DEFAULT_DELAY, 10) * 1000);
            })
            .catch(function (error) {
                setSendingFiles(false);
                console.log(error);
            });
    };

    const getMessage = (hash: string) => {
        if (hash) {
            axios
                .get(apiUrl + '/api/v1.0/message/' + hash)
                .then(function (response) {
                    if (
                        !(response.data as string).includes('No messages yet') &&
                        !(response.data as string).includes('null')
                    ) {
                        if (serverTries !== 0) {
                            serverTries = 0;
                        }
                        const table = loadTable(response.data as string);
                        setSendingFiles(false);
                        setWaitingData(true);
                        setTable(table);
                        if ((response.data as string).includes('EOF')) {
                            clearInterval(messagesInterval);
                            setWaitingData(false);
                        }
                    } else {
                        if (serverTries === MAX_SERVER_TRIES) {
                            clearInterval(messagesInterval);
                            setSendingFiles(false);
                            setWaitingData(false);
                            serverTries = 0;
                            setShowServerError(true);
                            setTable(undefined);
                        } else {
                            serverTries++;
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    clearInterval(messagesInterval);
                    setSendingFiles(false);
                    setShowServerError(true);
                    setTable(undefined);
                });
        } else {
            clearInterval(messagesInterval);
            setSendingFiles(false);
            setWaitingData(false);
            setShowServerError(true);
            setTable(undefined);
        }
    };

    const parseData = (data: string) => {
        if (data) {
            const messages: string[] = data.split('\n').filter((message: string) => message !== '');
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
                if (header.length <= line.length && index === 0) {
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
                    {showServerError && (
                        <Alert className='alert-primary my-3'>
                            <p>Sorry, SU2 is not running</p>
                        </Alert>
                    )}

                    {!isConnectionOwner && (
                        <Alert className='alert-primary my-3'>
                            <p>Insufficient permissions.</p>
                            <p>Server connection has been created by other user</p>
                        </Alert>
                    )}
                    <Button
                        variant='primary'
                        className='send-files__button'
                        disabled={isSendBlocked()}
                        onClick={() => {
                            sendFiles();
                        }}
                    >
                        {!sendingFiles && !waitingData && <span>Send Files</span>}
                        {(sendingFiles || waitingData) && (
                            <div className='loading-button'>
                                <img alt='loading' src='/assets/loader.gif'></img>
                                {sendingFiles && (
                                    <span className='loading-label'>Sending files. . .</span>
                                )}
                                {waitingData && (
                                    <span className='loading-label'>
                                        Waiting for finish execution
                                    </span>
                                )}
                            </div>
                        )}
                    </Button>
                </div>
            </div>
            {table && (
                <div className='results-container' ref={resultRef}>
                    <div className='table-container'>
                        <h1>Server Results</h1>
                        {table}
                    </div>
                    {waitingData && (
                        <div className='loading-table-container'>
                            <img alt='loading' src='/assets/loader.gif'></img>
                            <span className='loading-label'>Waiting for data. . .</span>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default ServerMessages;
