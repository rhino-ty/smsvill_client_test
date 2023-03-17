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
    <main className="mx-60">
      <div className="mt-4 flex flex-col items-center">
        <label className="text-gray-700 font-bold mb-2">엑셀 파일을 선택하세요.</label>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          className="py-2 px-3 border border-gray-400 rounded-md"
        />
      </div>
      {/* <ul>
        {!!formattedData
          ? formattedData.map((data) => (
              <li key={data.핸드폰번호}>
                {data.핸드폰번호}, {data.이름}, {data.그룹}
              </li>
            ))
          : null}
      </ul> */}
      {!!formattedData ? (
        <table className="table-auto mt-8 w-full text-center">
          <thead>
            <tr>
              <th className="px-4 py-2">핸드폰번호</th>
              <th className="px-4 py-2">이름</th>
              <th className="px-4 py-2">그룹</th>
            </tr>
          </thead>
          <tbody>
            {formattedData.map((data) => (
              <tr key={data.핸드폰번호}>
                <td className="border px-4 py-2">{data.핸드폰번호}</td>
                <td className="border px-4 py-2">{data.이름}</td>
                <td className="border px-4 py-2">{data.그룹}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </main>
  );
};

export default FileInputReadExcel;
