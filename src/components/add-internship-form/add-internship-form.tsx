'use client';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CompanyFields } from './company-fields';
import { formSchema } from './form-schema';

export function AddInternShipForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const {
		handleSubmit,
		formState: { isSubmitting },
	} = form;

	function onSubmit(values: any) {
		console.log(values);
	}

	return (
		<>
			<Heading mb={7}>Add internship</Heading>
			<Box>
				<Heading mb={4} as="h3" size="md">
					1. Company information
				</Heading>
				<FormProvider {...form}>
					<Flex
						direction="column"
						gap={2}
						as="form"
						onSubmit={handleSubmit(onSubmit)}
					>
						<CompanyFields />
						<Button type="submit" mt={5} isLoading={isSubmitting}>
							Submit
						</Button>
					</Flex>
				</FormProvider>
			</Box>
		</>
	);
}
