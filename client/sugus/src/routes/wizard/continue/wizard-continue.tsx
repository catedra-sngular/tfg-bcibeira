import './wizard-continue.scss';
import { tap } from 'rxjs';
import { useEffect, useRef, useState } from 'react';
import { Answer } from '../../../interfaces/answer';
import { WizardSection } from '../../../interfaces/wizard-section';
import {
    WizardSectionSummary,
    WizardSectionSummaryItem,
} from '../../../interfaces/wizard-section-summary';
import { getSection, getSectionSummary } from '../../../mocks/questions.mock';
import { Question } from '../../../interfaces/question';
import { Button } from 'react-bootstrap';
import { Continue } from '../../../components/continue/continue';
import { WizardComplete } from '../../../components/wizard-complete/wizard-complete';
import { Wizard } from '../../../components/wizard/wizard';

function WizardContinue() {
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [isWizardDisabled, setIsWizardDisabled] = useState<boolean>(false);
    const [sectionName, setSectionName] = useState<string>();
    const [section, setSection] = useState<WizardSection>();
    const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false);
    const [sectionSummary, setSectionSummary] = useState<WizardSectionSummary>();
    const [configFile, setConfigFile] = useState<File>();

    const hiddenConfigFileInputRef = useRef<HTMLInputElement>(null);

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
        <>
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
        </>
    );
}

export default WizardContinue;
