import React from 'react';
import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { MdFileUpload } from 'react-icons/md'

const InternshipsTable = ({ data }) => {
  return (
    <Table size='md'>
      <Thead>
        <Tr>
          <Th style={{ textAlign: "center" }}>Internship ID</Th>
          <Th style={{ textAlign: "center" }}>Starting Date</Th>
          <Th style={{ textAlign: "center" }}>End Date</Th>
          <Th style={{ textAlign: "center" }}>Duration</Th>
          <Th style={{ textAlign: "center" }}>Title</Th>
          <Th style={{ textAlign: "center" }}>Documents</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          data.map((internship: any) => (
            <Tr key={internship.id}>
              <Td style={{ textAlign: "center" }}>{internship.id}</Td>
              <Td style={{ textAlign: "center" }}>{internship.startDate}</Td>
              <Td style={{ textAlign: "center" }}>{internship.endDate}</Td>
              <Td style={{ textAlign: "center" }}>{internship.duration}</Td>
              <Td style={{ textAlign: "center" }}>{internship.title}</Td>
              <Td style={{ textAlign: "center" }}>
                <IconButton
                  aria-label="expand row"
                  fontSize='2xl'
                  icon={<MdFileUpload />}>
                </IconButton>
              </Td>
            </Tr>
          ))
        }
      </Tbody>
    </Table>
  );
};

export default InternshipsTable;