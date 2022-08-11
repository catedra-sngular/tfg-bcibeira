import './App.scss';
import axios from 'axios';
import { tap } from 'rxjs';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { WizardSection } from './interfaces/wizard-section';
import { useEffect, useRef, useState } from 'react';
import { Wizard } from './components/wizard/wizard';
import { WizardComplete } from './components/wizard-complete/wizard-complete';
import { Continue } from './components/continue/continue';
import { Answer } from './interfaces/answer';
import {
    WizardSectionSummary,
    WizardSectionSummaryItem,
} from './interfaces/wizard-section-summary';
import { Question } from './interfaces/question';
import { getSection, getSectionSummary } from './mocks/questions.mock';
import { Modal } from 'react-bootstrap';

enum ConnType {
    CLOSE = 0,
    OPEN = 1,
}

function App() {
    const [response, setResponse] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [configFile, setConfigFile] = useState<File>();
    const [meshFile, setMeshFile] = useState<File>();
    const [showConnectionForm, setShowConnectionForm] = useState<boolean>(false);
    const apiUrl: string = process.env.REACT_APP_API_URL as string;
    const [connectionStatus, setConnectionStatus] = useState<ConnType>(ConnType.CLOSE);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [isWizardDisabled, setIsWizardDisabled] = useState<boolean>(false);
    const [sectionName, setSectionName] = useState<string>();
    const [section, setSection] = useState<WizardSection>();
    const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false);
    const [sectionSummary, setSectionSummary] = useState<WizardSectionSummary>();
    const [wizardSelected, setWizardSelected] = useState<boolean>(false);
    const [serverSelected, setServerSelected] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [delay, setDelay] = useState<string>();
    const [execution, setExecution] = useState<string>();

    const hiddenConfigFileInputRef = useRef<HTMLInputElement>(null);
    const hiddenMeshFileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (sectionName) {
            setLoadingQuestions(true);
            getSection(sectionName)
                .pipe(
                    tap((section: WizardSection | undefined) => {
                        setSection(section);
                        setLoadingQuestions(false);
                    }),
                )
                .subscribe();
        } else {
            getSectionSummary()
                .pipe(
                    tap((summary: WizardSectionSummary | undefined) => {
                        setSectionSummary(summary);
                    }),
                )
                .subscribe();
            setSection(undefined);
        }
    }, [sectionName]);

    const handleBackToWelcomePage = (): void => {
        setSectionName(undefined);
        setAnswers([]);
        setConfigFile(undefined);
        setMeshFile(undefined);
        setShowConnectionForm(false);
        setServerSelected(false);
        setWizardSelected(false);
    };

    const handleSetAnswer = (question: Question, value: string | number): void => {
        if (answers.find((answer: Answer) => answer.key === question.key)) {
            setAnswers(
                answers.map((answer: Answer) => {
                    if (answer.key !== question.key) {
                        return { ...answer };
                    }
                    return { ...answer, value: value };
                }),
            );
        } else {
            setAnswers([
                ...answers,
                {
                    key: question.key,
                    value: value,
                    section: sectionName,
                    questionTitle: question.title,
                },
            ]);
        }
    };
    const handleDeleteAnswer = (question: Question): void => {
        if (answers.find((answers: Answer) => answers.key === question.key)) {
            setAnswers(answers.filter((answer: Answer) => answer.key !== question.key));
        }
    };

    const handleSetLoadingState = (questionToUpdate: Question, loadingState: boolean): void => {
        !!section &&
            section.groups.forEach((question: Question) => {
                if (question.key === questionToUpdate.key) {
                    question.loading = loadingState;
                }
            });
        setIsWizardDisabled(
            !!section && !!section.groups.find((question: Question) => question.loading),
        );
    };

    const handleSetIsWizardComplete = (isComplete: boolean): void => {
        setIsComplete(isComplete);
    };

    const handleContinueButton = () => {
        !!section && section.nextSection && setSectionName(section.nextSection);
    };

    const handleSelectConfigFile = (ref: React.RefObject<HTMLInputElement>) => {
        ref && ref.current && ref.current.click();
    };

    const handleStartButton = () => {
        setSectionName('solver-type');
    };

    const handleConnectServer = () => {
        setServerSelected(true);
        setShowConnectionForm(true);
    };

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

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value) {
            setDelay(event.target.value);
        }
    };

    const getMssg = () => {
        axios
            .get(apiUrl + '/api/v1.0/test/')
            .then((res) => {
                console.log(res.data);
                setResponse(res.data as string);
            })
            .catch(() => console.log('You are disconnected'));
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
                const messg = connType ? 'connection created' : 'disconnected';
                setConnectionStatus(connType);
                console.log(messg);
            })
            .catch(function (error) {
                console.log('connection error');
            });
    };

    const sendFiles = () => {
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
                    console.log(response.data);
                    console.log(JSON.stringify(response.data));
                    setExecution(response.data as string);
                    setShowModal(true);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const parseExecution = () => {
        if (execution) {
            const message = execution.replace('/n', '\n');
            return message;
        }
    };

    const handleSubmission = () => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const validLines: string[] = (fileReader.result as string)
                .split('\n')
                .filter((line: string) => {
                    return !line.match(/^%.*$/);
                });
            const importedAnswers: Answer[] = [];
            validLines.forEach((line: string) => {
                const matches = line.match(/(.*)=(.*)/);
                if (matches) {
                    importedAnswers.push({
                        key: matches[1].trim(),
                        value: matches[2].trim(),
                    });
                }
            });
            setAnswers(importedAnswers);
            setSectionName('solver-type');
        };
        fileReader.readAsText(configFile as Blob);
    };

    const getAnsweredQuestionForSection = (
        section: WizardSectionSummaryItem,
        answers: Answer[],
    ) => {
        const answeredQuestionsForSection = answers
            .filter((answer) => {
                return section.questionNames.includes(answer.key);
            })
            .map((answer) => (
                <p key={answer.key}>
                    <abbr title={answer.questionTitle}>{answer.key}</abbr>:{' '}
                    <strong>{answer.value}</strong>
                </p>
            ));

        return (
            answeredQuestionsForSection.length > 0 && (
                <div className={section.name !== sectionName ? 'section' : 'section current'}>
                    <div className='section__title'>
                        <h1>{section.title} </h1>
                        {section.name !== sectionName && (
                            <Button
                                variant='outline-secondary'
                                onClick={() => setSectionName(section.name)}
                            >
                                Open
                            </Button>
                        )}
                    </div>

                    {answeredQuestionsForSection}
                </div>
            )
        );
    };

    return (
        <div className='container'>
            <div className='wizard_container'>
                {loadingQuestions && (
                    <div className='loading-questions-wrapper'>
                        <div className='loading-questions-container'>
                            <img alt='loading' src='/assets/loading.gif'></img>
                            <p>Loading questions</p>
                        </div>
                    </div>
                )}
                {!section && (
                    <>
                        <h1>Welcome to Su2uS</h1>
                        {(serverSelected || wizardSelected) && (
                            <p>
                                <Button variant='dark' onClick={handleBackToWelcomePage}>
                                    Back to HOME
                                </Button>
                            </p>
                        )}
                        {!serverSelected && (
                            <>
                                <p>
                                    This wizard will guide you through hundreds of possible options,
                                    so you can easily create your configuration file for su2
                                </p>
                                <div className='my-3 files-selector d-flex flex-row'>
                                    <span className='d-flex flex-column-reverse'>
                                        <Button onClick={handleStartButton}>
                                            Start new config
                                        </Button>
                                    </span>
                                    <span className='mx-4 d-flex flex-column-reverse'>
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

                                        <span>
                                            <Button
                                                variant={configFile ? 'success' : 'secondary'}
                                                onClick={() => {
                                                    setWizardSelected(true);
                                                    handleSelectConfigFile(
                                                        hiddenConfigFileInputRef,
                                                    );
                                                }}
                                            >
                                                {configFile
                                                    ? 'Select another config file'
                                                    : 'Select config file'}
                                            </Button>
                                            {configFile && (
                                                <Button onClick={handleSubmission}>
                                                    Upload config file and start
                                                </Button>
                                            )}
                                        </span>
                                        {configFile && <p>Selected file: {configFile.name}</p>}
                                    </span>
                                </div>
                            </>
                        )}
                        {!wizardSelected && (
                            <>
                                <p>You can connect and send files to a server too</p>
                                <Button onClick={handleConnectServer}>Connect to a server</Button>
                                {showConnectionForm && (
                                    <>
                                        <div className='input-group my-3 w-50'>
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
                                        <div className='input-group my-3 w-25'>
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

                                        <div>
                                            <Button
                                                variant={
                                                    connectionStatus === ConnType.OPEN
                                                        ? 'danger'
                                                        : 'primary'
                                                }
                                                onClick={() => {
                                                    connection();
                                                }}
                                            >
                                                {connectionStatus === ConnType.OPEN
                                                    ? 'Disconnect'
                                                    : 'Connect'}
                                            </Button>
                                        </div>

                                        <div className='my-3'>
                                            <Button
                                                variant='primary'
                                                onClick={() => {
                                                    setTimeout(() => {
                                                        setResponse('');
                                                    }, 5000);
                                                    getMssg();
                                                }}
                                            >
                                                Test
                                            </Button>

                                            {response && <pre>{response}</pre>}
                                        </div>

                                        <div className='my-3 files-selector d-flex flex-row'>
                                            <span className='mx-3 d-flex flex-column-reverse'>
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
                                                    onClick={() =>
                                                        handleSelectConfigFile(
                                                            hiddenConfigFileInputRef,
                                                        )
                                                    }
                                                >
                                                    {configFile
                                                        ? 'Select another config file'
                                                        : 'Select config file'}
                                                </Button>
                                                {configFile && (
                                                    <p>Selected file: {configFile.name}</p>
                                                )}
                                            </span>
                                            <span className='mx-3 d-flex flex-column-reverse'>
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
                                                    onClick={() =>
                                                        handleSelectConfigFile(
                                                            hiddenMeshFileInputRef,
                                                        )
                                                    }
                                                >
                                                    {meshFile
                                                        ? 'Select another mesh file'
                                                        : 'Select mesh file'}
                                                </Button>
                                                {meshFile && <p>Selected file: {meshFile.name}</p>}
                                            </span>
                                            <span>
                                                <label>Messages delay</label>
                                                <select
                                                    className='form-control'
                                                    id='exampleFormControlSelect1'
                                                    onChange={handleOptionChange}
                                                >
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </span>
                                        </div>
                                        {connectionStatus === ConnType.CLOSE &&
                                            configFile &&
                                            meshFile && (
                                                <div className='alert alert-info'>
                                                    You must connect to a server first
                                                </div>
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
                                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Server reponse</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>{parseExecution()}</Modal.Body>
                                        </Modal>
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
                {!!section && (
                    <>
                        {section.title && <h1>{section.title}</h1>}
                        {section.description && <p>{section.description}</p>}
                        <Wizard
                            questions={section.groups}
                            answers={answers}
                            setAnswer={handleSetAnswer}
                            deleteAnswer={handleDeleteAnswer}
                            setIsComplete={handleSetIsWizardComplete}
                            setLoadingState={handleSetLoadingState}
                            disabled={isWizardDisabled}
                        ></Wizard>

                        {isComplete && !section.nextSection && (
                            <WizardComplete answers={answers}></WizardComplete>
                        )}
                        {isComplete && section.nextSection && (
                            <Continue handleContinueButton={handleContinueButton}></Continue>
                        )}
                    </>
                )}
            </div>
            {!!section && (
                <div className='answers_container'>
                    <Button variant='light' onClick={handleBackToWelcomePage}>
                        Back to welcome page
                    </Button>

                    {answers.length > 0 && (
                        <>
                            <h2>Answers summary</h2>

                            <div>
                                {sectionSummary?.sections
                                    .slice()
                                    .reverse()
                                    .map((section) => (
                                        <div key={`section-${section.name}`}>
                                            {getAnsweredQuestionForSection(section, answers)}
                                        </div>
                                    ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
