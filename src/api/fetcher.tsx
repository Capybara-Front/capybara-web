export async function fetcher<T>(url: string, init?: RequestInit): Promise<T> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			...init,
		});

		if (!res.ok) {
			return Promise.reject(res);
		}
		return await res.json();
	} catch (err) {
		console.error(err);
		return Promise.reject();
	}
}
