import React, { Component } from 'react';
import Paginator from   '../common/paginator';
import Table from   '../common/table';
import {paginate} from '../utils/paginate';
import _ from 'lodash'
import axios from 'axios'
class DataInput extends Component {
 
  state = { 
    data:[],
    genres:[],
    pageSize:50,
    CurrentPage:1,
    sortColumn:{path:'id' ,order:'asc'},
    columns:[]
   }
   async componentDidMount(){
    const response=await axios.get('http://127.0.0.1:8000/dryout/api/emp/');
    const colKey=[]
    Object.keys(response.data[0]).map(col=>colKey.push({path:col,label:col}));
    // delete option
    if(true)
    colKey.push( {key:"delete",content:data=><button onClick={()=>this.handleDelete(data)} 
    className="btn btn-danger btn-sm m-2">Delete</button>})
    this.setState({data: response.data ,columns:colKey});
  }

  handleDelete=(dataDelete)=>{
  const data=this.state.data.filter(d=>d.id!==dataDelete.id);
   this.setState({data});

}
handlePageChange=(page)=> {
  this.setState({CurrentPage:page})};

handleSort=(sortColumn)=>{
  this.setState({sortColumn});
};

getPageContentToDisplay=()=>{
  const {data:allData,pageSize,CurrentPage,sortColumn}=this.state;
  const sorted=_.orderBy(allData,[sortColumn.path],[sortColumn.order]);
  const data=paginate(sorted,CurrentPage,pageSize)
  return {Count:allData.length,data}
};


  render() { 
    const {Count,data}=this.getPageContentToDisplay();
    const {pageSize,CurrentPage,sortColumn,columns}=this.state;
    if(Count===0) return <p>There are No data in Database</p>;
    return (  <div className="row">
    <div className='col-3'>
    <p>Showing {Count} data  in Database</p>
    <Paginator Count={Count}
     pageSize={pageSize} 
     CurrentPage={CurrentPage} onPageChange={this.handlePageChange}/>
    <Table columns={columns} sortColumn={sortColumn} data={data} onSort={this.handleSort}/>
</div>
</div> );
  }
}
 
export default DataInput;