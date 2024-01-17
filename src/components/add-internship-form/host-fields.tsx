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

export function HostFields() {
	const {
		register,
		formState: { errors },
		setValue: setFormValue,
	} = useFormContext<z.infer<typeof formSchema>>();

	return (
		<Grid templateColumns="repeat(2, 1fr)" gap={4}>
			<GridItem>
				<FormControl isRequired isInvalid={Boolean(errors.firstname)}>
					<FormLabel htmlFor="firstname">Firstname</FormLabel>
					<Input id="firstname" {...register('firstname')} />
					<FormErrorMessage>
						{errors.firstname && errors.firstname.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem>
				<FormControl isRequired isInvalid={Boolean(errors.lastname)}>
					<FormLabel htmlFor="lastname">Lastname</FormLabel>
					<Input id="lastname" {...register('lastname')} />
					<FormErrorMessage>
						{errors.lastname && errors.lastname.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem>
				<FormControl isRequired isInvalid={Boolean(errors.phoneNumber)}>
					<FormLabel htmlFor="phoneNumber">Phone number</FormLabel>
					<Input id="phoneNumber" {...register('phoneNumber')} />
					<FormErrorMessage>
						{errors.phoneNumber && errors.phoneNumber.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem>
				<FormControl isRequired isInvalid={Boolean(errors.email)}>
					<FormLabel htmlFor="email">Email</FormLabel>
					<Input id="email" {...register('email')} />
					<FormErrorMessage>
						{errors.email && errors.email.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>
		</Grid>
	);
}
