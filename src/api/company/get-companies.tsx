import { isApiResponse } from '../api-response-type-guard';
import { ApiResponseDto } from '../api-response.dto';
import { fetcher } from '../fetcher';
import type { ICompanyDto } from './company.dto';

type Response = Promise<ApiResponseDto<ICompanyDto[]>>;

export async function getCompanies() {
	try {
		const res = await fetcher<Response>('/companies');
		return res.content;
	} catch (err) {
		if (isApiResponse<ICompanyDto[]>(err)) {
			console.error(err.error);
			return Promise.reject(new Error(err.error));
		}

		console.error(err);
		return Promise.reject(new Error('Unable to get companies.'));
	}
}
