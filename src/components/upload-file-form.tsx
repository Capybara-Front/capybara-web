// FileUploadPopup.js
import { useState } from 'react';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { Dashboard, useUppy } from '@uppy/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Input,
  Box,
  IconButton,
} from '@chakra-ui/react';

const FileUpload = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const getUploadParams = ({}) => {
    return { url: "https://httpbin.org/post" };
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      onClose();
    }
  };

  const uppy = useUppy(() => {
    return new Uppy();
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" aria-labelledby="contained-modal-title-vcenter"
    isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload New Documents</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
           <Dashboard uppy={uppy}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FileUpload;