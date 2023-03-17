import React, { useState } from "react";
import readXlsxFile from "read-excel-file";

interface FileInputReadExcelProps {
  onChange: (data: any[][]) => void;
}

const FileInputReadExcel: React.FC<FileInputReadExcelProps> = ({ onChange }) => {
  const [file, setFile] = useState<File>();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      try {
        const data = await readXlsxFile(selectedFile);
        setFile(selectedFile);
        onChange(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
    </div>
  );
};

export default FileInputReadExcel;
