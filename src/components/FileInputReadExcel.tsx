import React, { useState } from "react";
import readXlsxFile from "read-excel-file";

const FileInputReadExcel: React.FC = () => {
  const [excelData, setData] = useState<File>();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      try {
        const data = await readXlsxFile(selectedFile);
        setData(selectedFile);
        handleExcelDataChange(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleExcelDataChange = (data: any[][]) => {
    const headers = data[0]; // 첫번째 행을 헤더로 사용
    const rows = data.slice(1); // 첫번째 행을 제외한 나머지 행을 데이터로 사용

    const formattedData = rows.map((row) =>
      headers.reduce((acc, header, index) => {
        acc[header] = row[index];
        return acc;
      }, {})
    );
    console.log(formattedData);
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
    </div>
  );
};

export default FileInputReadExcel;
