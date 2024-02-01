import { getInternships } from '@/api/internship/get-internships';
import InternshipsTable from '@/components/internships-table';
import { Heading, Button, Container, Flex, Stack } from '@chakra-ui/react';
import Link from 'next/link';

export default async function Home() {
	const currentUser = 'Your Name';
	const data = await getInternships();
	console.log('Data : ',data);
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
			<InternshipsTable data={data}/>
			</Container>
		</main>
	);
}
