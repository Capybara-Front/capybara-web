import { error } from "console";

export class DateUtil {
	static isValidDate(value: string | Date) {
		if (typeof value === 'string') {
			const date = new Date(value);
			return !isNaN(date.getTime());
		}
		return !isNaN(value.getTime());
	}
	static diffInDays(startDate: Date, endDate: Date): number | undefined {
		if (!this.isValidDate(startDate) || !this.isValidDate(endDate)) {
			return undefined;
		}

		const diffInMs = endDate.getTime() - startDate.getTime();

		if (diffInMs < 0) {
			return undefined;
		}

		return diffInMs / (1000 * 60 * 60 * 24);
	}
	static formatUSDate(stringDate: string): string {

		const date = new Date(stringDate);
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${month}/${day}/${year}`;
	}
}
