'use client';
import {
	AsyncSelect,
	type AsyncProps,
	type GroupBase,
} from 'chakra-react-select';
import { forwardRef, useId } from 'react';

export const Combobox = forwardRef(
	<
		Option = unknown,
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
				cacheOptions
				defaultOptions
				instanceId={`react-select-${id}`}
			/>
		);
	}
);

Combobox.displayName = 'Combobox';
