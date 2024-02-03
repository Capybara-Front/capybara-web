import { getInternships } from '@/api/internship/get-internships';
import InternshipsTable from '@/components/internships-table';
import { Heading, Button, Container, Flex } from '@chakra-ui/react';
import Link from 'next/link';

export default async function Home() {
	const currentUser = 'Your Name';

	const internships = await getInternships();

	return (
		<main>
			<Container maxWidth="5xl" pt={16}>
				<Flex justifyContent={'space-between'}>
					<Heading size="xl" mb={10}>
						My Internships
					</Heading>
					<Button as={Link} href="/add">
						Add new internship
					</Button>
				</Flex>
				<InternshipsTable data={internships} />
			</Container>
		</main>
	);
}
