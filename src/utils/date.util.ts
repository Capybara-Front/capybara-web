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
}
