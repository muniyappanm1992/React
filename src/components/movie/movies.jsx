import React, { Component } from 'react';
import {getMovies} from '../../services/fakeMovieService';
import {getGenres} from '../../services/fakeGenreService';
import Paginator from   '../../common/paginator';
import MovieTable from   './movieTable';
import ListGroup from   '../../common/listGroup';
import {paginate} from '../../utils/paginate';
import _ from 'lodash'
import axios from 'axios'
class Movies extends Component {
    state = {
        movies:[],
        genres:[],
        pageSize:4,
        CurrentPage:1,
        sortColumn:{path:'title' ,order:'asc'},
    }
    async componentDidMount(){
      const genres=[{id:"",name:"All"},...getGenres()];
      this.setState({ movies:getMovies(),genres});
      // const response=await axios.get('http://127.0.0.1:8000/dryout/api/emp/');
      // console.log(response.data);
      // this.setState({nameTest: response.data});
    }
     handleDelete=(movie)=>{
        const movies=this.state.movies.filter(m=>m.id!==movie.id);
       this.setState({movies});

    }
    handlePageChange=(page)=> {
      this.setState({CurrentPage:page})};
    
    handleGenersSelect=(genre)=>{
        this.setState({selectedGenre:genre,CurrentPage:1});
    };
    handleSort=(sortColumn)=>{
      this.setState({sortColumn});
  };

    getPageContentToDisplay=()=>{
      const {movies:allMovies,pageSize,CurrentPage,selectedGenre,sortColumn}=this.state;
      const filtered=selectedGenre && selectedGenre.id?
      allMovies.filter(m=>m.genre.id===selectedGenre.id):allMovies;
      const sorted=_.orderBy(filtered,[sortColumn.path],[sortColumn.order]);
      const movies=paginate(sorted,CurrentPage,pageSize)
      return {Count:filtered.length,data:movies}
    };


    render() { 

        const {length:moviesCount}=this.state.movies;
        const {genres,pageSize,CurrentPage,selectedGenre,sortColumn}=this.state;
        const {Count,data:movies}=this.getPageContentToDisplay();
        if(moviesCount===0) return <p>There are No Movies in Database</p>;
        return (
          <div className="row">
            <div className="col-2">
            <ListGroup items={genres} 
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenersSelect}/>
            </div>
            <div className='col'>
            <p>Showing {Count} movies  in Database</p>
            <MovieTable movies={movies} 
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}/>
            <Paginator Count={Count}
             pageSize={pageSize} 
             CurrentPage={CurrentPage} onPageChange={this.handlePageChange}/>
      </div>
      </div>);
    }
}
 
export default Movies;