import { Carousel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './slider.scss';

export const Slider = () => {
    return (
        <Carousel className='slider'>
            <Carousel.Item>
                <a href='https://su2foundation.org/' target='_blank' rel='noreferrer'>
                    <img className='d-block' src='/assets/logoSU2.png' alt='Home' />
                </a>
                <Carousel.Caption>
                    <h3>SU2</h3>
                    <p>SU2 Foundation Page</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <NavLink to='/server/connection'>
                    <img className='d-block' src='/assets/wifi.png' alt='Tranfer file' />
                </NavLink>
                <Carousel.Caption>
                    <h3>Connection</h3>
                    <p>Manage server connection</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <NavLink to='/server/messages'>
                    <img className='d-block' src='/assets/transfer.png' alt='Tranfer file' />
                </NavLink>
                <Carousel.Caption>
                    <h3>Send file to server</h3>
                    <p>Send file and launch SU2</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <NavLink to='/wizard/create'>
                    <img className='d-block' src='/assets/wizard.png' alt='Create file' />
                </NavLink>
                <Carousel.Caption>
                    <h3>Create a config file</h3>
                    <p>Creates a new config file helped by a wizard</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <NavLink to='/wizard/continue'>
                    <img className='d-block' src='/assets/save.png' alt='Create file' />
                </NavLink>
                <Carousel.Caption>
                    <h3>Upload file</h3>
                    <p>{'Upload & edit a file'}</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};
