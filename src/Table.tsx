import TableRow from './TableRow';
import TableHeader from './TableHeader';
import TablePagination from './TablePagination';
import { useEffect, useState } from 'react';

function Table(props:any){
    const [sortOrder, setSortOrder] = useState(props.tableConfig.sortOrder);
    const [sortColumn, setSortColumn] = useState(props.tableConfig.sortColumn);
    const [currentPage, setCurrentPage] = useState(1);

        
    useEffect(() => {
        props.getItems(currentPage, props.tableConfig.pageSize)
    }, [currentPage]);

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
    
      const tableRows = props.items.sort(tableSorter).map((item:any) => 
        <TableRow item={item} tableConfig={props.tableConfig} /> 
      );
    
      return (
        <div className="App">
          <table className="table table-striped">
            <TableHeader sortColumn={sortColumn} sortOrder={sortOrder} changeTableSort={changeTableSort} tableConfig={props.tableConfig}/>       
            <tbody>
              {tableRows}
            </tbody>
          </table>
          <TablePagination 
              currentPage={currentPage} 
              totalPages={props.totalPages} 
              showPagesCount={props.tableConfig.showPagesCount}
              onChangePage={onChangePage}/>
        </div>
      );
}

export default Table;