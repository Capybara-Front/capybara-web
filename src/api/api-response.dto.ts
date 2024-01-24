export interface ApiResponseDto<Payload> {
	error: string;
	content: Payload;
}
