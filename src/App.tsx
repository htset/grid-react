import './App.css';

//indexing objects
function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj
}

const items = [
  {id:1, name:"aa", price: 10.25},
  {id:2, name:"bb", price: 1.50},
  {id:3, name:"cc", price: 4.65},
  {id:4, name:"dd", price: 101.25},
  {id:5, name:"ee", price: 12.50},
  {id:6, name:"ff", price: 43.65}
];

const tableConfig = {
  columns: [
    {name: "id", caption: "ID", type:"a", urlPrefix:"items"},
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

        if(col.type == "a"){
          const url = col?.urlPrefix + "/" + item.id;
          return(
            <td>
              <a href={url}>{itemText}</a>
            </td>
          )
        }
        else if(col.type == "text"){
          return(
            <td>{itemText}</td>
          )
        }
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
