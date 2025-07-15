import React from 'react';
import { addCollectionAndDocuments } from '../../utils/firebase/firebase.utils';
import SHOP_DATA from '../../shop.data.js';

const UploadComponent = () => {
  const handleUpload = async () => {
    console.log('Uploading SHOP_DATA...');
    try {
      await addCollectionAndDocuments('categories', SHOP_DATA);
      alert('✅ Upload complete! Check Firestore.');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload SHOP_DATA</h2>
      <button onClick={handleUpload}>Upload to Firestore</button>
    </div>
  );
};

export default UploadComponent;
