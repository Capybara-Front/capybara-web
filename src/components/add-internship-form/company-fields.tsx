'use client';
import { getAddress } from '@/api/get-address';
import {
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import { AsyncSelect } from 'chakra-react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';
import { formSchema } from './form-schema';

interface AddressOption {
	value: string;
	label: string;
}

export function CompanyFields() {
	const {
		register,
		formState: { errors },
		control,
	} = useFormContext<z.infer<typeof formSchema>>();

	// 1. Call API
	const handleAddressSearch = useDebouncedCallback(
		(value: string, onSuccess: (data: AddressOption[]) => void) => {
			getAddress(value).then((res: any) => {
				const addresses = res.features.map((address: any) => ({
					label: address.properties.label,
					value: address.properties.label,
				}));

				if (addresses.length > 0) {
					onSuccess(addresses);
				}
			});
		},
		1000
	);

	// 2. Function used by the <AsyncSelect /> to run loading animation.
	const loadOptions = (
		inputValue: string,
		callback: (options: AddressOption[]) => void
	) => {
		if (inputValue.length > 5) {
			handleAddressSearch(inputValue, callback);
		} else {
			// Disable the loading animation
			callback([]);
		}
	};
	return (
		<>
			<FormControl isInvalid={Boolean(errors.company)}>
				<FormLabel htmlFor="company">Company *</FormLabel>
				<Input id="company" {...register('company')} />
				<FormErrorMessage>
					{errors.company && errors.company.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={Boolean(errors.companyAddress)}>
				<FormLabel htmlFor="companyAddress">Address *</FormLabel>
				<Controller
					name="companyAddress"
					control={control}
					render={({ field }) => {
						return (
							<AsyncSelect
								inputId="companyAddress"
								placeholder="Search an address..."
								instanceId={'react-select-companyAddress'}
								closeMenuOnSelect={false}
								loadOptions={loadOptions}
								//  the menu will close when there are no more options to select from.
								noOptionsMessage={() => null}
								components={{
									DropdownIndicator: null,
									// Do NOT show the selected option value.
									SingleValue: () => null,
								}}
								inputValue={field.value}
								onInputChange={(value, action) => {
									// only set the input when the action that caused the
									// change equals to "input-change" and ignore the other
									// ones like: "set-value", "input-blur", and "menu-close"
									// That behavior doesn't clear input on select
									// See: https://stackoverflow.com/a/66992102
									if (action.action === 'input-change') field.onChange(value);
								}}
								// Pass the 'value' of the options object {label, value} to React hook form value.
								onChange={(val) => {
									field.onChange(val?.value);
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
					}}
				/>
				<FormErrorMessage>
					{errors.companyAddress && errors.companyAddress.message}
				</FormErrorMessage>
			</FormControl>

			<Flex gap={4}>
				<FormControl isInvalid={Boolean(errors.city)}>
					<FormLabel htmlFor="city">City *</FormLabel>
					<Input id="city" {...register('city')} />
					<FormErrorMessage>
						{errors.city && errors.city.message}
					</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={Boolean(errors.postalCode)}>
					<FormLabel htmlFor="postalCode">Postal Code *</FormLabel>
					<Input id="postalCode" {...register('postalCode')} />
					<FormErrorMessage>
						{errors.postalCode && errors.postalCode.message}
					</FormErrorMessage>
				</FormControl>
			</Flex>
		</>
	);
}
