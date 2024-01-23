'use client';
import {
	AsyncSelect,
	type AsyncProps,
	type GroupBase,
} from 'chakra-react-select';
import { useId } from 'react';

export function Autocomplete<
	OptionType,
	IsMulti extends boolean = false,
	GroupType extends GroupBase<OptionType> = GroupBase<OptionType>
>(props: AsyncProps<OptionType, IsMulti, GroupType>) {
	const id = useId();

	return (
		<AsyncSelect
			{...props}
			instanceId={`react-select-${id}`}
			closeMenuOnSelect={false}
			//  the menu will close when there are no more options to select from.
			noOptionsMessage={() => null}
			components={{
				DropdownIndicator: null,
				// Do NOT show the selected option value.
				SingleValue: () => null,
			}}
			chakraStyles={{
				inputContainer: (provided) => ({
					...provided,
					display: 'block',
					':after': {
						display: 'none',
					},
				}),
			}}
		/>
	);
}
