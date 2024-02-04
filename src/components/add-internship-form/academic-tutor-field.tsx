import { getAcademicTutors } from '@/api/company/get-academic-tutors';
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { MdArrowBack } from 'react-icons/md';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';
import { Combobox } from '../ui/combobox';
import { CreateAcademicTutorFields } from './create-academic-tutor-fields';
import { formSchema } from './form-schema';

export function AcademicTutorField() {
	const {
		formState: { errors },
		control,
		setValue: setFormValue,
	} = useFormContext<z.infer<typeof formSchema>>();

	const [openCreateForm, setOpenCreateForm] = useState(false);

	const handleSearch = useDebouncedCallback(
		(_, callback: (options: { value: string; label: string }[]) => void) => {
			getAcademicTutors()
				.then((res) => {
					callback(
						res.map((r) => ({
							value: r.id,
							label: `${r.firstName} ${r.lastName}`,
						}))
					);
				})
				.catch(() => callback([]));
		},
		1000
	);

	return openCreateForm ? (
		<Box>
			<HStack justify="space-between" mb={4}>
				<Text fontWeight="500">Academic tutor</Text>
				<Button
					leftIcon={<MdArrowBack />}
					variant="link"
					size="sm"
					justifyContent="end"
					onClick={() => setOpenCreateForm(false)}
				>
					Select an academic tutor
				</Button>
			</HStack>
			<CreateAcademicTutorFields />
		</Box>
	) : (
		<HStack align="end">
			<FormControl isInvalid={Boolean(errors.academicTutorId)} isRequired>
				<FormLabel htmlFor="academicTutorId">Academic tutor</FormLabel>
				<Controller
					name="academicTutorId"
					control={control}
					render={({ field }) => {
						return (
							<Combobox
								{...field}
								cacheOptions={false}
								inputId="academicTutorId"
								placeholder="Search..."
								loadOptions={handleSearch}
							/>
						);
					}}
				/>
				<FormErrorMessage>
					{errors.academicTutorId && errors.academicTutorId.message}
				</FormErrorMessage>
			</FormControl>
			<Button
				variant="outline"
				onClick={() => {
					setFormValue('academicTutorId', { label: '', value: '' });
					setOpenCreateForm(true);
				}}
			>
				New
			</Button>
		</HStack>
	);
}
