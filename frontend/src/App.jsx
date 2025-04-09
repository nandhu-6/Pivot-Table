import { useState, useRef } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

function App() {

  const [headerArr, setHeaderArr] = useState([]); //contains headers for thead
  const [bodyArr, setBodyArr] = useState([]); //contains array body values of table for tbody
  const [data, setData] = useState([]);

  const fileInputRef = useRef();

  const handleFileClick = () => {
    fileInputRef.current.click(); // access the DOM element directly which is : <input> tag.click
    // console.log(fileInputRef.current); => has <input> tag
    
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const fileType = file.type;
    // console.log(file);
    console.log(fileType);
    
    

    if (fileType === 'text/csv') {

      Papa.parse(file, {
        header: true, // first row of csv file contains column headers
        dynamicTyping: true,
        skipEmptyLines: true, // empty rows are ignored while parsing
        complete: (results) => {
          console.log("results = ", results);
          //data inside results contain the entire array with zeroth index being header
          const headerArr = Object.keys(results.data[0]);
          const bodyArr = [];

          results.data.map((d) =>{
            //console.log(d); //maps each row region : india, product : p1, sales : 10
            
            bodyArr.push(Object.values(d))
          })
          
          setData(results.data)
          setHeaderArr(headerArr)
          setBodyArr(bodyArr);
          console.log("header", headerArr);
          console.log("body", bodyArr);
          
          
        },
        error: (error) => {
          console.error('Error parsing CSV file:', error);
        }
      });

    // } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //     // console.log("event",event);
    //     const data = new Uint8Array(event.target.result);
    //     // console.log("data : ",data);
    //     const workbook = XLSX.read(data, { type: 'array' });
    //     // console.log("workbook :", workbook);
    //     const sheetName = workbook.SheetNames[0]; //sheetname
    //     // console.log("sheetName :", sheetName);
    //     const worksheet = workbook.Sheets[sheetName]; //lists cells which are filled
    //     // console.log("worksheet :", worksheet);
    //     const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    //     console.log("jsondata" , jsonData);

    //     jsonData.map((d) =>{
    //       //console.log(d); //maps each row region : india, product : p1, sales : 10
          
    //       bodyArr.push(Object.values(d))
    //     })
        
    //     setData(jsonData)
    //     setHeaderArr(headerArr)
    //     setBodyArr(bodyArr);
    //     console.log("header", headerArr);
    //     console.log("body", bodyArr);
        
        
    //   };
    //   reader.readAsArrayBuffer(file);
    
  } else {
      console.error('Please upload a valid CSV or XLSX file.');
    }
  };

  return (
    <div>
      {/* input component */}
      <div className="flex flex-col items-end h-1/4">
      {/* Hidden input */}
      <input
        type="file"
        name="file"
        accept=".csv, .xlsx"
        onChange={handleFileUpload}
        ref={fileInputRef}
        className="hidden"
      />

      {/* Custom button : just a button does nothing but calls handlefileclick where useref is there which in turn has the input tag inside it */}
      {/* so basically u r using input file with a button */}
      <button
        onClick={handleFileClick}
        className="bg-purple-400 hover:bg-purple-600 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded shadow"
      >
        Import File
      </button>
    </div>

      {/* <input type="file" name='file' accept='.csv, .xlsx' onChange={handleFileUpload} /> */}

      {/* table component */}
      <table className='table border-collapse border border-gray-600 mt-10 mx-auto'>
        <thead>
          <tr>
            {headerArr.map((headerVal, i)=>(
              <th className="border border-gray-400 px-4 py-2 bg-purple-100" key={i}>{headerVal}</th>
            )
            )}
          </tr>
        </thead>
        <tbody>
          {bodyArr.map((row,i)=> ( //bodyarr has all body in array (rows of body data)
              <tr key={i}>
                {row.map((bodyVal, i)=>(
                  <td className="border border-gray-400 px-4 py-2" key={i}>{bodyVal}</td>
          ))}
              </tr>
          ))}
        
        </tbody>
      </table>
      
    </div>
  );
}

export default App;

