import { CONFIG_DATA } from './../samples/config_data';
import { slowCypressDown } from 'cypress-slow-down';


slowCypressDown(300)

describe('New empty wizard', () => {

    describe('Start new wizard', () => {
        it('Visits SU2US page', () => {
            cy.visit('http://localhost:3000/')
        })

        it('Loads home page', () => {
            cy.get('[data-cy=slider]')
            cy.get('[data-cy=navbar]')
        })

        it('Start wizard', () => {
            cy.get('[data-cy=dropdown-button]').contains('Wizard').click()
            cy.get('[data-cy=dropdown-submenu-link]').contains('New Wizard').click()
        })
    })

    describe('Solver type page', () => {

        describe('Renders page', () => {
            it('Page title', () => {
                cy.contains('Solver type')
            })
        })

        describe('Goberning equations', () => {
            it('Physical governing equations', () => {
                cy.get('[data-cy=SOLVER]').contains('RANS').click()
                cy.get('[data-cy=answer-summary-item]').contains('SOLVER: RANS')
            })

            it('Kind of turbulence model', () => {
                cy.get('[data-cy=KIND_TURB_MODEL]').contains('Spalart-Allmaras (SA)').click()
                cy.get('[data-cy=answer-summary-item]').contains('KIND_TURB_MODEL: SA')
            })
        })

        describe('Time-domain problems', () => {
            it('Type of problem', () => {
                cy.get('[data-cy=TIME_DOMAIN]').contains('Steady-state').click()
                cy.get('[data-cy=answer-summary-item]').contains('TIME_DOMAIN: NO')
            })
        })

        describe('Next page', () => {
            it('Next section', () => {
                cy.get('[data-cy=next-section-button]').click()
            })
        })
    })

    describe('Problem Input page', () => {

        describe('Renders page', () => {
            it('Page title', () => {
                cy.contains('Problem Input')
            })
        })

        describe('Definition of the phisical domain', () => {
            it('Format of the mesh file', () => {
                cy.get('[data-cy=MESH_FORMAT]').contains('SU2 Native format').click()
                cy.get('[data-cy=answer-summary-item]').contains('MESH_FORMAT: SU2')
            })

            it('Mesh filename', () => {
                cy.get('[data-cy=MESH_FILENAME-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('MESH_FILENAME: mesh.su2')
            })
        })

        describe('Initialization', () => {
            it('Restart solution', () => {
                cy.get('[data-cy=RESTART_SOL]').contains('NO').click()
                cy.get('[data-cy=answer-summary-item]').contains('RESTART_SOL: NO')
            })
        })

        describe('Next page', () => {
            it('Next section', () => {
                cy.get('[data-cy=next-section-button]').click()
            })
        })
    })

    describe('Problem variables page', () => {

        describe('Renders page', () => {
            it('Page title', () => {
                cy.contains('Problem variables')
            })
        })

        describe('Free-Stream definition', () => {
            it('Mach number', () => {
                cy.get('[data-cy=MACH_NUMBER]').type('0.2')
                cy.get('[data-cy=MACH_NUMBER-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('MACH_NUMBER: 0.2')
            })

            it('Angle of attack', () => {
                cy.get('[data-cy=AOA-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('AOA: 0')
            })

            it('Side-slip angle', () => {
                cy.get('[data-cy=SIDESLIP_ANGLE-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('SIDESLIP_ANGLE: 0')
            })

            it('Free-stream pressure', () => {
                cy.get('[data-cy=FREESTREAM_PRESSURE-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('FREESTREAM_PRESSURE: 101325')
            })

            it('Free-stream temperature', () => {
                cy.get('[data-cy=FREESTREAM_TEMPERATURE-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('FREESTREAM_TEMPERATURE: 273.15')
            })

            it('Reynolds number', () => {
                cy.get('[data-cy=REYNOLDS_NUMBER-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('REYNOLDS_NUMBER: 1000000')
            })

            it('Length for Reynolds number calculation', () => {
                cy.get('[data-cy=REYNOLDS_LENGTH-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('REYNOLDS_LENGTH: 1')
            })
        })

        describe('Reference value', () => {
            it('X reference origin', () => {
                cy.get('[data-cy=REF_ORIGIN_MOMENT_X-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('REF_ORIGIN_MOMENT_X: 0.25')
            })

            it('Y reference origin', () => {
                cy.get('[data-cy=REF_ORIGIN_MOMENT_Y-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('REF_ORIGIN_MOMENT_Y: 0')
            })

            it('Z reference origin', () => {
                cy.get('[data-cy=REF_ORIGIN_MOMENT_Z-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('REF_ORIGIN_MOMENT_Z: 0')
            })

            it('Reference length', () => {
                cy.get('[data-cy=REF_LENGTH-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('REF_LENGTH: 1')
            })

            it('Reference area', () => {
                cy.get('[data-cy=REF_AREA-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('REF_AREA: 1')
            })

            describe('Next page', () => {
                it('Next section', () => {
                    cy.get('[data-cy=next-section-button]').click()
                })
            })
        })

    })

    describe('Boundary conditions page', () => {

        describe('Renders page', () => {
            it('Page title', () => {
                cy.contains('Boundary conditions')
            })
        })

        describe('Boundary conditions', () => {
            it('Boundary conditions', () => {
                cy.get('[data-cy=boundary-conditions-selection]').contains('Heatflux wall').click()
                cy.get('[data-cy=boundary-conditions-selection]').contains(/^Inlet$/).click()
                cy.get('[data-cy=boundary-conditions-selection]').contains('Outlet').click()
                cy.get('[data-cy=boundary-conditions-selection]').contains('Symmetry').click()
                cy.get('[data-cy=boundary-conditions-selection-send-value]').click()
                cy.contains('MARKER_HEATFLUX, MARKER_INLET, MARKER_OUTLET, MARKER_SYM')
            })
        })

        describe('Heatflux boundary', () => {
            it('Heatflux boundary', () => {
                cy.get('[data-cy=MARKER_HEATFLUX]').type('( wall, 0.0 )')
                cy.get('[data-cy=MARKER_HEATFLUX-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('MARKER_HEATFLUX: ( wall, 0.0 )')
            })
        })

        describe('Inlet boundary conditions', () => {
            it('Inlet marker list', () => {
                cy.get('[data-cy=MARKER_INLET]').type('( inlet, 288.6, 102010.0, 1.0, 0.0, 0.0 )')
                cy.get('[data-cy=MARKER_INLET-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains(
                    'MARKER_INLET: ( inlet, 288.6, 102010.0, 1.0, 0.0, 0.0 )'
                )
            })

            it('Outlet marker list', () => {
                cy.get('[data-cy=MARKER_OUTLET]').type('( outlet, 101300.0 )')
                cy.get('[data-cy=MARKER_OUTLET-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains(
                    'MARKER_OUTLET: ( outlet, 101300.0 )'
                )
            })

            it('Symmetry marker list', () => {
                cy.get('[data-cy=MARKER_SYM]').type('( symmetry )')
                cy.get('[data-cy=MARKER_SYM-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains(
                    'MARKER_SYM: ( symmetry )'
                )
            })
        })

        describe('Next page', () => {
            it('Next section', () => {
                cy.get('[data-cy=next-section-button]').click()
            })
        })
    })

    describe('Solution strategy page', () => {

        describe('Renders page', () => {
            it('Page title', () => {
                cy.contains('Solution strategy')
            })
        })

        describe('Flow numerics', () => {
            it('Numerical method', () => {
                cy.get('[data-cy=NUM_METHOD_GRAD]').contains(
                    'Inverse-distance weighted least squares'
                ).click()
                cy.get('[data-cy=answer-summary-item]').contains(
                    'NUM_METHOD_GRAD: WEIGHTED_LEAST_SQUARES'
                )
            })

            it('CFL Number', () => {
                cy.get('[data-cy=CFL_NUMBER-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('CFL_NUMBER: 15')
            })

            it('Adaptative CFL', () => {
                cy.get('[data-cy=CFL_ADAPT]').contains('Yes').click()
                cy.get('[data-cy=answer-summary-item]').contains('CFL_ADAPT: YES')
            })

            it('Adaptation parameters', () => {
                cy.get('[data-cy=CFL_ADAPT_PARAM-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains(
                    'CFL_ADAPT_PARAM: ( 0.1, 2.0, 50.0, 1e10 )'
                )
            })

            it('Maximum local dt', () => {
                cy.get('[data-cy=MAX_DELTA_TIME-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('MAX_DELTA_TIME: 1000000')
            })

            it('Runge-Kutta alpha coefficients', () => {
                cy.get('[data-cy=RK_ALPHA_COEFF-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains(
                    'RK_ALPHA_COEFF: ( 0.66667, 0.66667, 1.000000 )'
                )
            })
        })

        describe('Slope limiter', () => {
            it("Coefficient for the Venkat's limiter", () => {
                cy.get('[data-cy=VENKAT_LIMITER_COEFF-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('VENKAT_LIMITER_COEFF: 0.1')
            })
        })

        describe('Multi-grid strategy', () => {
            it('Multigrid level', () => {
                cy.get('[data-cy=MGLEVEL-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('MGLEVEL: 0')
            })
        })

        describe('Convective methods for the flow', () => {
            it('Convective numerical method', () => {
                cy.get('[data-cy=CONV_NUM_METHOD_FLOW]').contains('Roe').click()
                cy.get('[data-cy=answer-summary-item]').contains('CONV_NUM_METHOD_FLOW: ROE')
            })

            it('MUSCL', () => {
                cy.get('[data-cy=MUSCL_FLOW]').contains('YES').click()
                cy.get('[data-cy=answer-summary-item]').contains('MUSCL_FLOW: YES')
            })

            it('Slope limiter', () => {
                cy.get('[data-cy=SLOPE_LIMITER_FLOW]').contains('None').click()
                cy.get('[data-cy=answer-summary-item]').contains('SLOPE_LIMITER_FLOW: NONE')
            })

            it('Time discretization', () => {
                cy.get('[data-cy=TIME_DISCRE_FLOW]').contains('Implicit').click()
                cy.get('[data-cy=answer-summary-item]').contains('TIME_DISCRE_FLOW: EULER_IMPLICIT')
            })
        })

        describe('Convective methods for turbulence', () => {
            it('Convective numerical method', () => {
                cy.get('[data-cy=CONV_NUM_METHOD_TURB]').contains('Scalar upwind').click()
                cy.get('[data-cy=answer-summary-item]').contains('CONV_NUM_METHOD_TURB: SCALAR_UPWIND')
            })

            it('MUSCL', () => {
                cy.get('[data-cy=MUSCL_TURB]').contains('NO').click()
                cy.get('[data-cy=answer-summary-item]').contains('MUSCL_TURB: NO')
            })

            it('Slope limiter', () => {
                cy.get('[data-cy=SLOPE_LIMITER_TURB]').contains('VENKATAKRISHNAN').click()
                cy.get('[data-cy=answer-summary-item]').contains('SLOPE_LIMITER_TURB: VENKATAKRISHNAN')
            })

            it('Time discretization', () => {
                cy.get('[data-cy=TIME_DISCRE_TURB]').contains('Implicit').click()
                cy.get('[data-cy=answer-summary-item]').contains('TIME_DISCRE_TURB: EULER_IMPLICIT')
            })
        })

        describe('Next page', () => {
            it('Next section', () => {
                cy.get('[data-cy=next-section-button]').click()
            })
        })
    })

    describe('Solution control page', () => {

        describe('Renders page', () => {
            it('Page title', () => {
                cy.contains('Solution control')
            })
        })

        describe('Iterative solution', () => {
            it('Maximum number of iterations', () => {
                cy.get('[data-cy=ITER]').type('30')
                cy.get('[data-cy=ITER-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('ITER: 30')
            })
        })

        describe('Linear solver', () => {
            it('Linear solver', () => {
                cy.get('[data-cy=LINEAR_SOLVER]').contains('FGMRES').click()
                cy.get('[data-cy=answer-summary-item]').contains('LINEAR_SOLVER: FGMRES')
            })

            it('Linear solver preconditioner', () => {
                cy.get('[data-cy=LINEAR_SOLVER_PREC]').contains('ILU(k)').click()
                cy.get('[data-cy=answer-summary-item]').contains('LINEAR_SOLVER_PREC: ILU')
            })

            it('k for ILU(k)', () => {
                cy.get('[data-cy=LINEAR_SOLVER_ILU_FILL_IN-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('LINEAR_SOLVER_ILU_FILL_IN: 0')
            })

            it('Linear solver error', () => {
                cy.get('[data-cy=LINEAR_SOLVER_ERROR-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('LINEAR_SOLVER_ERROR: 0.00001')
            })

            it('Maximum number of linear solver iterations', () => {
                cy.get('[data-cy=LINEAR_SOLVER_ITER-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('LINEAR_SOLVER_ITER: 2')
            })
        })

        describe('Convergence parameters', () => {
            it('Convergence monitoring field', () => {
                cy.get('[data-cy=CONV_FIELD]').contains('Drag').click()
                cy.get('[data-cy=CONV_FIELD-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('CONV_FIELD: CD')
            })

            it('Log10 of the residual minimum value', () => {
                cy.get('[data-cy=CONV_RESIDUAL_MINVAL-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('CONV_RESIDUAL_MINVAL: -8')
            })

            it('Start checking convergence at iteration', () => {
                cy.get('[data-cy=CONV_STARTITER-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('CONV_STARTITER: 10')
            })
        })

        describe('Non-dimensionalizatioon', () => {
            it('Non-dimensional models', () => {
                cy.get('[data-cy=REF_DIMENSIONALIZATION]').contains('Dimensional simulation').click()
                cy.get('[data-cy=answer-summary-item]').contains('REF_DIMENSIONALIZATION: DIMENSIONAL')
            })
        })

        describe('Next page', () => {
            it('Next section', () => {
                cy.get('[data-cy=next-section-button]').click()
            })
        })
    })

    describe('Solution output page', () => {

        describe('Renders page', () => {
            it('Page title', () => {
                cy.contains('Solution output')
            })
        })

        describe('Output files', () => {
            it('ITEM', () => {
                cy.get('[data-cy=OUTPUT_FILES]').contains('History').click()
                cy.get('[data-cy=OUTPUT_FILES-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('OUTPUT_FILES: CSV')
            })

            it('Output frecuency for files', () => {
                cy.get('[data-cy=OUTPUT_WRT_FREQ]').type('1')
                cy.get('[data-cy=OUTPUT_WRT_FREQ-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('OUTPUT_WRT_FREQ: 1')
            })
        })

        describe('Marker output', () => {
            it('Markers to be ploted', () => {
                cy.get('[data-cy=MARKER_PLOTTING]').type('( wall )')
                cy.get('[data-cy=MARKER_PLOTTING-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('MARKER_PLOTTING: ( wall )')
            })

            it('Markers to be monitored', () => {
                cy.get('[data-cy=MARKER_MONITORING]').type('( wall )')
                cy.get('[data-cy=MARKER_MONITORING-send-value]').click()
                cy.get('[data-cy=answer-summary-item]').contains('MARKER_MONITORING: ( wall )')
            })
        })
    })

    describe('Compare solution', () => {
        describe('Renders finish message', () => {
            it('Page title', () => {
                cy.contains('Congratulations! You have finished the wizard')
            })
        })

        describe('Download', () => {
            it('Verify oputput file', () => {
                cy.contains('Download config file').click()
                cy.readFile('cypress/downloads/su2_config.cfg').should('eq', CONFIG_DATA)
            })
        })
    })
})


