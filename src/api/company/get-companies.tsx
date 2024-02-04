import { isApiResponse } from '../api-response-type-guard';
import { ApiResponseDto } from '../api-response.dto';
import type { ICompanyDto } from './company.dto';

type Response = Promise<ApiResponseDto<ICompanyDto[]>>;

export async function getCompanies() {
	try {
		// return await fetcher<Response>('/companies');
		return [
			{
				name: 'Dassault Systèmes',
				address: 'string',
				city: 'string',
				zipCode: 'string',
			},
		];
	} catch (err) {
		if (isApiResponse<ICompanyDto[]>(err)) {
			console.error(err.error);
			return Promise.reject(new Error(err.error));
		}

		console.error(err);
		return Promise.reject(new Error('Unable to get companies.'));
	}
}
