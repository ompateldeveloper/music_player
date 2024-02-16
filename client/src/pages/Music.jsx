import React, { useState } from 'react';
import axios from 'axios';

const MusicForm = () => {
  const [audioFile, setAudioFile] = useState(null);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission

    if (!audioFile) {
      console.error('Please select an audio file');
      return;
    }

    const formData = new FormData();
    formData.append('audio', audioFile);

    try {
      const response = await axios.post('/api/v1/music', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default MusicForm;
