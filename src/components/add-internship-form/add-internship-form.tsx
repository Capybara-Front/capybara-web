'use client';
import { AddressUtil, Suggestion } from '@/utils/address';
import { Box, Button, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CompanyFields } from './company-fields';
import { formSchema } from './form-schema';
import { HostFields } from './host-fields';
import { InternshipFields } from './internship-fields';
import { VerifyAddress } from './verify-address';

export function AddInternShipForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const {
		handleSubmit,
		formState: { isSubmitting },
		setValue: formSetValue,
		getValues: formGetValues,
		watch,
	} = form;
	const [showVerifyAddress, setShowVerifyAddress] = useState(false);
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [isAddressAlreadyConfirmed, setIsAddressAlreadyConfirmed] =
		useState(false);
	const [confirmedAddress, setConfirmedAddress] = useState('');

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (!isAddressAlreadyConfirmed) {
			AddressUtil.getSuggestions(values.address)
				// Suggestions
				.then((suggestions) => {
					setSuggestions(suggestions);
					setShowVerifyAddress(true);
				})
				// No suggestions
				.catch(() => setShowVerifyAddress(false));
		} else {
			// If we confirmed but we entered a new address.
			if (formGetValues('address') !== confirmedAddress) {
				setShowVerifyAddress(true);
			}
		}
	}
	console.log('render');

	return (
		<>
			<Heading mb={7}>Add internship</Heading>
			<FormProvider {...form}>
				<Flex
					direction="column"
					gap={12}
					as="form"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Grid templateColumns="repeat(2,1fr)" gap={12}>
						<GridItem>
							<Heading mb={4} as="h3" size="md">
								1. Company
							</Heading>
							<CompanyFields />
						</GridItem>

						<GridItem>
							<Heading mb={4} as="h3" size="md">
								2. Company tutor
							</Heading>
							<HostFields />
						</GridItem>
					</Grid>

					<Box>
						<Heading mb={4} as="h3" size="md">
							3. Internship
						</Heading>
						<InternshipFields />
					</Box>

					<Box>
						{showVerifyAddress && (
							<VerifyAddress
								entered={form.getValues('address')}
								suggestions={suggestions}
								onSave={(selectedSuggestion) => {
									if (selectedSuggestion) {
										formSetValue('address', selectedSuggestion.label);
										formSetValue('postcode', selectedSuggestion.postcode);
										formSetValue('city', selectedSuggestion.city);
										setConfirmedAddress(selectedSuggestion.label);
									} else {
										setConfirmedAddress(formGetValues('address'));
									}
									setShowVerifyAddress(false);
									setIsAddressAlreadyConfirmed(true);
								}}
							/>
						)}
						{!showVerifyAddress && (
							<Button type="submit" mt={5} isLoading={isSubmitting}>
								Submit
							</Button>
						)}
					</Box>
				</Flex>
			</FormProvider>
		</>
	);
}
