import { Suggestion } from '@/utils/address';
import {
	Button,
	HStack,
	Icon,
	Radio,
	RadioGroup,
	Stack,
	Text,
} from '@chakra-ui/react';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface VerifyAddressProps {
	entered: string;
	suggestions: Suggestion[];
	onSave?: (selected: Suggestion | undefined) => void;
}

export function VerifyAddress({
	entered,
	suggestions,
	onSave,
}: VerifyAddressProps) {
	const [value, setValue] = useState(suggestions[0].label);
	// Two possible values :
	// Undefined - the selected value is the entered address
	// Suggestions[] - list of suggestions
	const selectedSuggestion =
		value === entered
			? undefined
			: suggestions.find((suggest) => suggest.label === value);

	return (
		<Stack gap={4} fontSize="sm" background="gray.100" borderRadius="md" p={4}>
			<HStack color="red.500">
				<Icon as={AlertCircle} boxSize={6} />
				<Text fontSize="lg" fontWeight="500">
					Verify your address
				</Text>
			</HStack>

			<Text>
				We were not able to verify the address you provided, but found something
				similar. Please choose one of the following:
			</Text>

			<RadioGroup value={value} onChange={setValue} size="sm">
				<Stack gap={4}>
					<Stack gap={2}>
						<Text fontWeight="600">You entered:</Text>
						<Radio value={entered}>{entered}</Radio>
					</Stack>

					<Stack gap={2}>
						<Text fontWeight="600">Recommended address</Text>
						{suggestions.map((suggest) => (
							<Radio key={suggest.label} value={suggest.label}>
								{suggest.label}
							</Radio>
						))}
					</Stack>
				</Stack>
			</RadioGroup>

			<Button
				type="button"
				onClick={() => {
					onSave?.(selectedSuggestion);
				}}
			>
				Save
			</Button>
		</Stack>
	);
}
