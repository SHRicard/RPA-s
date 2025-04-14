export interface Process {
    name: string;
    steps: string[];
    frequency: string;
    dataTypes: string[];
    workflow: string[];
    integrations: string[];
    automatedActions: string[];
}

export interface IBots {
    id: string;
    name: string;
    type: string;
    status: string;
    processes: Process;
    version?: string;
    createdAt?: string;
    lastUpdate?: string;
    creator?: string;
    lastActivity?: string;
    language?: string;
    description?: string;
}
