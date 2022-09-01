import { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';

interface ContinueProps {
    handleContinueButton: () => void;
}
export const Continue = (props: ContinueProps) => {
    const { handleContinueButton } = props;
    const continueRef = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        scrollIntoView();
    }, []);

    const scrollIntoView = () => {
        continueRef &&
            continueRef.current &&
            continueRef.current.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
            });
    };

    return (
        <div className='section__buttonset' ref={continueRef}>
            <Button onClick={handleContinueButton} className='section__buttonset__button'>
                Next section
            </Button>
        </div>
    );
};
