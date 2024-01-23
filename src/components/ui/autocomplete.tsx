'use client';
import {
	AsyncSelect,
	type AsyncProps,
	type GroupBase,
} from 'chakra-react-select';
import { forwardRef, useId } from 'react';

export const Autocomplete = forwardRef(
	<
		Option,
		IsMulti extends boolean = false,
		GroupType extends GroupBase<Option> = GroupBase<Option>
	>(
		props: AsyncProps<Option, IsMulti, GroupType>,
		ref: any
	) => {
		const id = useId();

		return (
			<AsyncSelect
				{...props}
				ref={ref}
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
);

Autocomplete.displayName = 'Autocomplete';
