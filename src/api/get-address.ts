import { IAddressAPIResponse } from '@/lib/address-api.type';

export async function getAddress(
	q: string,
	limit = 10
): Promise<IAddressAPIResponse> {
	try {
		const res = await fetch(
			`https://api-adresse.data.gouv.fr/search/?q=${q}&type=housenumber&limit=${limit}`
		);
		if (!res.ok) {
			return Promise.reject(res);
		}
		return await res.json();
	} catch (err) {
		console.error(err);
		return Promise.reject();
	}
}
