import { ApiResponseDto } from '../api-response.dto';
import { fetcher } from '../fetcher';
import { ITutorDto } from './company-tutor.dto';

type Response = Promise<ApiResponseDto<ITutorDto[]>>;

export async function getCompanyTutors() {
	try {
		return await fetcher<Response>('/company-tutors');
	} catch (err) {
		return Promise.reject(new Error('Unable to get company tutors.'));
	}
}
