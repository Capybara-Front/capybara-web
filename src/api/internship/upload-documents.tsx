export async function uploadDocument(internshipID: any, files : File[]) {
	try {

        const formData = new FormData();
        const metadata = [];

        for (let i = 0; i<files.length; i++){
            formData.append('files', files[i]);
            metadata.push({filename:files[i].name,levelOfConfidentiality:1})
        };

        formData.append('data',JSON.stringify({metadata}));

		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents/internships/${internshipID}`, {
			method: 'POST',
			body: formData,
		});

        if (!res.ok){
            throw new Error('Failed to upload document');
        }

        try {
            const jsonResponse = await res.json();
            console.log('Res : ', jsonResponse);
        } catch (jsonError) {
            console.log('Error parsing JSON: ', jsonError);
        }

	} catch (err) {
        console.log('----RES failed', err);
		Promise.reject(new Error('Unable to upload Documents.'));
	}
}
