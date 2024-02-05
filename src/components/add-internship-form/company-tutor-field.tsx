import { getCompanyTutors } from '@/api/company/get-company-tutors';
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Text,
	type FormControlProps,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { MdArrowBack } from 'react-icons/md';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';
import { Combobox } from '../ui/combobox';
import { CreateCompanyTutorFields } from './create-company-tutor-fields';
import { formSchema } from './form-schema';

export function CompanyTutorField(props: FormControlProps) {
	const {
		formState: { errors },
		control,
		setValue: setFormValue,
	} = useFormContext<z.infer<typeof formSchema>>();

	const handleSearch = useDebouncedCallback(
		(_, callback: (options: CompanyTutorOption[]) => void) => {
			// Don't call api when isDisabled === true
			if (props.isDisabled) {
				callback([]);
				return;
			}
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

	const [openCreateForm, setOpenCreateForm] = useState(false);

	return openCreateForm ? (
		<Box>
			<HStack justify="space-between" mb={4}>
				<Text fontWeight="500">Company tutor</Text>
				<Button
					leftIcon={<MdArrowBack />}
					variant="link"
					size="sm"
					justifyContent="end"
					onClick={() => setOpenCreateForm(false)}
				>
					Select a company tutor
				</Button>
			</HStack>
			<CreateCompanyTutorFields />
		</Box>
	) : (
		<HStack align="end">
			<FormControl
				isInvalid={Boolean(errors.companyTutorId)}
				isRequired
				{...props}
			>
				<Flex alignItems="start">
					<FormLabel htmlFor="companyTutorId">Company tutor</FormLabel>
					{props.isDisabled && (
						<Text fontSize="sm" color="red.400" mt={0.5} cursor="default">
							Please select a company first
						</Text>
					)}
				</Flex>

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
			<Button
				variant="outline"
				onClick={() => {
					setFormValue('companyTutorId', { label: '', value: '' });
					setOpenCreateForm(true);
				}}
				isDisabled={props.isDisabled}
			>
				New
			</Button>
		</HStack>
	);
}

interface CompanyTutorOption {
	value: string;
	label: string;
}
