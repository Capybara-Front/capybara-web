'use client';
import { DateUtil } from '@/utils/date.util';
import {
	Divider,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	GridItem,
	Input,
	InputGroup,
	InputLeftElement,
	Text,
	Textarea,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './form-schema';

export function InternshipFields() {
	const {
		register,
		formState: { errors },
		getValues: formGetValues,
		watch,
	} = useFormContext<z.infer<typeof formSchema>>();

	const watchStartDate = watch('internship.dates.startDate');
	const watchEndDate = watch('internship.dates.endDate');

	return (
		<Grid templateColumns="repeat(2, 1fr)" gap={4}>
			<GridItem colSpan={2}>
				<FormControl isRequired isInvalid={Boolean(errors.internship?.title)}>
					<FormLabel htmlFor="internship.title">Title</FormLabel>
					<Input id="internship.title" {...register('internship.title')} />
					<FormErrorMessage>
						{errors.internship?.title && errors.internship?.title.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem colSpan={2}>
				<FormControl
					isRequired
					isInvalid={Boolean(errors.internship?.missionDescription)}
				>
					<FormLabel htmlFor="internship.missionDescription">
						Mission description
					</FormLabel>
					<Textarea
						id="internship.missionDescription"
						resize="none"
						{...register('internship.missionDescription')}
					/>
					<FormErrorMessage>
						{errors.internship?.missionDescription &&
							errors.internship?.missionDescription.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem>
				<FormControl isRequired isInvalid={Boolean(errors.internship?.salary)}>
					<FormLabel htmlFor="salary">Salary</FormLabel>

					<InputGroup>
						<InputLeftElement
							pointerEvents="none"
							color="yellow.500"
							fontSize="1.2em"
						>
							$
						</InputLeftElement>
						<Input
							id="salary"
							type="number"
							// w={56}
							{...register('internship.salary')}
						/>
					</InputGroup>
					<FormErrorMessage>
						{errors.internship?.salary && errors.internship?.salary.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem display="flex" alignItems="end" gap={2}>
				<FormControl
					isRequired
					isInvalid={Boolean(
						errors.internship?.dates?.startDate || errors.internship?.dates
					)}
				>
					<FormLabel htmlFor="startDate">Start date</FormLabel>
					<Input
						id="startDate"
						type="date"
						{...register('internship.dates.startDate')}
					/>
					<FormErrorMessage>
						{errors.internship?.dates?.startDate &&
							errors.internship?.dates.startDate?.message}
					</FormErrorMessage>
				</FormControl>
				<Divider borderBottomWidth={2} w={12} mb={5} />
				<FormControl
					isRequired
					isInvalid={Boolean(
						errors.internship?.dates?.endDate || errors.internship?.dates
					)}
				>
					<FormLabel htmlFor="endDate">End date</FormLabel>
					<Input
						id="endDate"
						type="date"
						{...register('internship.dates.endDate')}
					/>
					<FormErrorMessage>
						{errors.internship?.dates?.endDate &&
							errors.internship?.dates.endDate?.message}
					</FormErrorMessage>
				</FormControl>
				<Text flexShrink={0} mb={2.5} fontWeight="500">
					{DateUtil.diffInDays(
						new Date(watchStartDate),
						new Date(watchEndDate)
					) || 0}{' '}
					days
				</Text>
			</GridItem>

			<GridItem colSpan={2}>
				<Text color="red.500" fontSize="sm">
					{errors.internship?.dates && errors.internship?.dates.root?.message}
				</Text>
			</GridItem>
		</Grid>
	);
}
