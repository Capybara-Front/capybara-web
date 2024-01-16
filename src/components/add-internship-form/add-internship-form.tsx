'use client';
import { AddressUtil, Suggestion } from '@/utils/address';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CompanyFields } from './company-fields';
import { formSchema } from './form-schema';
import { VerifyAddress } from './verify-address';

export function AddInternShipForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const {
		handleSubmit,
		formState: { isSubmitting },
		setValue: formSetValue,
		watch,
	} = form;
	const [showAddressSuggest, setShowAddressSuggest] = useState(false);
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [isAddressAlreadyConfirmed, setIsAddressAlreadyConfirmed] =
		useState(false);

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (!isAddressAlreadyConfirmed) {
			AddressUtil.getSuggestions(values.address)
				// Suggestions
				.then((suggestions) => {
					setSuggestions(suggestions);
					setShowAddressSuggest(true);
				})
				// No suggestions
				.catch(() => setShowAddressSuggest(false));
		}
	}
	console.log('render');

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

						{showAddressSuggest && (
							<VerifyAddress
								entered={form.getValues('address')}
								suggestions={suggestions}
								onSave={(selectedSuggestion) => {
									if (selectedSuggestion) {
										formSetValue('address', selectedSuggestion.label);
										formSetValue('postcode', selectedSuggestion.postcode);
										formSetValue('city', selectedSuggestion.city);
									}
									setShowAddressSuggest(false);
									setIsAddressAlreadyConfirmed(true);
								}}
							/>
						)}
						{!showAddressSuggest && (
							<Button type="submit" mt={5} isLoading={isSubmitting}>
								Submit
							</Button>
						)}
					</Flex>
				</FormProvider>
			</Box>
		</>
	);
}
