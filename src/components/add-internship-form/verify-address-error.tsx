import { Button, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { AlertCircle } from 'lucide-react';

interface VerifyAddressErrorProps {
	onSave?: () => void;
}

export function VerifyAddressError({ onSave }: VerifyAddressErrorProps) {
	return (
		<Stack gap={4} fontSize="sm" background="gray.100" borderRadius="md" p={4}>
			<HStack color="red.500">
				<Icon as={AlertCircle} boxSize={6} />
				<Text fontSize="lg" fontWeight="500">
					Verify your address
				</Text>
			</HStack>

			<Text>
				We were not able to verify the address you provided. Please enter a new
				address or click on the button below to dismiss this message.
			</Text>

			<Button
				type="button"
				onClick={() => {
					onSave?.();
				}}
			>
				Dismiss
			</Button>
		</Stack>
	);
}
