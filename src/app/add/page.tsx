import { AddInternShipForm } from '@/components/add-internship-form';
import { Container, Heading, Link } from '@chakra-ui/react';
import { MdArrowBack } from 'react-icons/md';

export default function AddInternshipPage() {
	return (
		<Container maxWidth="5xl" pt={16}>
			<Heading size="xl" mb={10} display="flex" alignItems="center" gap={2}>
				<Link href="/">
					<MdArrowBack />
				</Link>
				Add Internship
			</Heading>
			<AddInternShipForm />
		</Container>
	);
}
