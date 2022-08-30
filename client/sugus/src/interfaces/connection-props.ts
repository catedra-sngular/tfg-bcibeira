export interface ConnectionProps {
    connectionState: {
        user: string;
        setUser: React.Dispatch<React.SetStateAction<string>>;
        address: string;
        setAddress: React.Dispatch<React.SetStateAction<string>>;
        configFile: File | undefined;
        setConfigFile: React.Dispatch<React.SetStateAction<File | undefined>>;
        dataLoaded: boolean;
    };
}
