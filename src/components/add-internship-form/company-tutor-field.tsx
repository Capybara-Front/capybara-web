import { getCompanyTutors } from '@/api/company/get-company-tutors';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { Combobox } from '../ui/combobox';
import { formSchema } from './form-schema';

export function CompanyTutorField() {
	const {
		formState: { errors },
		control,
	} = useFormContext<z.infer<typeof formSchema>>();

	async function handleSearch(): Promise<CompanyTutorOption[]> {
		const res = await getCompanyTutors();

		return res.map((r) => ({
			value: r.id,
			label: `${r.firstName} ${r.lastName}`,
		}));
	}

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
							inputId="companyTutorId"
							placeholder="Search an company tutor"
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
