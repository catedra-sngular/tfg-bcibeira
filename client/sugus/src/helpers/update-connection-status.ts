import axios from 'axios';
import { ConnectionProps } from '../interfaces/connection-props';

const apiUrl: string = process.env.REACT_APP_API_URL as string;

export const updateConnectionStatus = (state: ConnectionProps) => {
    axios
        .get(apiUrl + '/api/v1.0/connection/')
        .then(function (response) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const {
                user,
                address,
            }: {
                user: string;
                address: string;
            } = response.data;

            const newValuesReceived =
                user !== state.connectionState.user || address !== state.connectionState.address;

            if (newValuesReceived) {
                if (user && address) {
                    state.connectionState.setUser(user);
                    state.connectionState.setAddress(address);
                } else {
                    state.connectionState.setUser('');
                    state.connectionState.setAddress('');
                }

                state.connectionState.setStatusChangedOutside(true);
                localStorage.setItem('isConnectionOwner', JSON.stringify(false));
            }
        })
        .catch(function (error) {
            console.log('connection error');
        });
};
