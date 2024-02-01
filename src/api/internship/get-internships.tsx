
export async function getInternships() : Promise<InternshipsTableProps[] | undefined >{
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${'/internships'}`);

		if (!res.ok) {
			return Promise.reject(res);
		}
		const data = await res.json();

		if ('content' in data){
			return data['content'] as InternshipsTableProps[];
		}
		else{
			throw new Error('there is no content in this data');
		}
	} catch (err) {
		Promise.reject(Error('Unable to get all internships data.'));
	}
}
export type InternshipsTableProps = {
	id: string;
	title: string;
	startDate: string;
	endDate: string;
	status: string;
	missionDescription: string;
	
  }