import { useEffect, useRef } from 'react';
import { Answer } from '../../interfaces/answer';
import { getExportFileSectionInfo } from '../../mocks/questions.mock';
import './wizard-complete.scss';
import Button from 'react-bootstrap/Button';

interface WizardCompleteProps {
    answers: Answer[];
}

export const WizardComplete = ({ answers }: WizardCompleteProps) => {
    const completeRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        scrollQuestionIntoView();
    }, []);

    const scrollQuestionIntoView = () => {
        completeRef &&
            completeRef.current &&
            completeRef.current.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
            });
    };

    const downloadConfigFile = () => {
        const element = document.createElement('a');
        const file = new Blob(getExportFileSectionInfo(answers), {
            type: 'text/plain',
        });
        element.href = URL.createObjectURL(file);
        element.download = 'su2_config.cfg';
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div className='wizard_completed' ref={completeRef}>
            <h1>Congratulations! You have finished the wizard</h1>
            <p>Now, you can download the config file or send it to a su2 server</p>
            <div className='wizard_completed__actions'>
                <Button onClick={downloadConfigFile}>Download config file</Button>
                <Button disabled>Send to a su2 server</Button>
            </div>
        </div>
    );
};
