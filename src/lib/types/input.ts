export interface IInputTypeOptions {
	readonly type: 'input';
	prefix?: string;
}

export interface ISelectTypeOptions<T = any> {
	readonly type: 'select';
	selectOptions: ISelectOption<T>[];
}

export type TypeOptions = IInputTypeOptions | ISelectTypeOptions;

type InputTypeString = 'text' | 'number' | 'date' | 'select';

export interface IInputType<T> {
	readonly type: InputTypeString;
	describedBy: string;
	options: T;
}

export class InputTypeOptions implements IInputTypeOptions {
	readonly type: 'input' = 'input';
	prefix?: string | undefined;
	constructor(prefix?: string) {
		this.prefix = prefix;
	}
}

interface ISelectOption<T> {
	value?: T;
	text: string;
}

export class SelectOption<T = unknown> implements ISelectOption<T> {
	value: T | undefined;
	text: string;

	constructor(text: string, value?: T) {
		this.text = text;
		this.value = value;
	}
}

export class SelectTypeOptions<T = any> implements ISelectTypeOptions<T> {
	readonly type: 'select' = 'select';
	selectOptions: ISelectOption<T>[];
	constructor(selectOptions: ISelectOption<T>[]) {
		this.selectOptions = selectOptions;
	}
}

export class InputType implements IInputType<TypeOptions> {
	type: InputTypeString;
	options: TypeOptions;
	#id: string;

	constructor(id: string, type: InputTypeString, options?: TypeOptions) {
		this.type = type;
		this.options = options != null ? options : this.initializeOptions(type);
		this.#id = id;
	}

	get describedBy(): string {
		return this.#id + 'describedBy';
	}

	private initializeOptions<T>(type: InputTypeString) {
		return type === 'select' ? new SelectTypeOptions<T>([]) : new InputTypeOptions();
	}
}

interface ITextInputType extends IInputType<IInputTypeOptions> {
	type: 'text';
}

export class TextInput extends InputType implements ITextInputType {
	declare options: IInputTypeOptions;
	type: 'text' = 'text';
	constructor(id: string, options: IInputTypeOptions) {
		super(id, 'text', options);
	}
}

interface ISelectInputType extends IInputType<ISelectTypeOptions> {
	type: 'select';
}

export class SelectInput<T> extends InputType implements ISelectInputType {
	declare options: ISelectTypeOptions<T>;
	type: 'select' = 'select';
	constructor(id: string, params: ISelectTypeOptions<T>) {
		super(id, 'select', params);
	}
}

interface INumberInputType extends IInputType<IInputTypeOptions> {
	type: 'number';
}

export class NumberInput extends InputType implements INumberInputType {
	declare options: IInputTypeOptions;
	type: 'number' = 'number';
	constructor(id: string, params?: IInputTypeOptions) {
		super(id, 'number', params);
	}
}

interface IDateInputType extends IInputType<IInputTypeOptions> {
	type: 'date';
}

export class DateInput extends InputType implements IDateInputType {
	declare options: IInputTypeOptions;
	type: 'date' = 'date';
	constructor(id: string) {
		super(id, 'date');
	}
}
