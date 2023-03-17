import * as XLSX from "xlsx";

interface ExcelRow {
  [key: string]: string;
}

export default function FileInputXLSX() {
  let arrayData: ExcelRow[] = [];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      arrayData = XLSX.utils.sheet_to_json(sheet);

      // Use the arrayData here
    };
    reader.readAsBinaryString(file);
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
