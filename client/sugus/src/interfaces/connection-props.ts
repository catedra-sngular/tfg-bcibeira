export interface ConnectionProps {
    connectionState: {
        user: string;
        setUser: React.Dispatch<React.SetStateAction<string>>;
        address: string;
        setAddress: React.Dispatch<React.SetStateAction<string>>;
        dataLoaded: boolean;
    };
}
