'use client';
import { addInternship } from '@/api/internship/add-internship';
import { AddressUtil, Suggestion } from '@/utils/address';
import {
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	Heading,
	useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CompanyFields } from './company-fields';
import { formSchema } from './form-schema';
import { HostFields } from './host-fields';
import { InternshipFields } from './internship-fields';
import { VerifyAddress } from './verify-address';

export function AddInternShipForm() {
	const router = useRouter();
	const toast = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const {
		handleSubmit,
		setValue: formSetValue,
		getValues: formGetValues,
	} = form;
	const [showVerifyAddress, setShowVerifyAddress] = useState(false);
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [isAddressAlreadyConfirmed, setIsAddressAlreadyConfirmed] =
		useState(false);
	const [confirmedAddress, setConfirmedAddress] = useState('');

	const mutation = useMutation({
		mutationFn: addInternship,
	});

	function onSubmit(formValues: z.infer<typeof formSchema>) {
		if (!isAddressAlreadyConfirmed) {
			AddressUtil.getSuggestions(formValues.company.address)
				// Suggestions
				.then((suggestions) => {
					setSuggestions(suggestions);
					setShowVerifyAddress(true);
				})
				// No suggestions
				.catch(() => {
					setShowVerifyAddress(false);
					setIsAddressAlreadyConfirmed(true);
				});
		} else {
			// If we confirmed but we entered a new address.
			if (formGetValues('company.address') !== confirmedAddress) {
				if (suggestions.length > 0) setShowVerifyAddress(true);
			}
		}
		// Extract 'dates' because 'requestModel' doesn't contain that field.
		const { dates } = formValues;
		mutation.mutate(
			{
				...formValues,
				startDate: dates.startDate,
				endDate: dates.endDate,
				companyId: 'Dassault Systèmes',
				studentId: '2a63ed36-1450-4ce9-bafc-1a261048e3f2',
				academicTutorId: '8ecc03fe-0200-4a36-9b29-981a5c69f64d',
				companyTutorId: '42ab37be-af42-44da-9dd6-1c09aa6c473a',
				// companyTutor: {
				// 	firstName: formValues.companyTutor.firstName,
				// 	lastName: formValues.companyTutor.lastName,
				// 	mailAddress: formValues.companyTutor.email,
				// 	phoneNumber: formValues.companyTutor.firstName,
				// },
				company: undefined,
				companyTutor: undefined,
			},
			{
				onSuccess: () => {
					toast({
						title: `Internship '${formValues.title}' created.`,
						status: 'success',
						duration: 9000,
						isClosable: true,
					});
					router.push('/');
				},
			}
		);
	}

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
								entered={form.getValues('company.address')}
								suggestions={suggestions}
								onSave={(selectedSuggestion) => {
									if (selectedSuggestion) {
										formSetValue('company.address', selectedSuggestion.label);
										formSetValue(
											'company.zipCode',
											selectedSuggestion.postcode
										);
										formSetValue('company.city', selectedSuggestion.city);
										setConfirmedAddress(selectedSuggestion.label);
									} else {
										setConfirmedAddress(formGetValues('company.address'));
									}
									setShowVerifyAddress(false);
									setIsAddressAlreadyConfirmed(true);
								}}
							/>
						)}
						{!showVerifyAddress && (
							<Button type="submit" mt={5} isLoading={mutation.isPending}>
								Submit
							</Button>
						)}
					</Box>
				</Flex>
			</FormProvider>
		</>
	);
}
