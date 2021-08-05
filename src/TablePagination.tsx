import { ReactElement } from 'react';
import Pagination from 'react-bootstrap/Pagination';

function TablePagination(props:any){

    let prev, next:ReactElement;

    if(props.currentPage === 1)
        prev = <Pagination.Prev disabled={true}/>
    else
        prev = <Pagination.Prev onClick={() => props.onChangePage(props.currentPage-1)}/>

    if(props.currentPage === props.totalPages)
        next = <Pagination.Next disabled={true}/>
    else
        next = <Pagination.Next onClick={() => props.onChangePage(props.currentPage+1)}/>  

    let pageNumbers = [];
    let addedPagesToArray = 0;
    let i = 0;
    //first, insert "showPagesCount" pages in the array
    for(i= props.currentPage - Math.round(props.showPagesCount/2); i < props.currentPage + Math.round(props.showPagesCount/2); i++){
        if(i > 0 && i <= props.totalPages){
            pageNumbers.push({page: i, active: (i === props.currentPage)});
            addedPagesToArray++;
        }     
    }

    //then, pad the array to the right, so that total count is "showPagesCount"
    for(let j=i; j<= props.showPagesCount; j++){
        if(j < props.totalPages){
            pageNumbers.push({page: j, active: (j === props.currentPage)});
            addedPagesToArray++;
        }
    }

    //finally, pad to the left
    if(addedPagesToArray < props.showPagesCount && pageNumbers.length > 0){
        pageNumbers.unshift({page: pageNumbers[0].page - 1, active: false});
    }

    const pages = pageNumbers.map((item) => {
        return(<Pagination.Item 
                    active={item.active} 
                    activeLabel="" 
                    key={item.page}
                    onClick={() => props.onChangePage(item.page)}>
                        {item.page}
                </Pagination.Item>);
    });

    return(
        <Pagination>
            {prev}
            {pages}
            {next}
      </Pagination>
    )
}

export default TablePagination;