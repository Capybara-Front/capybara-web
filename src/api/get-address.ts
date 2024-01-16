export async function getAddress(q: string) {
	try {
		const res = await fetch(
			`https://api-adresse.data.gouv.fr/search/?q=${q}&type=housenumber&limit=10`
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
