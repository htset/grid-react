//indexing objects
function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj
  }
  
function TableRow(props: any){
    const item = props.item;
    const tableConfig = props.tableConfig;

    const columns = tableConfig.columns.map(
        (col:any) => {
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
  }

export default TableRow;  