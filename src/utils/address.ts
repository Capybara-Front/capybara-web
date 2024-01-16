import { getAddress } from '@/api/get-address';

export class AddressUtil {
	/**
	 * List of recommended addresses
	 * It's useful when verifying an address in forms
	 * @param address initial address
	 * @param limit number of recommended addresses
	 * @returns
	 */
	static async getSuggestions(
		address: string,
		limit = 3
	): Promise<Suggestion[]> {
		try {
			const res = await getAddress(address, limit);
			if (res.features.length === 0)
				return Promise.reject(
					new Error(`The address you provided may be incorrect: ${address}`)
				);

			if (res.features[0].properties.label === address)
				return Promise.reject(
					new Error(`The first autocompletion is the same address: ${address}`)
				);

			return res.features.map(({ properties }) => ({
				label: properties.label,
				housenumber: properties.housenumber,
				street: properties.street,
				postcode: properties.postcode,
				city: properties.city,
			}));
		} catch (err) {
			return Promise.reject(
				new Error(`The address you provided may be incorrect: ${address}`)
			);
		}
	}
}

export interface Suggestion {
	label: string;
	postcode: string;
	city: string;
}
