import { z } from 'zod';

export const formSchema = z.object({
	company: z.string().min(2),
	address: z.string().min(2),
	city: z.string().min(2),
	postcode: z
		.string()
		.refine((val) => val.length >= 5, 'The postal code is invalid.')
		.refine((val) => /^\d+$/.test(val), 'The postal code is invalid.'),
});
