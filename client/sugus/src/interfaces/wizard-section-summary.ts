export interface WizardSectionSummaryItem {
    name: string;
    title: string;
    questionNames: string[];
}

export interface WizardSectionSummary {
    sections: WizardSectionSummaryItem[];
}
