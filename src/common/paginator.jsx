import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
const Paginator = props => {
    const {Count,pageSize,CurrentPage,onPageChange}=props;
    const pagesCount=Math.ceil(Count/pageSize);
    if(pagesCount===1) return null;
    const pages=_.range(1,pagesCount+1);
    
    return ( <ul className="pagination">
            {pages.map(page=>
            <li key={page} 
            className={CurrentPage===page?"page-item active":"page-item"}>
                <a onClick={()=>onPageChange(page)} className="page-link clickable">{page}</a></li>)}
          </ul> );
};
Paginator.propTypes={
    Count:PropTypes.number.isRequired,
    pageSize:PropTypes.number.isRequired,
    CurrentPage:PropTypes.number.isRequired,
    onPageChange:PropTypes.func.isRequired
};
 
export default Paginator;