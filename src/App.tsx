import React, { useState } from 'react';
import './App.css';
import TableRow from './TableRow';
import TableHeader from './TableHeader';

const items = [
  {id:1, name:"aa", price: 10.25, imgUrl:"images/1.png"},
  {id:2, name:"bb", price: 1.50, imgUrl:"images/2.png"},
  {id:3, name:"cc", price: 4.65, imgUrl:"images/3.png"},
  {id:4, name:"dd", price: 101.25, imgUrl:"images/4.png"},
  {id:5, name:"ee", price: 12.50, imgUrl:"images/5.png"},
  {id:6, name:"ff", price: 43.65, imgUrl:"images/6.png"}
];

const tableConfig = {
  idColumn: "id",
  columns: [
    {name: "id", caption: "", type:"imgA", urlPrefix:"items", imgWidth:"70px"},
    {name: "name", caption: "Item Name", type:"a", urlPrefix:"items" },
    {name: "price", caption: "Price", type: "text"}
  ],
  sortColumn: "price",
  sortOrder: "desc"
}

function App() {

  const [sortOrder, setSortOrder] = useState(tableConfig.sortOrder);
  const [sortColumn, setSortColumn] = useState(tableConfig.sortColumn);

  function toggleSortOrder() {
    setSortOrder((sortOrder === 'asc')? "desc": "asc");
  }

  function changeTableSort(e: React.MouseEvent){
    console.log(e);
    if(sortColumn === e.currentTarget.id){
      toggleSortOrder();
    }
    else{
      setSortColumn(e.currentTarget.id);
      setSortOrder("asc");
    }
  }

  function tableSorter(a:any, b:any): number {
      if(sortOrder === "asc"){
        if(a[sortColumn] < b[sortColumn])
          return -1;
        else if(a[sortColumn] === b[sortColumn])
          return 0;
        else
          return 1;
      }
      else{
        if(a[sortColumn] > b[sortColumn])
          return -1;
        else if(a[sortColumn] === b[sortColumn])
          return 0;
        else
         return 1;
      }
  }

  const tableRows = items.sort(tableSorter).map((item) => 
    <TableRow item={item} tableConfig={tableConfig} /> 
  );


  return (
    <div className="App">

      <table className="table table-striped">
        <TableHeader sortColumn={sortColumn} sortOrder={sortOrder} changeTableSort={changeTableSort} tableConfig={tableConfig}/>       
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  );
}

export default App;
