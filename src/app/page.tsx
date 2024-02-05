'use client';
import {
	getInternships,
	type InternshipsTableProps,
} from '@/api/internship/get-internships';
import InternshipsTable from '@/components/internships-table';
import { Button, Container, Flex, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
	const [internships, setInternships] = useState<InternshipsTableProps[]>([]);

	useEffect(() => {
		const fetchInternshipsData = async () => {
			try {
				const data = await getInternships();
				setInternships(data);
				console.log(data);
			} catch (error) {
				console.error('Error fetching my internships', error);
			}
		};
		fetchInternshipsData();
	}, []);

	return (
		<main>
			<Container maxWidth="7xl" pt={16}>
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
