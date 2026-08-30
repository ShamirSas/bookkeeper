import {
	DateInput,
	NumberInput,
	SelectInput,
	TextInput,
	type IInputTypeOptions,
	type InputType,
	type ISelectTypeOptions
} from './input';

type InputConfig<T = unknown> =
	| { inputClass: typeof TextInput; inputClassParams?: IInputTypeOptions }
	| { inputClass: typeof NumberInput; inputClassParams?: IInputTypeOptions }
	| { inputClass: typeof DateInput; inputClassParams?: never }
	| { inputClass: typeof SelectInput<T>; inputClassParams: ISelectTypeOptions<T> };

interface IHeading {
	id: string;
	text: string;
	value: unknown;
	description?: string;
	input: InputType;
}

export class HeadingParams {
	text: string;
	description?: string;

	constructor(text: string, description?: string) {
		this.text = text;
		this.description = description;
	}
}

export class Heading<ValueType = unknown, SelectOptionsType = unknown> implements IHeading {
	id: HeadingId;
	text: string;
	value: ValueType | undefined;
	description?: string;
	input: InputType;

	constructor(id: HeadingId, options: HeadingParams, config: InputConfig<SelectOptionsType>) {
		this.id = id;
		this.text = options.text;
		this.description = options.description;
		this.input = this.createInputType(this.id, config);
	}

	createInputType(id: string, config: InputConfig<SelectOptionsType>): InputType {
		const { inputClass, inputClassParams } = config;
		if (inputClass === DateInput) return new DateInput(id);
		if (inputClass === SelectInput)
			return new SelectInput(id, inputClassParams as ISelectTypeOptions);
		if (inputClass === NumberInput)
			return new NumberInput(id, inputClassParams as IInputTypeOptions);
		return new TextInput(id, inputClassParams as IInputTypeOptions);
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
