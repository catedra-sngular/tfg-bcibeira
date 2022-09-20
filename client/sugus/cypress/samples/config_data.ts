export const CONFIG_DATA = `

% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 
% FAMILY: Solver type
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


% ---------------------- GROUP: Governing equations ----------------------
% Physical governing equations
SOLVER = RANS
% Kind of turbulence model
KIND_TURB_MODEL = SA

% ---------------------- GROUP: Time-domain problems ----------------------
% Type of problem
TIME_DOMAIN = NO


% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 
% FAMILY: Problem Input
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


% ---------------------- GROUP: Definition of the physical domain ----------------------
% Format of the mesh file
MESH_FORMAT = SU2
% Mesh filename
MESH_FILENAME = mesh.su2

% ---------------------- GROUP: Initialization ----------------------
% Restart from a previously computed solution
RESTART_SOL = NO


% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 
% FAMILY: Problem variables
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


% ---------------------- GROUP: Free-Stream Definition for compressible problems ----------------------
% Mach number (non-dimensional, based on the free-stream values)
MACH_NUMBER = 0.2
% Angle of attack (degrees)
AOA = 0
% Side-slip angle (degrees)
SIDESLIP_ANGLE = 0
% Free-stream pressure (N/m^2)
FREESTREAM_PRESSURE = 101325
% Free-stream temperature (K)
FREESTREAM_TEMPERATURE = 273.15
% Reynolds number
REYNOLDS_NUMBER = 1000000
% Length for Reynolds number calculation (m)
REYNOLDS_LENGTH = 1

% ---------------------- GROUP: Reference value ----------------------
% X Reference origin for moment computation
REF_ORIGIN_MOMENT_X = 0.25
% Y Reference origin for moment computation
REF_ORIGIN_MOMENT_Y = 0
% Z Reference origin for moment computation
REF_ORIGIN_MOMENT_Z = 0
% Reference length for pitching, rolling, and yawing non-dimensional moment
REF_LENGTH = 1
% Reference area for force coefficients
REF_AREA = 1


% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 
% FAMILY: Boundary conditions
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


% ---------------------- GROUP: boundary-conditions-selection-group ----------------------
% Choose the boundary conditions
% SU2US INTERNAL QUESTION: boundary-conditions-selection = MARKER_HEATFLUX, MARKER_INLET, MARKER_OUTLET, MARKER_SYM

% ---------------------- GROUP: Heatflux boundary ----------------------
% Heatflux boundary
MARKER_HEATFLUX = ( wall, 0.0 )

% ---------------------- GROUP: Inlet boundary conditions ----------------------
% Inlet marker list
MARKER_INLET = ( inlet, 288.6, 102010.0, 1.0, 0.0, 0.0 )
% Outlet marker list
MARKER_OUTLET = ( outlet, 101300.0 )
% Symmetry marker list
MARKER_SYM = ( symmetry )


% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 
% FAMILY: Solution strategy
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


% ---------------------- GROUP: Flow numerics ----------------------
% Numerical method for spatial gradients
NUM_METHOD_GRAD = WEIGHTED_LEAST_SQUARES
% CFL Number
CFL_NUMBER = 15
% Adaptive CFL
CFL_ADAPT = YES
% Adaptation parameters
CFL_ADAPT_PARAM = ( 0.1, 2.0, 50.0, 1e10 )
% Maximum local dt in local time stepping simulations
MAX_DELTA_TIME = 1000000
% Runge-Kutta alpha coefficients
RK_ALPHA_COEFF = ( 0.66667, 0.66667, 1.000000 )

% ---------------------- GROUP: Slope limiter ----------------------
% Coefficient for the Venkat's limiter
VENKAT_LIMITER_COEFF = 0.1

% ---------------------- GROUP: Multi-grid strategy ----------------------
% Multigrid level
MGLEVEL = 0

% ---------------------- GROUP: Convective methods for the flow ----------------------
% Convective numerical method
CONV_NUM_METHOD_FLOW = ROE
% Monotonic Upwind Scheme for Conservation Laws (MUSCL)
MUSCL_FLOW = YES
% Slope limiter
SLOPE_LIMITER_FLOW = NONE
% Time discretization
TIME_DISCRE_FLOW = EULER_IMPLICIT

% ---------------------- GROUP: Convective methods for turbulence ----------------------
% Convective numerical method
CONV_NUM_METHOD_TURB = SCALAR_UPWIND
% Monotonic Upwind Scheme for Conservation Laws (MUSCL)
MUSCL_TURB = NO
% Slope limiter
SLOPE_LIMITER_TURB = VENKATAKRISHNAN
% Time discretization
TIME_DISCRE_TURB = EULER_IMPLICIT


% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 
% FAMILY: Solution control
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


% ---------------------- GROUP: Iterative solution ----------------------
% Maximum number of iterations to converge the steady problem
ITER = 30

% ---------------------- GROUP: Linear solver ----------------------
% Linear solver
LINEAR_SOLVER = FGMRES
% Linear solver preconditioner
LINEAR_SOLVER_PREC = ILU
% k for ILU(k)
LINEAR_SOLVER_ILU_FILL_IN = 0
% Linear solver error
LINEAR_SOLVER_ERROR = 0.00001
% Maximum number of linear solver iterations
LINEAR_SOLVER_ITER = 2

% ---------------------- GROUP: Convergence parameters ----------------------
% Convergence monitoring field
CONV_FIELD = CD
% Log10 of the residual minimum value
CONV_RESIDUAL_MINVAL = -8
% Start checking convergence at iteration
CONV_STARTITER = 10

% ---------------------- GROUP: Non-dimensionalization ----------------------
% Non-dimensional models
REF_DIMENSIONALIZATION = DIMENSIONAL


% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 
% FAMILY: Solution output
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


% ---------------------- GROUP: Output files ----------------------
% ITEM
OUTPUT_FILES = CSV
% Output frequency for files
OUTPUT_WRT_FREQ = 1

% ---------------------- GROUP: Marker output ----------------------
% Markers to be plotted
MARKER_PLOTTING = ( wall )
% Markers to be monitored
MARKER_MONITORING = ( wall )
`;