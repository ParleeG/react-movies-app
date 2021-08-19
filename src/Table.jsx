import React from "react";
import Pagination from "./Pagination";
class Table extends React.Component{
    state={
        currPage:1,
    }
    selectPage=(value)=>{
        this.setState({currPage:value});
    }
    render(){
        let filteredMovies=this.props.moviesData.filter((el)=>{
            if(this.props.selectedFilter=="All Genre") return el;
            else if(this.props.selectedFilter==el.genre.name) return el;
        })
        
        filteredMovies=filteredMovies.filter((el)=>{
            let movieTitle=el.title.toLowerCase();
            let s=this.props.search.toLowerCase();
            return movieTitle.includes(s);
        })
        let noOfPages=Math.ceil(filteredMovies.length/4);
        let startIndex=(this.state.currPage-1)*4;
        let endIndex=Math.min(filteredMovies.length,this.state.currPage*4);
        filteredMovies=filteredMovies.slice(startIndex,endIndex);
        return (
            <>
                <table class="table mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredMovies.map((el)=>{
                                return <tr key={el._id}>
                                    <td>{el.title}</td>
                                    <td>{el.genre.name}</td>
                                    <td>{el.numberInStock}</td>
                                    <td>{el.dailyRentalRate}</td>
                                    <td onClick={()=>{this.props.togglelike(el._id)}}>
                                        {(el.liked)?(<span class="material-icons-outlined">favorite_border</span>):(<span class="material-icons-outlined">favorite</span>)}
                                    </td>
                                    <td><button onClick={()=>{
                                        this.props.deleteMovie(el._id);
                                    }} className="btn btn-danger">Delete</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <Pagination selectPage={this.selectPage} currPage={this.state.currPage} noOfPages={noOfPages}/>
            </>
        );
    }
    
}
export default Table;