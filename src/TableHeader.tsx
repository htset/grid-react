
function TableHeader(props: any){

    const headerRow = props.tableConfig.columns.map((col:any) => {
        if(props.sortColumn === col.name){
            if(props.sortOrder === "asc")
            return(<th id={col.name} key={col.name} onClick={props.changeTableSort}>{col.caption} /\</th>);
            else
            return(<th id={col.name} key={col.name} onClick={props.changeTableSort}>{col.caption} \/</th>);
        }
        else{
            return(<th id={col.name} key={col.name} onClick={props.changeTableSort}>{col.caption}</th>);
        }
    });

    return(
        <tr>
            {headerRow}
        </tr>
    );
}

export default TableHeader;