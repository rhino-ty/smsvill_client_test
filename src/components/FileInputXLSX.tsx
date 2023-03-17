import { read, utils, WorkSheet } from "xlsx";
import { useState } from "react";

interface ExcelRow {
  [key: string]: string;
}

export default function FileInputXLSX() {
  const [arrayData, setArrayData] = useState<ExcelRow[]>([]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const workbook = await read(file, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet: WorkSheet = workbook.Sheets[sheetName];
    const newData = utils.sheet_to_json<ExcelRow>(sheet);
    setArrayData(newData);
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <ul>
        {arrayData.map((row, index) => (
          <li key={index}>{JSON.stringify(row)}</li>
        ))}
      </ul>
    </>
  );
}
