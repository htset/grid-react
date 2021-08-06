import TableRow from './TableRow';
import TableHeader from './TableHeader';
import TablePagination from './TablePagination';
import { useEffect, useState } from 'react';
import TableFilterRow from './TableFilterRow';

function Table(props:any){
  const [sortOrder, setSortOrder] = useState(props.tableConfig.sortOrder);
  const [sortColumn, setSortColumn] = useState(props.tableConfig.sortColumn);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<any[]>([]);

  const getItems = props.getItems; 
  const pageSize = props.tableConfig.pageSize;   

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  useEffect(() => {
    getItems(currentPage, pageSize, filters, sortColumn, sortOrder);
  }, [currentPage, filters, sortOrder, sortColumn]);  
  /////////////////////////////////////
  // Sorting
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

  /*
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
*/  
  /////////////////////////////////////

  function onChangePage(newPage:number){
    console.log(newPage);
    setCurrentPage(newPage);
  }

  /////////////////////////////////////
  //Filtering
/*  
  function tableFilter(item: any){
    let includeItem:boolean = true;
    [...filters].forEach((filter:any) => {    //note the spread operator (we have HTMLCollection not Array)
      if(!item[filter.column].toString().includes(filter.value))
        includeItem = false;      
    });
    return includeItem;
  }
*/

  function updateFilter(filterSegment:any){
    let tempFilter = [...filters];  //Copy the state, not mutate it !!
    if(tempFilter.length === 0)
      tempFilter = filterSegment;
    else{
      //first, update existing filters
      for(var i = 0; i < tempFilter.length; i++) {
        for(var j = 0; j < filterSegment.length; j++) {
          if(tempFilter[i].column === filterSegment[j].column) {
            if(filterSegment[j].value === "")
              tempFilter.splice(i, 1);
            else
              tempFilter.splice(i, 1, filterSegment[j]);
            break;
          }
        }
      } 
      
      //then, add new filters
      for(i = 0; i < filterSegment.length; i++) {
        if( filterSegment[i].value !== ""){
          let foundDuplicate = false;
          for(j = 0; j < tempFilter.length; j++) {
            if(tempFilter[j].column === filterSegment[i].column) {
              foundDuplicate = true;
              break;
            }
          }
          if(!foundDuplicate)
            tempFilter.push(filterSegment[i]);
        }
      } 
    }
    setFilters(tempFilter);
    console.log(tempFilter);
  }
  /////////////////////////////////////

  const tableRows = props.items
//    .filter(tableFilter)
//    .sort(tableSorter)
    .map((item:any) => 
      <TableRow key={item.id} item={item} tableConfig={props.tableConfig} /> 
    );
  
  return (
    <div className="App">
      <table className="table table-striped">
        <thead>
          <TableHeader 
            sortColumn={sortColumn} 
            sortOrder={sortOrder} 
            changeTableSort={changeTableSort} 
            tableConfig={props.tableConfig}/>       
        </thead>
        <tbody>
          <TableFilterRow
            tableConfig={props.tableConfig}
            updateFilter={updateFilter}/>
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