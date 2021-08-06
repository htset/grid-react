import React from "react";

function TableFilterRow(props:any){

    function onFilterTextChange(e:React.KeyboardEvent<HTMLInputElement>){
        props.updateFilter([{column: e.currentTarget.id, value: e.currentTarget.value}]);
    }

    const filterRow = props.tableConfig.columns.map((col:any) => {
        return(<td key={col.name}><input type="text" id={col.name} onKeyUp={onFilterTextChange} ></input></td>);
    });

    return(
        <tr>
            {filterRow}
        </tr>
    );    
}

export default TableFilterRow;