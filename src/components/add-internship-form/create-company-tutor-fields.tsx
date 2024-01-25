'use client';
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	GridItem,
	Input,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './form-schema';

export function CreateCompanyTutorFields() {
	const {
		register,
		formState: { errors },
		setValue: setFormValue,
	} = useFormContext<z.infer<typeof formSchema>>();

	return (
		<Grid templateColumns="repeat(2, 1fr)" gap={4}>
			<GridItem>
				<FormControl
					isRequired
					isInvalid={Boolean(errors.companyTutor?.firstName)}
				>
					<FormLabel htmlFor="firstName">First Name</FormLabel>
					<Input id="firstName" {...register('companyTutor.firstName')} />
					<FormErrorMessage>
						{errors.companyTutor?.firstName &&
							errors.companyTutor?.firstName.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem>
				<FormControl
					isRequired
					isInvalid={Boolean(errors.companyTutor?.lastName)}
				>
					<FormLabel htmlFor="lastName">Last Name</FormLabel>
					<Input id="lastName" {...register('companyTutor.lastName')} />
					<FormErrorMessage>
						{errors.companyTutor?.lastName &&
							errors.companyTutor?.lastName.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem>
				<FormControl isRequired isInvalid={Boolean(errors.companyTutor?.email)}>
					<FormLabel htmlFor="email">Email</FormLabel>
					<Input id="email" {...register('companyTutor.email')} />
					<FormErrorMessage>
						{errors.companyTutor?.email && errors.companyTutor?.email.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem>
				<FormControl
					isRequired
					isInvalid={Boolean(errors.companyTutor?.phoneNumber)}
				>
					<FormLabel htmlFor="phoneNumber">Phone number</FormLabel>
					<Input id="phoneNumber" {...register('companyTutor.phoneNumber')} />
					<FormErrorMessage>
						{errors.companyTutor?.phoneNumber &&
							errors.companyTutor?.phoneNumber.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>
		</Grid>
	);
}
