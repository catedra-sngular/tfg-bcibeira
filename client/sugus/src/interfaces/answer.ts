export type Answer = {
    key: string;
    value: string | number;
    section?: string;
    questionTitle?: string;
    internal?: boolean;
    visibleWhen?: unknown;
};
