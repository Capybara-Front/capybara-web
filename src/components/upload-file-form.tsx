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
} from '@chakra-ui/react';
import { uploadDocument } from '@/api/internship/upload-documents';

const FileUpload = ({ internshipID, isOpen, onClose, onUpload }) => {

  const uppy = useUppy(() => {
    const uppyInstance = new Uppy();

    uppyInstance.on('file-added',(file) => {
      console.log('File added :', file);
    })

    uppyInstance.on('complete',async(result) => {

      try{
        const files = uppy.getFiles();

        if(files.length > 0){
          uploadDocument(internshipID,files);
          const uploadedFiles = result.successful.map((file) => file.data);
          onUpload(uploadedFiles);
          onClose();
        }
        else{
          console.error('Upload failed ',result.failed);
        }
      }
      catch (error){
        console.error('Error during upload ',error);
      }
  });
  return uppyInstance;
},[]);

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