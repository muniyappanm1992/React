import React ,{Component} from 'react';
import Table from '../../common/table'
class MovieTable extends Component {
  columns=[
    {path:"title", label:"Title"},
    {path:"genre.name", label:"Genre"},
    {path:"numberInStock", label:"Stock"},
    {path:"dailyRentalRate", label:"Rate"},
    {key:"delete",content:movie=><button onClick={()=>this.props.onDelete(movie)} 
    className="btn btn-danger btn-sm m-2">Delete</button>},
  ]
    render() { 
        const {movies,sortColumn,onSort}=this.props;
        return ( <Table columns={this.columns} sortColumn={sortColumn} data={movies} onSort={onSort}/>  );
    }
}
 

export default MovieTable;