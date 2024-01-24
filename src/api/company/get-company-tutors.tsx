import { ApiResponseDto } from '../api-response.dto';
import { fetcher } from '../fetcher';
import { ICompanyTutorDto } from './company-tutor.dto';

type Response = Promise<ApiResponseDto<ICompanyTutorDto[]>>;

export async function getCompanyTutors() {
	try {
		const res = await fetcher<Response>('/company-tutors');
		return res.content;
	} catch (err) {
		return Promise.reject(new Error('Unable to get company tutors.'));
	}
}
