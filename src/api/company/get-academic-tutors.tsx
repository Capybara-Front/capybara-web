import { ApiResponseDto } from '../api-response.dto';
import { fetcher } from '../fetcher';
import { ITutorDto } from './company-tutor.dto';

type Response = Promise<ApiResponseDto<ITutorDto[]>>;

export async function getAcademicTutors() {
	try {
		return await fetcher<Response>('/academic-tutors');
	} catch (err) {
		return Promise.reject(new Error('Unable to get academic tutors.'));
	}
}
