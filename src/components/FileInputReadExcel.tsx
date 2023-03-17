import React, { useState } from "react";
import readXlsxFile from "read-excel-file";

interface DataInExcel {
  핸드폰번호: string;
  이름: string;
  그룹: string;
  팩스: string | null;
  이메일: string | null;
  메모: string | null;
}

const FileInputReadExcel: React.FC = () => {
  const [formattedData, setFormattedData] = useState<DataInExcel[]>([]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      try {
        const data = await readXlsxFile(selectedFile);
        handleExcelDataChange(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleExcelDataChange = (data: any) => {
    const headers = data[0]; // 첫번째 행을 헤더로 사용
    const rows = data.slice(1); // 첫번째 행을 제외한 나머지 행을 데이터로 사용

    const formattingData = rows.map((row: string[]) =>
      headers.reduce((acc: any, header: any, index: any) => {
        acc[header] = row[index];
        return acc;
      }, {})
    );
    console.log(formattingData);
    setFormattedData(formattingData);
  };

  return (
    <>
      <div>
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
      </div>
      <ul>
        {!!formattedData
          ? formattedData.map((data) => (
              <li key={data.핸드폰번호}>
                {data.핸드폰번호}, {data.이름}, {data.그룹}
              </li>
            ))
          : null}
      </ul>
    </>
  );
};

export default FileInputReadExcel;
