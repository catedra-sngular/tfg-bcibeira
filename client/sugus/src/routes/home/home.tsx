import './home.scss';
import { Slider } from '../../components/common/slider/slider';
import { ConnectionProps } from '../../interfaces/connection-props';
import { useEffect } from 'react';
import { updateConnectionStatus } from '../../helpers/update-connection-status';

interface HomeProps {
    props: ConnectionProps;
}

function Home({ props }: HomeProps) {
    useEffect(() => {
        updateConnectionStatus(props);
    }, []);

    return <Slider connectionState={props.connectionState}></Slider>;
}

export default Home;
