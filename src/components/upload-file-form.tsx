// FileUploadPopup.js
import { uploadDocuments } from '@/api/internship/upload-documents';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { Dashboard, useUppy } from '@uppy/react';

type UploadFileFormProps = {
  internshipID: string;
  isOpen: boolean;
  onClose: () => void;
}


const FileUpload: React.FC<UploadFileFormProps> = ({ internshipID, isOpen, onClose }) => {

  async function handleUpload(files: File[]) {
    if (files.length > 0) {
      await uploadDocuments(internshipID, files);
      onClose();
    }
  }

  const uppy = useUppy(() => {
    const uppyInstance = new Uppy({
      meta: { type: 'document' },
      restrictions: { allowedFileTypes: ['.pdf'] },
      autoProceed: false,
    });

    uppyInstance.on('upload', () => {
      handleUpload(uppyInstance.getFiles().map((file) => file.data) as File[]);
    });
    return uppyInstance;
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" aria-labelledby="contained-modal-title-vcenter"
      isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload New Documents</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Dashboard uppy={uppy} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FileUpload;