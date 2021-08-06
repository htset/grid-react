import React, { useState } from 'react';
import './App.css';
import { Server } from "miragejs";
import Table from './Table';

const mockItems = [
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
  {id:13, name:"ii", price: 12.55, imgUrl:"images/9.png"},
  {id:14, name:"ii", price: 12.55, imgUrl:"images/9.png"}
];

new Server({
  routes() {
    this.namespace = "api";
    
    this.get("/items/", (schema, request) => {
      let filters: any[] = JSON.parse(request.queryParams.filters);
      let returnItems = mockItems
        .sort((a:any, b:any) => {
          if(request.queryParams.sortOrder === "asc"){
            if(a[request.queryParams.sortColumn] < b[request.queryParams.sortColumn])
              return -1;
            else if(a[request.queryParams.sortColumn] === b[request.queryParams.sortColumn])
              return 0;
            else
              return 1;
          }
          else{
            if(a[request.queryParams.sortColumn] > b[request.queryParams.sortColumn])
              return -1;
            else if(a[request.queryParams.sortColumn] === b[request.queryParams.sortColumn])
              return 0;
            else
              return 1;
          }
        })
        .filter((item:any) => {
          let itemShouldBeAdded: boolean = true;
          filters.forEach((filter:any) => {
            if(!item[filter.column].toString().includes(filter.value)){
              itemShouldBeAdded = false;
            }
          });
          return itemShouldBeAdded;
        });
      return {
        items: returnItems.slice(parseInt(request.queryParams.start), parseInt(request.queryParams.start) + parseInt(request.queryParams.offset)),
        total: returnItems.length
      }
    });
  }
});


const tableConfig = {
  idColumn: "id",
  columns: [
    {name: "id", caption: "", type:"imgA", urlPrefix:"items", imgWidth:"70px"},
    {name: "name", caption: "Item Name", type:"a", urlPrefix:"items" },
    {name: "price", caption: "Price", type: "text"}
  ],
  sortColumn: "price",
  sortOrder: "desc",
  pageSize: 3,
  showPagesCount: 4
}

function App() {

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  function getItems(currentPage:number, pageSize:number, filters:any[], sortColumn:string, sortOrder:string) {

    fetch("/api/items?start=" + (currentPage-1)*pageSize + "&offset=" + pageSize + "&filters=" + JSON.stringify(filters) + "&sortColumn=" + sortColumn + "&sortOrder=" + sortOrder)
      .then(response => response.json())
      .then((data) => {
        setItems(data.items);
        setTotalPages(Math.ceil(data.total / pageSize));
      });
  }

  return(<Table tableConfig={tableConfig} items={items} totalPages={totalPages} getItems={getItems}/>)
}

export default App;
