import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {



  const [query, setQuery] = useState('');

  const searchMovies = async (e) => {
    e.preventDefault();

    //const query="hola";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=f37c16e288bd47f8c2026f6fdc704e57&language=en-US&query=${query}`;
    //const url = "https://api.themoviedb.org/3/trending/movie/week?api_key=f37c16e288bd47f8c2026f6fdc704e57&page=1";
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    } catch (er) {
      console.log(er);
    }

  }
  //Linia 46 afegir classe nav per fer el nav amb les categories
  return (

    <div className="App">
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fontstyle">

          <a class="navbar-brand  cursor" href="/">
            <img src={logo} height="50" className="d-inline-block align-top" alt="" loading="lazy" ></img>

          </a>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">

              <li class="nav-item ">
                <a class="nav-link" href="#">Home </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li>
              <li class="nav-item">
                <a class="nav-link " href="#">Disabled</a>
              </li>
            </ul>
          </div>

          <form className="form-inline" onSubmit={searchMovies}>

            <input class="form-control mr-sm-2 navbar-form" type="search" aria-label="Search" id="movieSearch" name="query" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a movie"></input>

            <a class="btn btn-outline-info my-2 my-sm-0 navbar-form searchButton" type="button" value="Search" href={'/movieSearch/' + query}>Search</a>


          </form>

        </nav>

        <Route exact path="/" component={WorksList} />
        <Route exact path="/movieSearch/:query" component={MovieSearch} />



      </Router>
      <footer className="footer mt-auto py-3 bg-dark displayBlock">
        <div className="container">
          <span className="text-muted footerText">Àlex Burdoy, Josep Vílchez i Martí Peña</span>
        </div>
      </footer>
    </div>

  );
}



class WorksList extends React.Component {
  constructor() {
    super();
    this.state = {
      works: [],


    }

  }

  componentDidMount() {
    const url = "https://citmalumnes.upc.es/~alexbm1/TFG/data/works_JSON.php";
    console.log(url);

    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          works: json.works
        });
      });

  }


  render() {

    return (
      <div>
        <div className="cosPagina">
          <div className="row row-cols-1 row-cols-md-5 p-3">{this.state.works.map((work, idx) =>
            <Work key={idx} workInfo={work}></Work>
          )}
          </div>
        </div>
      </div>
    );
  }
}
class Work extends React.Component {
  constructor(props) {
    super();
  }


  render() {
    let info = this.props.workInfo;
    //console.log('https://image.tmdb.org/t/p/w500' + info.backdrop_path);


    return (

      <div className="col mb-4">

        <Link to={'/movie/' + info.id}>
          <div className="card bgCard" id={info.id}>
            <img src={'https://citmalumnes.upc.es/~alexbm1/TFG/img/' + info.imgURL} className="card-img-top p-3" alt={info.name}></img>
            <div className="card-body">
              <h5 className="card-title title">{info.name}</h5>
              <p className="card-text">{info.description}</p>
              <p className="card-text"><small className="text-muted">{info.user}</small></p>
            </div>
          </div>
        </Link>



      </div>

    );
  }
}

/*
class Movie extends React.Component {
  constructor(props) {
    super();
  }


  render() {
    let info = this.props.movie;
    //console.log('https://image.tmdb.org/t/p/w500' + info.backdrop_path);


    return (

      <div className="col mb-4">

        <Link to={'/movie/' + info.id}>
          <div className="card bgCard" id={info.id}>
            <img src={'https://image.tmdb.org/t/p/w500' + info.backdrop_path} className="card-img-top" alt={info.original_title}></img>
            <div className="card-body">
              <h5 className="card-title title">{info.original_title}</h5>
              <p className="card-text">{info.overview}</p>
              <p className="card-text"><small className="text-muted">{info.release_date}</small></p>
            </div>
          </div>
        </Link>



      </div>

    );
  }
}

class MovieDetails extends React.Component {
  //https://api.themoviedb.org/3/movie/${this.props.movieID}?api_key=f37c16e288bd47f8c2026f6fdc704e57
  constructor({ match, location }) {
    super();
    this.state = {
      img: [],
      idFilm: match.params.movieID,
      title: [],
      genres: [],
      overview: [],
      homepage: [],
      production_companies: [],
      production_countries: []
    }
    console.log(JSON.stringify(match));

  }


  componentDidMount() {
    let url = "https://api.themoviedb.org/3/movie/" + this.state.idFilm + "?api_key=f37c16e288bd47f8c2026f6fdc704e57";
    console.log(url);
    console.log(this.state.idFilm);
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          img: json.backdrop_path,
          title: json.original_title,
          genres: json.genres,
          overview: json.overview,
          homepage: json.homepage,
          production_companies: json.production_companies,
          production_countries: json.production_countries
        });
      });

  }

  render() {
    return (

      <div className="cosPagina">
        <div class="row featurette mt-2 px-3">
          <div class="col-md-7 order-md-2">
            <a class="btn btn-danger my-4 my-sm-2 navbar-form" href="/" type="button" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
              </svg>
                 Back</a>
          </div>
        </div>

        <div class="row featurette mt-2 px-3">
          <div class="col-md-7 order-md-2">
            <h2 class="featurette-heading textWhite title">{this.state.title}</h2>
            <p class="lead">{this.state.overview}</p>
            <br></br><br></br><br></br>
            <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
              <p>Genres: {this.state.genres.map((genre, idx) =>
                <Genre key={idx} genreName={genre}></Genre>
              )}
              </p>
              <a type="button" href={this.state.homepage} class="btn btn-outline-info">Movie Homepage</a>
            </div>
          </div>
          <div class="col-md-5 order-md-2">
            <img src={'https://image.tmdb.org/t/p/w500' + this.state.img} className="imgStyle"></img>
          </div>
        </div>
        <br></br>
        <hr class="featurette-divider hrStyle"></hr>
        <h4 class="ml-5 pl-5 featurette-heading textWhite title">Production Companies</h4>
        <div class="row m-2 justify-content-center">

          {this.state.production_companies.map((company, idx) => <ProductionCompanies key={idx} companyInfo={company}></ProductionCompanies>)}

        </div>
        <hr class="featurette-divider hrStyle"></hr>
        <h4 class="ml-5 pl-5 featurette-heading textWhite title">Production Coutries</h4>
        <div class="m-2">

          {this.state.production_countries.map((country, idx) => <ProductionCountries key={idx} countryName={country}></ProductionCountries>)}

        </div>
      </div>
    );
  }
}

class Genre extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    let info = this.props.genreName;



    return (

      <em>|{info.name}| </em>

    );
  }

}

class ProductionCompanies extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    let info = this.props.companyInfo;



    return (
      <div class="col-lg-3 bgProdCard m-1 p-3">
        <img class="bd-placeholder-img" src={'https://image.tmdb.org/t/p/w500' + info.logo_path} width="100"></img>
        <h5 class="pt-3">{info.name}</h5>
        <p><strong>Country: </strong>{info.origin_country}</p>

      </div>
    );
  }

}

class ProductionCountries extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    let info = this.props.countryName;



    return (
      <p class="center"><em>|{info.name}| </em></p>
    );
  }

}
*/
class MovieSearch extends React.Component {
  //https://api.themoviedb.org/3/movie/${this.props.movieID}?api_key=f37c16e288bd47f8c2026f6fdc704e57
  constructor(props) {
    super();
    this.state = {
      movies: [],
      page: 1,

    }

  }

  componentDidMount() {
    this.makeHttpRequestWithPage(1);

  }

  makeHttpRequestWithPage = async pageNumber => {
    if (pageNumber <= 1) {
      pageNumber = 1;
    }
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=f37c16e288bd47f8c2026f6fdc704e57&language=en-US&query=${this.props.match.params.query}&page=` + pageNumber)
      .then(response => response.json())
      .then(json => {
        this.setState({
          movies: json.results,
          page: json.page,

        });
      });

  }
  render() {

    let renderPageNumbers;
    const pageNumbers = [];
    if (this.state.total !== null) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(i);
      }

      renderPageNumbers = pageNumbers.map(number => {
        let classes = this.state.page === number ? 'activePage' : 'pages';

        return (
          <li class="page-item">
            <a className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>
              <span key={number}>{number}</span>
            </a>
          </li>
        );
      });
    }

    return (
      <div>

        <div className="cosPagina">
          <div class="row featurette mt-2 px-3">
            <div class="col-md-2 order-md-1">
              <a class="btn btn-danger my-4 my-sm-2 navbar-form" href="/" type="button" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
                 Back</a>
            </div>
            <div class="col-md-10 order-md-2 vertCenter">
              <h5 class="results">Results for: {this.props.match.params.query}</h5>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-5 p-3">{this.state.movies.map((work, idx) =>
            <Work key={idx} workInfo={work}></Work>
          )}
          </div>
          <ul class="pagination centerPagination">
            <li class="page-item">
              <a class="page-link pages" onClick={() => this.makeHttpRequestWithPage((this.state.page - 1))} aria-label="Previous">
                <span aria-hidden="true">«</span>
              </a>
            </li>

            {renderPageNumbers}

            <li class="page-item">
              <a class="page-link pages" aria-label="Next" onClick={() => this.makeHttpRequestWithPage((this.state.page + 1))}>
                <span aria-hidden="true">»</span>
              </a>
            </li>
          </ul>

        </div>

      </div>
    );
  }



}




export default App;

