import './wizard-create.scss';
import { tap } from 'rxjs';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
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
import { ConnectionProps } from '../../../interfaces/connection-props';
import { cleanNoVisibleAnswers } from '../../../helpers/clean-no-visible-answers';

function WizardCreate(props: ConnectionProps) {
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [isWizardDisabled, setIsWizardDisabled] = useState<boolean>(false);
    const [sectionName, setSectionName] = useState<string>();
    const [section, setSection] = useState<WizardSection>();
    const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false);
    const [sectionSummary, setSectionSummary] = useState<WizardSectionSummary>();

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

    const handleStartButton = () => {
        setSectionName('solver-type');
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
                {!section && (
                    <div className='info-container'>
                        <h1>Create config file</h1>
                        <p>
                            This wizard will guide you through hundreds of possible options, so you
                            can easily create your configuration file for su2
                        </p>
                        <p>- Easy to create</p>
                        <p>- Parmeters documentation</p>
                        <p>- Downloadable</p>

                        <div className='d-flex justify-content-center'>
                            <Button className='btn_pr' onClick={handleStartButton}>
                                Start new config
                            </Button>
                        </div>
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
                    <Button variant='light' onClick={handleBackToWelcomePage}>
                        Back to initial page
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

export default WizardCreate;
