'use client';
import React, { useState } from 'react';
import {IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { MdFileUpload } from 'react-icons/md';
import FileUpload from './upload-file-form';
import { InternshipsTableProps } from '@/api/internship/get-internships';

const InternshipsTable = ({ data }: { data: any}) => {

  const [isUploadPopupOpen, setUploadPopupOpen] = useState(false);

  const openUploadPopup = () => {
    setUploadPopupOpen(true);
  };

  const closeUploadPopup = () => {
    setUploadPopupOpen(false);
  };

  const handleUpload = (file) => {
    // Implement logic to handle the file upload
    console.log('Uploading file:', file);
  };

  console.log('----data : ', data);

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
            <Td style={{ textAlign: "center" }}>'data.id'</Td>
            <Td style={{ textAlign: "center" }}>"data.startDate"</Td>
            <Td style={{ textAlign: "center" }}>"data.endDate"</Td>
            <Td style={{ textAlign: "center" }}>90 Days</Td>
            <Td style={{ textAlign: "center" }}>'data.title'</Td>
            <Td style={{ textAlign: "center" }}>
              <IconButton
              aria-label="expand row"
              fontSize='2xl'
              icon={<MdFileUpload/>}
              onClick={openUploadPopup}>
              </IconButton>

              <FileUpload
              isOpen={isUploadPopupOpen}
              onClose={closeUploadPopup}
              onUpload={handleUpload}
               />
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
              icon={<MdFileUpload/>}
              onClick={openUploadPopup}>
              </IconButton>

              <FileUpload
              isOpen={isUploadPopupOpen}
              onClose={closeUploadPopup}
              onUpload={handleUpload}
               />
            </Td>
          </Tr>
        </Tbody>
      </Table>
  );
};

export default InternshipsTable;