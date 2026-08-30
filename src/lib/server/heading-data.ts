import {
	DateInput,
	Heading,
	HeadingId,
	HeadingParams,
	InputTypeOptions,
	NumberInput,
	PolicyType,
	SelectInput,
	SelectOption,
	SelectTypeOptions,
	TextInput
} from '$lib/types';

export const headings: Heading[] = [
	new Heading(HeadingId.Client, new HeadingParams('CLIENT'), { inputClass: TextInput }),
	new Heading(HeadingId.PolicyNumber, new HeadingParams('POLICY NUMBER'), {
		inputClass: TextInput
	}),
	new Heading(HeadingId.Insurer, new HeadingParams('INSURER'), { inputClass: TextInput }),
	new Heading(HeadingId.Inception, new HeadingParams('INCEPTION'), { inputClass: DateInput }),
	new Heading(HeadingId.Type, new HeadingParams('Type'), {
		inputClass: SelectInput,
		inputClassParams: new SelectTypeOptions([
			new SelectOption(PolicyType.PolicyTransfer, PolicyType.PolicyTransfer),
			new SelectOption(PolicyType.NewBusiness, PolicyType.NewBusiness),
			new SelectOption(PolicyType.BrokerAppointment, PolicyType.BrokerAppointment)
		])
	}),
	new Heading(HeadingId.Premium, new HeadingParams('PREMIUM'), {
		inputClass: NumberInput,
		inputClassParams: new InputTypeOptions('R')
	}),
	new Heading(HeadingId.Commission, new HeadingParams('COMMISSION'), {
		inputClass: NumberInput,
		inputClassParams: new InputTypeOptions('R')
	}),
	new Heading(HeadingId.Split, new HeadingParams('SPLIT'), { inputClass: TextInput })
];
