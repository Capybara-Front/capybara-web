import { z } from 'zod';

export const formSchema = z.object({
	title: z.string().min(2).max(128),
	missionDescription: z.string().min(2).max(1500),
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

	companyId: z
		.object({
			label: z.string(),
			value: z.string(),
		})
		.optional(),
	company: z
		.object({
			name: z.string().min(2).max(128),
			address: z.string().min(2).max(128),
			city: z.string().min(2).max(128),
			zipCode: z
				.string()
				.refine((val) => val.length >= 5, 'The zip code must be 5 characters.')
				.refine((val) => /^\d+$/.test(val), 'The zip code is invalid.'),
		})
		.optional(),

	academicTutorId: z
		.object({
			label: z.string(),
			value: z.string(),
		})
		.optional(),
	academicTutor: z
		.object({
			firstName: z.string().min(2).max(128),
			lastName: z.string().min(2).max(128),
			phoneNumber: z.string().min(2).max(128),
			email: z.string().email().max(128),
		})
		.optional(),

	companyTutorId: z
		.object({
			label: z.string(),
			value: z.string(),
		})
		.optional(),
	companyTutor: z
		.object({
			firstName: z.string().min(2).max(128),
			lastName: z.string().min(2).max(128),
			phoneNumber: z.string().min(2).max(128),
			email: z.string().email().max(128),
		})
		.optional(),
});
