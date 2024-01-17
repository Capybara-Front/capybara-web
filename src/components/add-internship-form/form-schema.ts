import { z } from 'zod';

export const formSchema = z.object({
	company: z.string().min(2).max(128),
	address: z.string().min(2).max(128),
	city: z.string().min(2).max(128),
	postcode: z
		.string()
		.refine((val) => val.length >= 5, 'The postal code is invalid.')
		.refine((val) => /^\d+$/.test(val), 'The postal code is invalid.'),
	firstname: z.string().min(2).max(128),
	lastname: z.string().min(2).max(128),
	phoneNumber: z.string().min(2).max(128),
	email: z.string().email().max(128),

	internship: z.object({
		title: z.string().min(2).max(128),
		missionDescription: z.string().min(2).max(128),
		dates: z
			.object({
				startDate: z.coerce.date().min(new Date('1800-01-01')),
				endDate: z.coerce.date().min(new Date('1800-01-01')),
			})
			.refine(
				(schema) => schema.endDate > schema.startDate,
				'The end date must be greater than the start date.'
			),
		salary: z.coerce.number().min(1),
	}),
});
