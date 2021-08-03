import React, { useState } from 'react';
import './App.css';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import TablePagination from './TablePagination';

const items = [
  {id:1, name:"aa", price: 10.25, imgUrl:"images/1.png"},
  {id:2, name:"bb", price: 1.50, imgUrl:"images/2.png"},
  {id:3, name:"cc", price: 4.65, imgUrl:"images/3.png"},
  {id:4, name:"dd", price: 101.25, imgUrl:"images/4.png"},
  {id:5, name:"ee", price: 12.50, imgUrl:"images/5.png"},
  {id:6, name:"ff", price: 43.65, imgUrl:"images/6.png"},
  {id:7, name:"gg", price: 11.65, imgUrl:"images/7.png"},
  {id:8, name:"hh", price: 1.50, imgUrl:"images/8.png"},
  {id:9, name:"ii", price: 12.55, imgUrl:"images/9.png"},
  {id:10, name:"hh", price: 1.50, imgUrl:"images/8.png"},
  {id:11, name:"ii", price: 12.55, imgUrl:"images/9.png"},
  {id:12, name:"hh", price: 1.50, imgUrl:"images/8.png"},
  {id:13, name:"ii", price: 12.55, imgUrl:"images/9.png"}
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
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const showPagesCount = 4;
  let totalPages = Math.ceil(items.length / pageSize);

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

  function onChangePage(newPage:number){
    console.log(newPage);
    setCurrentPage(newPage);
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
      <TablePagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          showPagesCount={showPagesCount}
          onChangePage={onChangePage}/>

    </div>
  );
}

export default App;
