import type { HeadingId } from './heading';

export interface PolicyRecord {
	[HeadingId.Client]: string;
	[HeadingId.PolicyNumber]: string;
	[HeadingId.Insurer]: string;
	[HeadingId.Inception]: Date;
	[HeadingId.Type]: string;
	[HeadingId.Premium]: number;
	[HeadingId.Commission]: number;
	[HeadingId.Split]: string;
	[x: string]: unknown;
}
