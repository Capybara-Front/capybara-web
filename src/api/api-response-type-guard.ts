import type { ApiResponseDto } from './api-response.dto';

export function isApiResponse<T>(obj: any): obj is ApiResponseDto<T> {
	return obj.content !== undefined;
}
