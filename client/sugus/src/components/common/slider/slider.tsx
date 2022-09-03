import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ConnectionProps } from '../../../interfaces/connection-props';
import './slider.scss';

export const Slider = (props: ConnectionProps) => {
    const isConnected = () => {
        return !!props.connectionState.user && !!props.connectionState.address;
    };

    return (
        <Carousel className='slider'>
            <Carousel.Item>
                <div className='slider__item'>
                    <div className='slider__item__img'>
                        <img
                            className='slider__item__img__first-item'
                            src='/assets/logoSU2.png'
                            alt='Home'
                        />
                    </div>

                    <Carousel.Caption>
                        <div className='slider__item__caption'>
                            <h1 className='slider__item__caption__title '>SU2</h1>
                            <p className='slider__item__caption__description'>
                                SU2 is a suite of open-source software tools written in C++ for the
                                numerical solution of partial differential equations (PDE) and
                                performing PDE-constrained optimization. The primary applications
                                are computational fluid dynamics and aerodynamic shape optimization,
                                but has been extended to treat more general equations such as
                                electrodynamics and chemically reacting flows. SU2 supports
                                continuous and discrete adjoint for calculating the
                                sensitivities/gradients of a scalar field.
                            </p>
                            <a
                                href='https://su2foundation.org/'
                                className='slider__item__caption__button'
                                target='_blank'
                                rel='noreferrer'
                            >
                                <span>More information</span>
                            </a>
                        </div>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>

            <Carousel.Item>
                <div className='slider__item'>
                    <div className='slider__item__img'>
                        <img
                            className='slider__item__img__second-item'
                            src='/assets/wifi.png'
                            alt='Home'
                        />
                    </div>

                    <Carousel.Caption>
                        <div className='slider__item__caption'>
                            <h1 className='slider__item__caption__title'>Connection</h1>
                            <p className='slider__item__caption__description'>
                                Manages server connection.
                            </p>
                            <Link to='/server/connection' className='slider__item__caption__button'>
                                <span>Change Connection</span>
                            </Link>
                        </div>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>

            <Carousel.Item>
                <div className='slider__item'>
                    <div className='slider__item__img'>
                        <img
                            className='slider__item__img__third-item'
                            src='/assets/transfer.png'
                            alt='Tranfer file'
                        />
                    </div>

                    <Carousel.Caption>
                        <div className='slider__item__caption'>
                            <h1 className='slider__item__caption__title'>Transfer Files</h1>
                            <p className='slider__item__caption__description'>
                                Sends files to a server and launch SU2
                            </p>
                            {!isConnected() && (
                                <div className='slider__item__caption__button--disabled'>
                                    <span>Send Files</span>
                                </div>
                            )}
                            {isConnected() && (
                                <Link
                                    to='/server/messages'
                                    className='slider__item__caption__button'
                                >
                                    <span>Send Files</span>
                                </Link>
                            )}
                        </div>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>

            <Carousel.Item>
                <div className='slider__item'>
                    <div className='slider__item__img'>
                        <img
                            className='slider__item__img__fourth-item'
                            src='/assets/wizard.png'
                            alt='Create file'
                        />
                    </div>

                    <Carousel.Caption>
                        <div className='slider__item__caption'>
                            <h1 className='slider__item__caption__title'>Create a config file</h1>
                            <p className='slider__item__caption__description'>
                                Creates a new config file helped by a wizard
                            </p>
                            <Link to='/wizard/create' className='slider__item__caption__button'>
                                <span>Create Config File</span>
                            </Link>
                        </div>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>

            <Carousel.Item>
                <div className='slider__item'>
                    <div className='slider__item__img'>
                        <img
                            className='slider__item__img__fifth-item'
                            src='/assets/save.png'
                            alt='Create file'
                        />
                    </div>

                    <Carousel.Caption>
                        <div className='slider__item__caption'>
                            <h1 className='slider__item__caption__title'>Upload File</h1>
                            <p className='slider__item__caption__description'>
                                {'Uploads & edits a config file'}
                            </p>
                            <Link to='/wizard/continue' className='slider__item__caption__button'>
                                <span>Upload File</span>
                            </Link>
                        </div>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
        </Carousel>
    );
};
