import { isApiResponse } from '../api-response-type-guard';
import { ApiResponseDto } from '../api-response.dto';
import { fetcher } from '../fetcher';
import { ITutorDto } from './company-tutor.dto';

type ApiResponse = Promise<ApiResponseDto<ITutorDto[]>>;

export async function getAcademicTutors() {
	try {
		const res = await fetcher<ApiResponse>('/academic-tutors');
		return res.content;
	} catch (err) {
		if (isApiResponse<ITutorDto[]>(err)) {
			console.error(err.error);
			return Promise.reject(new Error(err.error));
		}

		console.error(err);
		return Promise.reject(new Error('Unable to get academic tutors.'));
	}
}
