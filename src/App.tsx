import './App.css';

//indexing objects
function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj
}

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
  ]
}

function App() {

  const tableRows = items.map((item) => {
    const columns = tableConfig.columns.map(
      (col) => {
        let itemText:any = "";
        if(hasKey(item, col.name))
          itemText = item[col.name];
        else
          itemText = "error";

        let id:any = "";
        if(hasKey(item, tableConfig.idColumn))
          id = item[tableConfig.idColumn];
        else
          id = "error";

        const url = col?.urlPrefix + "/" + id;
        if(col.type === "a"){
          return(
            <td>
              <a href={url}>{itemText}</a>
            </td>
          )
        }
        else if(col.type === "text"){
          return(
            <td>{itemText}</td>
          )
        }
        else if(col.type === "imgA"){
          return(
            <td><a href={url}><img src={item?.imgUrl} alt="img" width={col.imgWidth ?? "50px"}/></a></td>
          )
        }
        return "";
      }
    )
    return(
      <tr key={item.id}>
        {columns}
      </tr>
    )
  });

  const tableHeader = tableConfig.columns.map((col) =>
    <th>{col.caption}</th>
  );

  return (
    <div className="App">
      <table className="table table-striped">
        {tableHeader}
        {tableRows}
      </table>
    </div>
  );
}

export default App;
