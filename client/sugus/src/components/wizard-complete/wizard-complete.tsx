import { useEffect, useRef, useState } from 'react';
import { Answer } from '../../interfaces/answer';
import { getExportFileSectionInfo } from '../../mocks/questions.mock';
import './wizard-complete.scss';
import Button from 'react-bootstrap/Button';
import { ConnType } from '../../interfaces/connection-type';
import { ConnectionProps } from '../../interfaces/connection-props';
import { NavLink } from 'react-router-dom';

interface WizardCompleteProps {
    answers: Answer[];
    state: ConnectionProps;
}

export const WizardComplete = ({ answers, state }: WizardCompleteProps) => {
    const [connectionStatus, setConnectionStatus] = useState<ConnType>();
    const completeRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (state.connectionState.user && state.connectionState.address) {
            setConnectionStatus(ConnType.OPEN);
        } else {
            setConnectionStatus(ConnType.CLOSE);
        }
    }, [state.connectionState]);

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

    const redirectToSend = () => {
        console.log('abv');
        const element = document.createElement('a');
        const fileBlob = new Blob(getExportFileSectionInfo(answers), {
            type: 'text/plain',
        });
        const file = new File([fileBlob], 'su2_config.cfg');
        state.connectionState.setConfigFile(file);
    };

    return (
        <>
            <div className='wizard_completed' ref={completeRef}>
                <h1>Congratulations! You have finished the wizard</h1>
                <p>Now, you can download the config file or send it to a su2 server</p>
                <div className='wizard_completed__actions'>
                    <Button onClick={downloadConfigFile}>Download config file</Button>
                    <Button disabled={connectionStatus === ConnType.CLOSE} onClick={redirectToSend}>
                        <NavLink className='redirect' to={'/server/messages'}>
                            Send to a su2 server
                        </NavLink>
                    </Button>
                </div>
            </div>
        </>
    );
};
