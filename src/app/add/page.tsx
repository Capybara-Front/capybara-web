import { AddInternShipForm } from '@/components/add-internship-form';
import { Container, Heading } from '@chakra-ui/react';

export default function AddInternshipPage() {
	return (
		<Container maxWidth="5xl" pt={16}>
			<Heading size="xl" mb={10}>
				Add Internship
			</Heading>
			<AddInternShipForm />
		</Container>
	);
}
