import { fetcher } from '../fetcher';

export async function addInternship(requestModel: IAddInternsipRequestModel) {
	try {
		const res = await fetcher('/internships', {
			method: 'POST',
			body: JSON.stringify(requestModel),
		});
	} catch (err) {
		Promise.reject(new Error('Unable to add an internship.'));
	}
}

interface IAddInternsipRequestModel {
	title: string;
	missionDescription: string;
	startDate: Date;
	endDate: Date;
	studentId: string;
	companyId?: string;
	company?: IAddCompanyRequestModel;
	academicTutorId: string;
	academicTutor?: ITutorRequestModel;
	companyTutorId: string;
	companyTutor?: ITutorRequestModel;
}

interface IAddCompanyRequestModel {
	name: string;
	address: string;
	city: string;
	zipCode: string;
}

interface ITutorRequestModel {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
}
