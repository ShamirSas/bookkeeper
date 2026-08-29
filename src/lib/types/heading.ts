import type {
	CustomInputTypeConstructorParams,
	DateInput,
	InputType,
	NumberInput,
	TextInput
} from './input';

interface IInputOptions {
	inputClass: typeof TextInput | typeof NumberInput | typeof DateInput;
	inputClassParams?: CustomInputTypeConstructorParams;
}

interface IHeading {
	id: string;
	text: string;
	value: unknown;
	description?: string;
	inputType: InputType;
}

export class HeadingParams {
	text: string;
	description?: string;

	constructor(text: string, description?: string) {
		this.text = text;
		this.description = description;
	}
}

export class Heading<ValueType = unknown> implements IHeading {
	id: HeadingId;
	text: string;
	value: ValueType | undefined;
	description?: string;
	inputType: InputType;

	constructor(
		id: HeadingId,
		options: HeadingParams,
		{ inputClass, inputClassParams }: IInputOptions
	) {
		this.id = id;
		this.text = options.text;
		this.description = options.description;
		this.inputType = new inputClass(id, inputClassParams);
	}
}

export enum HeadingId {
	Client = 'client',
	PolicyNumber = 'policyNumber',
	Insurer = 'insurer',
	Inception = 'inception',
	Type = 'type',
	Premium = 'premium',
	Commission = 'commission',
	Split = 'split'
}
