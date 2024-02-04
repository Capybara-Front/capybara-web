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
		watch,
	} = useFormContext<z.infer<typeof formSchema>>();

	const watchStartDate = watch('dates.startDate');
	const watchEndDate = watch('dates.endDate');

	return (
		<Grid templateColumns="repeat(2, 1fr)" gap={4}>
			<GridItem colSpan={2}>
				<FormControl isRequired isInvalid={Boolean(errors.title)}>
					<FormLabel htmlFor="title">Title</FormLabel>
					<Input id="title" {...register('title')} />
					<FormErrorMessage>
						{errors.title && errors.title.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem colSpan={2}>
				<FormControl isRequired isInvalid={Boolean(errors.missionDescription)}>
					<FormLabel htmlFor="missionDescription">
						Mission description
					</FormLabel>
					<Textarea
						id="missionDescription"
						resize="none"
						{...register('missionDescription')}
					/>
					<FormErrorMessage>
						{errors.missionDescription && errors.missionDescription.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem>
				<FormControl isRequired isInvalid={Boolean(errors.salary)}>
					<FormLabel htmlFor="salary">Salary</FormLabel>

					<InputGroup>
						<InputLeftElement
							pointerEvents="none"
							color="blue.500"
							fontSize="1.2em"
						>
							€
						</InputLeftElement>
						<Input
							id="salary"
							type="number"
							// w={56}
							{...register('salary')}
						/>
					</InputGroup>
					<FormErrorMessage>
						{errors.salary && errors.salary.message}
					</FormErrorMessage>
				</FormControl>
			</GridItem>

			<GridItem display="flex" alignItems="end" gap={2}>
				<FormControl
					isRequired
					isInvalid={Boolean(errors.dates?.startDate || errors.dates)}
				>
					<FormLabel htmlFor="startDate">Start date</FormLabel>
					<Input id="startDate" type="date" {...register('dates.startDate')} />
					<FormErrorMessage>
						{errors.dates?.startDate && errors.dates.startDate?.message}
					</FormErrorMessage>
				</FormControl>
				<Divider borderBottomWidth={2} w={12} mb={5} />
				<FormControl
					isRequired
					isInvalid={Boolean(errors.dates?.endDate || errors.dates)}
				>
					<FormLabel htmlFor="endDate">End date</FormLabel>
					<Input id="endDate" type="date" {...register('dates.endDate')} />
					<FormErrorMessage>
						{errors.dates?.endDate && errors.dates.endDate?.message}
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
					{errors.dates && errors.dates.root?.message}
				</Text>
			</GridItem>
		</Grid>
	);
}
