import { ICompanyTutorDto } from './company-tutor.dto';

export async function getCompanyTutors(): Promise<ICompanyTutorDto[]> {
	try {
		// return await fetcher('/company-tutors');
		return new Promise<ICompanyTutorDto[]>((resolve) => {
			setTimeout(() => {
				resolve([
					{
						id: '42ab37be-af42-44da-9dd6-1c09aa6c473a',
						firstName: 'string',
						lastName: 'string',
						phoneNumber: 'string',
						email: 'string',
					},
					{
						id: '2',
						firstName: 'number',
						lastName: 'number',
						phoneNumber: 'number',
						email: 'number',
					},
					{
						id: '3',
						firstName: 'object',
						lastName: 'object',
						phoneNumber: 'object',
						email: 'object',
					},
				]);
			}, 2000);
		});
	} catch (err) {
		return Promise.reject(new Error('Unable to get company tutors.'));
	}
}
