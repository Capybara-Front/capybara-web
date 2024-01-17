import React from 'react';
import {IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { MdFileUpload } from 'react-icons/md'

const InternshipsTable = ({}) => {
  return (
      <Table size='md'>
        <Thead>
          <Tr>
            <Th  style={{ textAlign: "center" }}>Internship ID</Th>
            <Th  style={{ textAlign: "center" }}>Starting Date</Th>
            <Th  style={{ textAlign: "center" }}>End Date</Th>
            <Th  style={{ textAlign: "center" }}>Duration</Th>
            <Th  style={{ textAlign: "center" }}>Title</Th>
            <Th  style={{ textAlign: "center" }}>Documents</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td style={{ textAlign: "center" }}>281233</Td>
            <Td style={{ textAlign: "center" }}>10/06/2023</Td>
            <Td style={{ textAlign: "center" }}>10/09/2023</Td>
            <Td style={{ textAlign: "center" }}>90 Days</Td>
            <Td style={{ textAlign: "center" }}>L3 Internship - Web Dev</Td>
            <Td style={{ textAlign: "center" }}>
              <IconButton
              aria-label="expand row"
              fontSize='2xl'
              icon={<MdFileUpload/>}>
              </IconButton>
            </Td>
          </Tr>
          <Tr>
            <Td style={{ textAlign: "center" }}>281213</Td>
            <Td style={{ textAlign: "center" }}>10/06/2024</Td>
            <Td style={{ textAlign: "center" }}>10/09/2024</Td>
            <Td style={{ textAlign: "center" }}>90 Days</Td>
            <Td style={{ textAlign: "center" }}>M1 Internship - App Dev</Td>
            <Td style={{ textAlign: "center" }}>
              <IconButton
              aria-label="expand row"
              fontSize='2xl'
              icon={<MdFileUpload/>}>
              </IconButton>
            </Td>
          </Tr>
        </Tbody>
      </Table>
  );
};

export default InternshipsTable;