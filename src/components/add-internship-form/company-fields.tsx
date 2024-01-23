'use client';
import { getAddress } from '@/api/get-address';
import type { Feature } from '@/lib/address-api.type';
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	GridItem,
	Input,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';
import { Autocomplete } from '../ui/autocomplete';
import { formSchema } from './form-schema';

interface AddressOption {
	value: string;
	label: string;
	// Additional data
	zipCode: string;
	city: string;
}

export function CompanyFields() {
	const {
		register,
		formState: { errors },
		control,
		setValue: setFormValue,
	} = useFormContext<z.infer<typeof formSchema>>();

	// 1. Call API
	const handleAddressSearch = useDebouncedCallback(
		(value: string, onSuccess: (data: AddressOption[]) => void) => {
			getAddress(value).then((res) => {
				const addresses = res.features.map((address: Feature) => ({
					label: address.properties.label,
					value: address.properties.label,
					zipCode: address.properties.postcode,
					city: address.properties.city,
				}));

				if (addresses.length > 0) {
					onSuccess(addresses);
				} else {
					onSuccess([]);
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
		<Grid templateColumns="repeat(2, 1fr)" gap={4}>
			<GridItem colSpan={2}>
				<FormControl isRequired isInvalid={Boolean(errors.company?.name)}>
					<FormLabel htmlFor="company">Company</FormLabel>
					<Input id="company" {...register('company.name')} />
					<FormErrorMessage>
						{errors.company?.name && errors.company?.name.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem colSpan={2}>
				<FormControl isInvalid={Boolean(errors.company?.address)}>
					<FormLabel htmlFor="address">Address</FormLabel>
					<Controller
						name="company.address"
						control={control}
						render={({ field }) => {
							return (
								<Autocomplete
									placeholder="Search an address..."
									loadOptions={loadOptions}
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
									onChange={(val: any) => {
										field.onChange(val?.value);
										setFormValue('company.zipCode', val?.zipCode || '');
										setFormValue('company.city', val?.city || '');
									}}
								/>
							);
						}}
					/>
					<FormErrorMessage>
						{errors.company?.address && errors.company?.address.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem>
				<FormControl isRequired isInvalid={Boolean(errors.company?.city)}>
					<FormLabel htmlFor="city">City</FormLabel>
					<Input id="city" {...register('company.city')} />
					<FormErrorMessage>
						{errors.company?.city && errors.company?.city.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem>
				<FormControl isRequired isInvalid={Boolean(errors.company?.zipCode)}>
					<FormLabel htmlFor="zipCode">Zip code</FormLabel>
					<Input id="zipCode" {...register('company.zipCode')} />
					<FormErrorMessage>
						{errors.company?.zipCode && errors.company?.zipCode.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>
		</Grid>
	);
}
