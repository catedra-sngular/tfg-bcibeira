import './home.scss';
import { Slider } from '../../components/common/slider/slider';
import { ConnectionProps } from '../../interfaces/connection-props';

function Home(props: ConnectionProps) {
    return (
        <>
            {/* <div className='greeting'>
                <h1 className='greeting__title'>Welcome to Su2uS</h1>

                <p className='greeting__subtitle'>We help you to manage SU2 config files</p>
                <p className='greeting__subtitle'>
                    Optionaly you can send it to a server and wait for receiving reponses
                </p>
            </div> */}

            <Slider connectionState={props.connectionState}></Slider>
            {/* <div className='home__su2'>
                <h1 className='home__su2__title'>Welcome to Su2uS</h1>
                <div style={{ display: 'flex' }}>
                    <div className='home__su2__content' style={{ width: '80%', margin: 'auto' }}>
                        <div>
                            <p className='home__su2__content__description'>
                                We help you to manage SU2 config files Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Iure esse dolore inventore illo enim
                                nostrum suscipit officiis. Possimus aut nemo id dicta debitis
                                molestias reiciendis rerum facere odio culpa praesentium voluptate
                                saepe aliquid accusantium tempore, minima maiores aliquam,
                                perspiciatis, ipsam molestiae repellat quo. Est ratione ut aliquid
                                officia quis quidem fugiat optio cumque, molestiae repudiandae
                                provident exercitationem, corporis placeat voluptates unde
                                distinctio nobis sint ab impedit. Placeat dolores perspiciatis,
                                accusamus dolorum in neque odit, repellat id rerum quas iure esse
                                voluptate eos minus reiciendis assumenda laborum quos, facere labore
                                aliquam unde voluptatibus. Ipsum fugiat, debitis totam tempora
                                blanditiis dolor atque?
                            </p>

                            <a
                                href='https://su2foundation.org/'
                                className='home__su2__content__button'
                                target='_blank'
                                rel='noreferrer'
                            >
                                <span>Get Started!</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className='home__su2'>
                <h1 className='home__su2__title'>SU2</h1>
                <div style={{ display: 'flex' }}>
                    <img className='home__su2__img' src='/assets/logoSU2.png' alt='Home' />
                    <div className='home__su2__content'>
                        <div>
                            <p className='home__su2__content__description'>
                                SU2 is a suite of open-source software tools written in C++ for the
                                numerical solution of partial differential equations (PDE) and
                                performing PDE-constrained optimization. The primary applications
                                are computational fluid dynamics and aerodynamic shape
                                optimization,[2] but has been extended to treat more general
                                equations such as electrodynamics and chemically reacting flows. SU2
                                supports continuous and discrete adjoint for calculating the
                                sensitivities/gradients of a scalar field.
                            </p>
                            <a
                                href='https://su2foundation.org/'
                                className='home__su2__content__button'
                                target='_blank'
                                rel='noreferrer'
                            >
                                <span>More information</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default Home;
