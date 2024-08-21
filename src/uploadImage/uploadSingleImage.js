import { upload } from '@vercel/blob/client';

const uploadSingleImage = async (ref) => {
  const file = ref.current.files[0]
  const newBlob = await upload(file.name, file, {
    access: 'public',
    handleUploadUrl: `${process.env.REACT_APP_BASE_URL}api/image/upload`,
  });
  return newBlob;
}

export default uploadSingleImage;