import React from 'react';
import JSZip from 'jszip';

interface FileUploaderProps {
  onFileUpload: (data: Uint8Array, width: number, height: number) => void;
  setloading: (loading: boolean) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload, setloading }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setloading(true);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async function (e) {
        const arrayBuffer = e.target?.result;
        if (arrayBuffer instanceof ArrayBuffer) {
          try {
            const zip = await JSZip.loadAsync(arrayBuffer);
            const fileNames = Object.keys(zip.files);
            
            const gridFile = zip.files[fileNames[0]];
            const data = new Uint8Array(await gridFile.async('arraybuffer'));

            const width = 36000;
            const height = 17999;
            console.log(data);
            onFileUpload(data, width, height);
          } catch (error) {
            console.error('Error reading zip file:', error);
          }
        } else {
          console.error('File reading failed: Result is not an ArrayBuffer');
        }
        setloading(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div style={{ display: 'flex', padding: 20 }}>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        style={{}}
      />
    </div>
  );
};

export default FileUploader;
