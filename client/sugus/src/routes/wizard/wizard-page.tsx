import './wizard-page.scss';
import { tap } from 'rxjs';
import { useEffect, useRef, useState } from 'react';
import { Answer } from '../../interfaces/answer';
import { WizardSection } from '../../interfaces/wizard-section';
import {
    WizardSectionSummary,
    WizardSectionSummaryItem,
} from '../../interfaces/wizard-section-summary';
import { getSection, getSectionSummary } from '../../mocks/questions.mock';
import { Question } from '../../interfaces/question';
import { Button, Modal } from 'react-bootstrap';
import { Continue } from '../../components/continue/continue';
import { WizardComplete } from '../../components/wizard-complete/wizard-complete';
import { Wizard } from '../../components/wizard/wizard';
import { ConnectionProps } from '../../interfaces/connection-props';
import { cleanNoVisibleAnswers } from '../../helpers/clean-no-visible-answers';

interface WizardPageProps {
    props: ConnectionProps;
    isNewWizard: boolean;
}

function WizardPage({ props, isNewWizard }: WizardPageProps) {
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [isWizardDisabled, setIsWizardDisabled] = useState<boolean>(false);
    const [sectionName, setSectionName] = useState<string>();
    const [section, setSection] = useState<WizardSection>();
    const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false);
    const [sectionSummary, setSectionSummary] = useState<WizardSectionSummary>();
    const [configFile, setConfigFile] = useState<File>(props.connectionState.configFile as File);
    const [showModal, setShowModal] = useState<boolean>(!isNewWizard);

    const hiddenConfigFileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        props.connectionState.setConfigFile(configFile);
    }, [configFile]);

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

    useEffect(() => {
        if (isNewWizard) {
            cleanWizard();
            setSectionName('solver-type');
        } else {
            setShowModal(true);
        }
    }, [isNewWizard]);

    const cleanWizard = () => {
        // setSection(undefined);
        // setSectionSummary(undefined);
        setSectionName(undefined);
        setAnswers([]);
        // setIsComplete(false);
    };

    const handleCancelUpload = () => {
        setShowModal(false);
        setSectionName('solver-type');
    };

    const handleSetAnswer = (question: Question, value: string | number): void => {
        const isUpdate = answers.find((answer: Answer) => answer.key === question.key);

        let updatedAnswers: Answer[] = [];

        if (isUpdate) {
            updatedAnswers = answers.map((answer: Answer) => {
                if (answer.key !== question.key) {
                    return { ...answer };
                }
                return {
                    ...answer,
                    value: value,
                    internal: question.internal as boolean,
                    visibleWhen: question.visibleWhen as unknown,
                };
            });
        } else {
            updatedAnswers = [
                ...answers,
                {
                    key: question.key,
                    value: value,
                    section: sectionName,
                    questionTitle: question.title,
                    internal: question.internal as boolean,
                    visibleWhen: question.visibleWhen as unknown,
                },
            ];
        }
        setAnswers(cleanNoVisibleAnswers(updatedAnswers));
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

    const handleSubmission = () => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const validLines: string[] = (fileReader.result as string)
                .split('\n')
                .filter((line: string) => {
                    return !line.match(/^%.*$/) || line.match(/^% SU2US.*$/);
                });
            const importedAnswers: Answer[] = [];
            validLines.forEach((line: string) => {
                const internal = line.includes('SU2US INTERNAL QUESTION');
                const matches = line.replace(/% SU2US INTERNAL QUESTION: /, '').match(/(.*)=(.*)/);
                if (matches) {
                    importedAnswers.push({
                        key: matches[1].trim(),
                        value: matches[2].trim(),
                        internal,
                    });
                }
            });
            setAnswers(importedAnswers);
            setSectionName('solver-type');
        };
        fileReader.readAsText(configFile as Blob);
        setShowModal(false);
    };

    const getAnsweredQuestionForSection = (
        section: WizardSectionSummaryItem,
        answers: Answer[],
    ) => {
        const answeredQuestionsForSection = answers
            .filter((answer) => {
                return section.questionNames.includes(answer.key) && !answer.internal;
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
                        <h1 style={{ fontSize: '2rem' }}>{section.title} </h1>
                        {section.name !== sectionName && (
                            <Button
                                variant='outline-secondary'
                                onClick={() => setSectionName(section.name)}
                            >
                                Open
                            </Button>
                        )}
                    </div>

                    <div style={{ fontSize: '1.4rem' }}>{answeredQuestionsForSection}</div>
                </div>
            )
        );
    };

    return (
        <>
            <div className='main-container'>
                <div className='wizard_container'>
                    {loadingQuestions && (
                        <div className='loading-questions-wrapper'>
                            <div className='loading-questions-container'>
                                <img alt='loading' src='/assets/loading.gif'></img>
                                <p>Loading questions</p>
                            </div>
                        </div>
                    )}
                    {/* {!section && (
                        <div className='info-container'>
                            <h1>Upload your config file</h1>
                            <p>
                                Upload your config file. Then you will edit and understand it better
                            </p>
                            <div className='my-3 files-selector d-flex flex-row'>
                                <span className='mt-3 mr-4 d-flex flex-column'>
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
                                            className='button'
                                            variant={configFile ? 'success' : 'secondary'}
                                            onClick={() => {
                                                handleSelectConfigFile(hiddenConfigFileInputRef);
                                            }}
                                        >
                                            {configFile
                                                ? 'Select another config file'
                                                : 'Select config file'}
                                        </Button>
                                    </span>
                                    {configFile && <p>Selected file: {configFile.name}</p>}
                                </span>
                            </div>
                            {configFile && (
                                <div className='mt-4 d-flex justify-content-center'>
                                    <Button className='button' onClick={handleSubmission}>
                                        Upload config file and start
                                    </Button>
                                </div>
                            )}
                        </div>
                    )} */}
                    <Modal
                        show={showModal}
                        size='lg'
                        aria-labelledby='contained-modal-title-vcenter'
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id='contained-modal-title-vcenter'>
                                Select a config file
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='my-3 files-selector d-flex flex-row'>
                                <span className='mt-3 mr-4 d-flex flex-column'>
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
                                            className='button'
                                            variant={configFile ? 'success' : 'secondary'}
                                            onClick={() => {
                                                handleSelectConfigFile(hiddenConfigFileInputRef);
                                            }}
                                        >
                                            {configFile
                                                ? 'Select another config file'
                                                : 'Select config file'}
                                        </Button>
                                    </span>
                                    {configFile && <p>Selected file: {configFile.name}</p>}
                                </span>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={handleSubmission}>{'Confirm & Start'}</Button>
                            <Button variant='secondary' onClick={handleCancelUpload}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {!!section && (
                        <>
                            {section.title && (
                                <h1 className='wizard-create__title'>{section.title}</h1>
                            )}
                            {section.description && (
                                <p className='wizard-create__description'>{section.description}</p>
                            )}
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
                                <WizardComplete state={props} answers={answers}></WizardComplete>
                            )}
                            {isComplete && section.nextSection && (
                                <Continue handleContinueButton={handleContinueButton}></Continue>
                            )}
                        </>
                    )}
                </div>
                {!!section && (
                    <div className='answers_container'>
                        {answers.length > 0 && (
                            <>
                                <h2 className='answers_container__title'>Answers summary</h2>

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
        </>
    );
}

export default WizardPage;
