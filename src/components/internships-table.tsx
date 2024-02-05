'use client';
import { InternshipsTableProps } from '@/api/internship/get-internships';
import { DateUtil } from '@/utils/date.util';
import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import { MdFileUpload } from 'react-icons/md';
import FileUpload from './upload-file-form';

const InternshipsTable = ({ data }: { data: InternshipsTableProps[] }) => {
	const [isUploadPopupOpen, setUploadPopupOpen] = useState(false);

	const openUploadPopup = () => {
		setUploadPopupOpen(true);
	};

	const closeUploadPopup = () => {
		setUploadPopupOpen(false);
	};

	return (
		<Table>
			<Thead>
				<Tr>
					<Th style={{ textAlign: 'center' }}>Title</Th>
					<Th style={{ textAlign: 'center' }}>Starting Date</Th>
					<Th style={{ textAlign: 'center' }}>End Date</Th>
					<Th style={{ textAlign: 'center' }}>Duration</Th>
					<Th style={{ textAlign: 'center' }}>Status</Th>
					<Th style={{ textAlign: 'center' }}>Salary</Th>
					<Th style={{ textAlign: 'center' }}>Documents</Th>
				</Tr>
			</Thead>
			<Tbody>
				{data && data.length > 0 ? (
					data.map((internship) => (
						<Tr key={internship.id}>
							<Td style={{ textAlign: 'center' }}>{internship.title}</Td>
							<Td style={{ textAlign: 'center' }}>
								{DateUtil.formatUSDate(internship.startDate)}
							</Td>
							<Td style={{ textAlign: 'center' }}>
								{DateUtil.formatUSDate(internship.endDate)}
							</Td>
							<Td style={{ textAlign: 'center' }}>
								{DateUtil.diffInDays(
									new Date(internship.startDate),
									new Date(internship.endDate)
								)}{' '}
								Days
							</Td>

							<Td style={{ textAlign: 'center' }}>{internship.status}</Td>
							<Td style={{ textAlign: 'center' }}>{internship.salary}</Td>
							<Td style={{ textAlign: 'center' }}>
								<IconButton
									aria-label="expand row"
									fontSize="2xl"
									icon={<MdFileUpload />}
									onClick={openUploadPopup}
								></IconButton>

								<FileUpload
									internshipID={internship.id}
									isOpen={isUploadPopupOpen}
									onClose={closeUploadPopup}
								/>
							</Td>
						</Tr>
					))
				) : (
					<Tr>
						<Td colSpan={7} textAlign="center">
							<p>No data is found.</p>
						</Td>
					</Tr>
				)}
			</Tbody>
		</Table>
	);
};

export default InternshipsTable;
