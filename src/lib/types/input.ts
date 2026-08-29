type InputTypes = 'text' | 'number' | 'date';

interface IInputTypeOptions {
	prefix?: string;
}

class InputTypeOptions implements IInputTypeOptions {
	constructor() {}
}

export interface IInputType {
	type: InputTypes;
	describedBy: string;
	options: IInputTypeOptions;
}

export class InputType implements IInputType {
	type: InputTypes;
	options: IInputTypeOptions;
	#id: string;

	constructor(id: string, type: InputTypes, options?: IInputTypeOptions) {
		this.type = type;
		this.options = options != null ? options : new InputTypeOptions();
		this.#id = id;
	}

	get describedBy(): string {
		return this.#id + 'describedBy';
	}
}

export type CustomInputTypeConstructorParams = {
	prefix?: string;
};

export class TextInput extends InputType {
	constructor(id: string, params?: CustomInputTypeConstructorParams) {
		super(id, 'text', params);
	}
}

export class NumberInput extends InputType {
	constructor(id: string, params?: CustomInputTypeConstructorParams) {
		super(id, 'number', params);
	}
}

export class DateInput extends InputType {
	constructor(id: string) {
		super(id, 'date');
	}
}
