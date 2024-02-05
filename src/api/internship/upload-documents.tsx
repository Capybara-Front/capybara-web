type FileMetadata = {
    filename: string;
    levelOfConfidentiality: number;
}

export async function uploadDocuments(internshipID: any, files: File[]) {
    try {

        const formData = new FormData();
        const metadata: FileMetadata[] = [];

        files.forEach((file) => {
            metadata.push({ filename: file.name, levelOfConfidentiality: 1 });
            formData.append('files', file);
        });

        formData.append('data', JSON.stringify({ metadata }));

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents/internships/${internshipID}`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            throw new Error('Failed to upload documents');
        }

        await res.json();
    } catch (err) {
        console.error('Unable to upload documents', err);
        Promise.reject(new Error('Unable to upload Documents.'));
    }
}
