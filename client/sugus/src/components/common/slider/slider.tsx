import { Carousel } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import './slider.scss';

export const Slider = () => {
    return (
        <Carousel className='slider'>
            <Carousel.Item>
                <div className='slider__item'>
                    <img
                        className='slider__item__img first-item'
                        src='/assets/logoSU2.png'
                        alt='Home'
                    />

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
                    <img
                        className='slider__item__img second-item'
                        src='/assets/wifi.png'
                        alt='Home'
                    />

                    <Carousel.Caption>
                        <div className='slider__item__caption'>
                            <h1 className='slider__item__caption__title'>Connection</h1>
                            <p className='slider__item__caption__description'>
                                Manage server connection Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Natus, reiciendis.
                            </p>
                            <Link to='/server/connection' className='slider__item__caption__button'>
                                <span>Set Connection</span>
                            </Link>
                        </div>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>

            <Carousel.Item>
                <NavLink to='/server/messages'>
                    <img
                        className='d-block'
                        style={{ height: '44rem' }}
                        src='/assets/transfer.png'
                        alt='Tranfer file'
                    />
                </NavLink>
                <Carousel.Caption>
                    <h3>Send file to server</h3>
                    <p>Send file and launch SU2</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <NavLink to='/wizard/create'>
                    <img
                        className='d-block'
                        style={{ height: '44rem' }}
                        src='/assets/wizard.png'
                        alt='Create file'
                    />
                </NavLink>
                <Carousel.Caption>
                    <h3>Create a config file</h3>
                    <p>Creates a new config file helped by a wizard</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <NavLink to='/wizard/continue'>
                    <img
                        className='d-block'
                        style={{ height: '44rem' }}
                        src='/assets/save.png'
                        alt='Create file'
                    />
                </NavLink>
                <Carousel.Caption>
                    <h3>Upload file</h3>
                    <p>{'Upload & edit a file'}</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};
