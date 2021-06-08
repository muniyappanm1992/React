import React, { Component } from 'react';
import Paginator from   '../common/paginator';
import Table from   '../common/table';
import {paginate} from '../utils/paginate';
import _ from 'lodash'
import axios from 'axios'
class DataInput extends Component {
  state = { 
    baseUrl:'http://127.0.0.1:8000/dryout/api/yv208/',
    data:[],
    pageSize:10,
    CurrentPage:1,
    sortColumn:{path:'id' ,order:'desc'},
    columns:[]
   }
   async componentDidMount(){
    this.getRestAPi();
  }

getRestAPi=async ()=>{
    const response=await axios.get(this.state.baseUrl);
    const colKey=[]
    if (response.data.length!==0)
    Object.keys(response.data[0]).map(col=>colKey.push({path:col,label:col}));
    // delete option
    if(true)
    colKey.push( {key:"delete",content:data=><button onClick={()=>this.handleDelete(data)} 
    className="btn btn-danger btn-sm m-2">Delete</button>})
    this.setState({data: response.data ,columns:colKey});
  }

handleAdd=async ()=>{
  const obj={Name:"Muniyappan",Age:"28"}
  const response=await axios.post(this.state.baseUrl,obj)
  const temp=[response.data,...this.state.data]
  this.setState({data: temp});
  if (this.state.data.length===1) this.getRestAPi();
}

handleDelete=async (dataDelete)=>{ 
    try {
      const x=await axios.delete(this.state.baseUrl+dataDelete.id);
      if (x.status===204){
        const data=this.state.data.filter(d=>d.id!==dataDelete.id);
        this.setState({data});
        return;
      }
      
    } catch (error) {
      console.log(error);
      this.getRestAPi();
    }

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
    if(Count===0) return (<div>
            <button onClick={this.handleAdd} 
    className="btn btn-primary btn-sm m-2">Add</button>
      <p>There are No data in Database</p>
      </div>);
    return (  <div>
      <button onClick={this.handleAdd} 
    className="btn btn-primary btn-sm m-2">Add</button>
    <div className="row">
    <div className='col-3'>
    <a href="http://127.0.0.1:8000/dryout/upload">iocl</a>
    <p>Showing {Count} data  in Database</p>
    <Paginator Count={Count}
     pageSize={pageSize} 
     CurrentPage={CurrentPage} onPageChange={this.handlePageChange}/>
    <Table columns={columns} sortColumn={sortColumn} data={data} onSort={this.handleSort}/>
</div>
</div> 
</div>);
  }
}
 
export default DataInput;