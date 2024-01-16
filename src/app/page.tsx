import { Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function Home() {
	return (
		<main>
			<Button as={Link} href="/add">
				Add new internship
			</Button>
		</main>
	);
}
