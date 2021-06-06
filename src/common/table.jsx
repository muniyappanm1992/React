import React,{Component} from 'react';
import TableHeader from './tableHeader'
import TableBody from './tableBody'
class Table extends Component {
    render() { 
        const {columns,sortColumn,data,onSort}=this.props;
        return ( <table className="table table-bordered  table-responsive">
        <TableHeader columns={columns} 
        sortColumn={sortColumn}
        onSort={onSort}/>
        <TableBody data={data} columns={columns}/>
    </table>  );
    }
};
export default Table;