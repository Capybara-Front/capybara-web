import { getCompanyTutors } from '@/api/company/get-company-tutors';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';
import { Combobox } from '../ui/combobox';
import { formSchema } from './form-schema';

export function CompanyTutorField() {
	const {
		formState: { errors },
		control,
	} = useFormContext<z.infer<typeof formSchema>>();

	const handleSearch = useDebouncedCallback(
		(_, callback: (options: CompanyTutorOption[]) => void) => {
			getCompanyTutors()
				.then((res: any) => {
					callback(
						res.map((r: any) => ({
							value: r.id,
							label: `${r.firstName} ${r.lastName}`,
						}))
					);
				})
				.catch(() => callback([]));
		},
		1000
	);

	return (
		<FormControl isInvalid={Boolean(errors.companyTutorId)}>
			<FormLabel htmlFor="companyTutorId">Company tutor</FormLabel>
			<Controller
				name="companyTutorId"
				control={control}
				render={({ field }) => {
					return (
						<Combobox
							{...field}
							cacheOptions={false}
							inputId="companyTutorId"
							placeholder="Search..."
							loadOptions={handleSearch}
						/>
					);
				}}
			/>
			<FormErrorMessage>
				{errors.companyTutorId && errors.companyTutorId.message}
			</FormErrorMessage>
		</FormControl>
	);
}

interface CompanyTutorOption {
	value: string;
	label: string;
}
