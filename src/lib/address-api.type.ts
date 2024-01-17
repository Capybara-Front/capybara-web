// Types of Data gouv Adress API
// Docs: https://adresse.data.gouv.fr/api-doc/adresse

interface Coordinates {
	type: string;
	coordinates: [number, number];
}

interface Geometry {
	type: string;
	coordinates: Coordinates;
}

interface Properties {
	label: string;
	score: number;
	housenumber: string;
	id: string;
	type: string;
	name: string;
	postcode: string;
	citycode: string;
	x: number;
	y: number;
	city: string;
	context: string;
	importance: number;
	street: string;
}

interface Feature {
	type: string;
	geometry: Geometry;
	properties: Properties;
}

export interface IAddressAPIResponse {
	type: string;
	version: string;
	features: Feature[];
	attribution: string;
	licence: string;
	query: string;
	limit: number;
}
