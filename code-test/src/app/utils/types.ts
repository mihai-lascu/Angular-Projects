export type Status = {
	action: string;
	dot: 'orange' | 'green';
};

export enum CARD_TYPES {
	StatusReport = 'Status Report',
	Performance = 'Performance',
	PrinterActions = 'Printer Actions',
	JobActions = 'Job Actions',
}

export type Job = {
	printer: string;
	action: string;
	result: string;
};

export type Card = {
	printer: string;
	type: CARD_TYPES;
};

export type Connection = {
	ready: boolean;
	message: string;
};
