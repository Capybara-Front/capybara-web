import { fetcher } from "../fetcher";

export async function getInternships() {
    try {
        const res = await fetcher('/internships', {
            method: 'GET',
        });
        return res;
    } catch (err) {
        Promise.reject(new Error('Unable to fetch internships.'));
    }

}