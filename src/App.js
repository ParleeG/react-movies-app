import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./navbar";
import Filter from "./Filter";
import Search from "./Search";
import Table from "./Table";
import Login from "./Login";
import Customers from "./Customers";
import Rentals from "./Rentals";
class App extends React.Component {
  state = {
    movies: [],
    genre: [],
    selectedFilter: "All Genre",
    search: "",
  };

  handlefilter = (filter) => {
    this.setState({ selectedFilter: filter });
  }

  togglelike = (id) => {
    let index = this.state.movies.findIndex((el) => {
      return el._id == id;
    });
    let currMoviesArr = this.state.movies.map((el) => el);

    if (currMoviesArr[index].liked) {
      currMoviesArr[index].liked = false;
    } else {
      currMoviesArr[index].liked = true;
    }

    this.setState({ movies: currMoviesArr });
  };

  deleteMovie = (id) => {
    let filteredMovie = this.state.movies.filter((el) => {
      return el._id != id;
    })

    this.setState({ movies: filteredMovie });
  }

  updateSearch = (searchstring) => {
    this.setState({ search: searchstring });
  }

  componentDidMount() {

    let f = async () => {
      let responseMovies = await fetch("/movies");
      let responseGenre = await fetch("/genre");
      let moviesjson = await responseMovies.json();
      let genrejson = await responseGenre.json();

      this.setState({
        movies: moviesjson,
        genre: genrejson,
      });
    };

    f();
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/customers">
              <Customers/>
            </Route>
            <Route path="/rentals">
              <Rentals/>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <div className="row">
                <div className="col-3">
                  <Filter handlefilter={this.handlefilter} selectedFilter={this.state.selectedFilter} genreData={this.state.genre} />
                </div>
                <div className="col-9 p-4">
                  <Search
                    search={this.state.search}
                    updateSearch={this.updateSearch}
                    total={this.state.movies.length}
                  />
                  <div className="row">
                    <div className="col-10">
                      <Table
                        search={this.state.search}
                        deleteMovie={this.deleteMovie}
                        togglelike={this.togglelike}
                        selectedFilter={this.state.selectedFilter}
                        moviesData={this.state.movies}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Route>

          </Switch>

        </div>
      </Router>

    );
  }
}

export default App;