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

export function CreateAcademicTutorFields() {
	const {
		register,
		formState: { errors },
	} = useFormContext<z.infer<typeof formSchema>>();

	return (
		<Grid templateColumns="repeat(2, 1fr)" gap={4}>
			<GridItem>
				<FormControl
					isRequired
					isInvalid={Boolean(errors.academicTutor?.firstName)}
				>
					<FormLabel htmlFor="firstName">First Name</FormLabel>
					<Input id="firstName" {...register('academicTutor.firstName')} />
					<FormErrorMessage>
						{errors.academicTutor?.firstName &&
							errors.academicTutor?.firstName.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem>
				<FormControl
					isRequired
					isInvalid={Boolean(errors.academicTutor?.lastName)}
				>
					<FormLabel htmlFor="lastName">Last Name</FormLabel>
					<Input id="lastName" {...register('academicTutor.lastName')} />
					<FormErrorMessage>
						{errors.academicTutor?.lastName &&
							errors.academicTutor?.lastName.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem>
				<FormControl
					isRequired
					isInvalid={Boolean(errors.academicTutor?.email)}
				>
					<FormLabel htmlFor="email">Email</FormLabel>
					<Input id="email" {...register('academicTutor.email')} />
					<FormErrorMessage>
						{errors.academicTutor?.email && errors.academicTutor?.email.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem>
				<FormControl
					isRequired
					isInvalid={Boolean(errors.academicTutor?.phoneNumber)}
				>
					<FormLabel htmlFor="phoneNumber">Phone number</FormLabel>
					<Input id="phoneNumber" {...register('academicTutor.phoneNumber')} />
					<FormErrorMessage>
						{errors.academicTutor?.phoneNumber &&
							errors.academicTutor?.phoneNumber.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>
		</Grid>
	);
}
