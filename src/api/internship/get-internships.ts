import { fetcher } from '../fetcher';

export async function getInternships() {
	try {

		const res = await fetcher('/internships');
		return res;
	} catch (err) {
		Promise.reject(new Error('Unable to get all internships data.'));
	}
}
export interface InternshipsTableProps{
	id: string;
	startDate: Date;
	endDate: Date;
	title: string;
  }