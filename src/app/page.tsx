import InternshipsTable from '@/components/internships-table';
import Navbar from '@/components/navbar';
import { Heading,Button, Container, Flex, Stack } from '@chakra-ui/react';
import Link from 'next/link';

export default function Home() {
	const currentUser = 'Your Name';
	return (
		<main>
			<Navbar currentUser={currentUser} />
			<Container maxWidth='5xl'>
			<Heading size='xl' mb={10} mt={10} textAlign='center'>My Internships</Heading>
			<Stack gap={7}>
				<Flex justifyContent={'flex-end'}>
				<Button as={Link} href="/add">
					Add new internship
				</Button>
				</Flex>
			<InternshipsTable/>
			</Stack>
			</Container>
		</main>
	);
}
