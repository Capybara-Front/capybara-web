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
import { AcademicTutorField } from './academic-tutor-field';
import { CompanyFields } from './company-fields';
import { CompanyTutorField } from './company-tutor-field';
import { formSchema } from './form-schema';
import { InternshipFields } from './internship-fields';
import { VerifyAddress } from './verify-address';
import { VerifyAddressError } from './verify-address-error';

export function AddInternShipForm() {
	const router = useRouter();
	const toast = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const { handleSubmit, setValue: formSetValue } = form;

	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [showVerifyAddress, setShowVerifyAddress] = useState(false);
	const [showAddressError, setShowAddressError] = useState(false);
	const [confirmedAddress, setConfirmedAddress] = useState('');

	const mutation = useMutation({
		mutationFn: addInternship,
	});

	function onSubmit({ dates, ...formValues }: z.infer<typeof formSchema>) {
		const variables = {
			...formValues,
			startDate: dates.startDate,
			endDate: dates.endDate,
			companyId: 'Dassault',
			studentId: '2a63ed36-1450-4ce9-bafc-1a261048e3f2',

			academicTutorId: formValues.academicTutorId.value
				? formValues.academicTutorId.value
				: undefined,
			academicTutor: formValues.academicTutor
				? formValues.academicTutor
				: undefined,

			companyTutorId: formValues.companyTutorId.value
				? formValues.companyTutorId.value
				: undefined,
			companyTutor: formValues.companyTutor
				? formValues.companyTutor
				: undefined,
			company: undefined,
		};

		if (confirmedAddress === formValues.company.address) {
			mutation.mutate(variables, {
				onSuccess: () => {
					toast({
						title: `Internship '${formValues.title}' created.`,
						status: 'success',
						duration: 9000,
						isClosable: true,
					});
					router.push('/');
				},
			});
		} else {
			AddressUtil.getSuggestions(formValues.company.address)
				// Suggestions
				.then((suggestions) => {
					// 1. Address is valid
					if (suggestions[0].label === formValues.company.address) {
						setShowVerifyAddress(false);
						setShowAddressError(false);

						mutation.mutate(variables, {
							onSuccess: () => {
								toast({
									title: `Internship '${formValues.title}' created.`,
									status: 'success',
									duration: 9000,
									isClosable: true,
								});
								router.push('/');
							},
						});
						// 2. Has suggestions
					} else {
						setSuggestions(suggestions);
						setShowAddressError(false);
						setShowVerifyAddress(true);
					}
				})
				// No suggestions
				.catch(() => {
					setShowVerifyAddress(false);
					setShowAddressError(true);
				});
		}
	}

	return (
		<FormProvider {...form}>
			<Flex
				direction="column"
				gap={12}
				as="form"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Grid templateColumns="repeat(2,1fr)" columnGap={12} rowGap={4}>
					<GridItem colSpan={2}>
						<InternshipFields />
					</GridItem>

					<GridItem>
						<Heading as="h3" size="md">
							Company
						</Heading>
					</GridItem>

					<GridItem>
						<Heading as="h3" size="md">
							Tutors
						</Heading>
					</GridItem>

					<GridItem>
						<CompanyFields />
					</GridItem>

					<GridItem display="flex" flexDirection="column" gap={10}>
						<CompanyTutorField />
						<AcademicTutorField />
					</GridItem>
				</Grid>

				<Box>
					{showVerifyAddress && (
						<VerifyAddress
							entered={form.getValues('company.address')}
							suggestions={suggestions}
							onSave={(selectedSuggestion) => {
								if (selectedSuggestion) {
									formSetValue('company.address', selectedSuggestion.label);
									formSetValue('company.zipCode', selectedSuggestion.postcode);
									formSetValue('company.city', selectedSuggestion.city);
									setConfirmedAddress(selectedSuggestion.label);
								}
								// We selected the entered address
								setShowVerifyAddress(false);
								setConfirmedAddress(form.getValues('company.address'));
							}}
						/>
					)}
					{showAddressError && (
						<VerifyAddressError
							onSave={() => {
								setShowAddressError(false);
								setConfirmedAddress(form.getValues('company.address'));
							}}
						/>
					)}

					<Button
						type="submit"
						mt={5}
						isLoading={mutation.isPending}
						isDisabled={showVerifyAddress}
					>
						Submit
					</Button>
				</Box>
			</Flex>
		</FormProvider>
	);
}
