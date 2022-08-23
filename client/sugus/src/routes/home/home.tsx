import './home.scss';
import { Slider } from '../../components/common/slider/slider';

function Home() {
    return (
        <>
            <div className='greeting'>
                <h1>Welcome to Su2uS</h1>

                <p>We help you to manage SU2 config files</p>
                <p>Optionaly you can send it to a server and wait for receiving reponses</p>
            </div>

            <Slider></Slider>
        </>
    );
}

export default Home;
