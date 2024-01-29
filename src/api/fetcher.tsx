import { Content } from "next/font/google";

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
		//@ts-ignore
		return await res.json()['content'];
	} catch (err) {
		console.error(err);
		return Promise.reject();
	}
}
