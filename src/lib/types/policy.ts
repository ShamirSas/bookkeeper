import type { HeadingId } from './heading';

export interface PolicyRecord {
	[HeadingId.Client]: string;
	[HeadingId.Commission]: number;
	[HeadingId.Inception]: string;
	[HeadingId.Insurer]: string;
	[HeadingId.PolicyNumber]: string;
	[HeadingId.Premium]: number;
	[HeadingId.Split]: string;
	[HeadingId.Type]: string;
	[x: string]: unknown;
}

export enum PolicyType {
	BrokerAppointment = 'Broker Appointment',
	NewBusiness = 'New Business',
	PolicyTransfer = 'Policy transfer'
}
