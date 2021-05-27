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
            <img src={logo} height="50" className="d-inline-block align-top glitch" alt="" loading="lazy" ></img>

          </a>
          <div class="collapse navbar-collapse" id="navbarNav">

            <Categories></Categories>


          </div>

          <form className="form-inline" onSubmit={searchMovies}>

            <input class="form-control mr-sm-2 navbar-form borderRadius" type="search" aria-label="Search" id="movieSearch" name="query" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search"></input>

            <a class="btn btn-outline-info my-2 my-sm-0 navbar-form searchButton" type="button" value="Search" href={'/movieSearch/' + query}>Search</a>


          </form>

        </nav>

        <Route exact path="/" component={WorksList} />
        <Route exact path="/movieSearch/:query" component={MovieSearch} />
        <Route exact path="/category/:categoryID" component={CategoryWorks} />



      </Router>
      <footer className="footer mt-auto  bg-dark displayBlock">
        <div class="container text-center p-1">
          <a href="https://twitter.com/alex_burdoy" class="fab fa-twitter px-1"></a>
          <a href="https://www.instagram.com/germadelalaia" class="fab fa-instagram px-1"></a>
          <a href="https://github.com/alexburdoy/" class="fab fa-github px-1"></a>
          <a href="https://www.youtube.com/channel/UC2luRv7xsGxDobJ3HXYU4Sg" class="fab fa-youtube px-1"></a>
        </div>

        <div class="container text-center py-1 textWhite">
          © Àlex Burdoy
        </div>
      </footer>
    </div>

  );
}

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],


    }

  }

  componentDidMount() {
    const url = "https://citmalumnes.upc.es/~alexbm1/TFG/data/categories_JSON.php";
    console.log(url);

    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          categories: json.categories
        });
      });

  }


  render() {

    return (
      <ul class="navbar-nav">{this.state.categories.map((category, idx) =>
        <Category key={idx} categoryName={category}></Category>
      )}
      </ul>
    );
  }
}

class Category extends React.Component {
  constructor(props) {
    super();
  }


  render() {
    let info = this.props.categoryName;
    //console.log('https://image.tmdb.org/t/p/w500' + info.backdrop_path);


    return (
      <li class="nav-item ">

        <a class="nav-link glitch" href={'/category/' + info.id}>{info.name}</a>

      </li>
    );
  }
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
        <div id='hero' className="hero-section">
          <div class="wrapper-move-heading">
            <h1 class="hero-heading second">PORTAFOLIS </h1>
            <h1 class="hero-heading second">  PORTAFOLIS</h1>
          </div>
          <div class="hero-slider w-slider">
            <div class="hero-slider-mask w-slider-mask">
              <div class="hero-slide w-slide">
                <div class="container-heading-slider">
                  <div class="whapper-heading-slide">
                    <div class="overflow">
                      <div class="sub-heading">
                        PLATAFORMA MULTIMÈDIA
                      </div>
                      <div class="bakground"></div>

                    </div>
                    <div class="overflow">
                      <div class="heading">
                        TREBALLS RECOMANATS
                      </div>
                      <div class="bakground"></div>

                    </div>
                  </div>
                  <div class="slideRecomanats">
                    <div class="background-first-slide"></div>
                    <div class="background-second-slide"></div>
                    <div class="background-third-slide"></div>
                    <div class="background-first-slide"></div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="cosPagina p-5 mt-2 mb-5">
          <div className="row row-cols-1 row-cols-md-5 ">{this.state.works.map((work, idx) =>
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


        <div className="card bgCard" id={info.id}>
          <CategoryCard idCat={info.categoria}></CategoryCard>
          <Link to={'/work/' + info.id}>
            <div className="card-body">
              <h5 className="card-title title">{info.name}</h5>
              <p className="card-text">{info.description}</p>
              <p className="card-text"><small className="text-muted">{info.user}</small><br></br><small className="text-muted">{info.data}</small></p>
            </div>
          </Link>
        </div>




      </div>

    );
  }
}
class CategoryCard extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],


    }

  }

  componentDidMount() {
    const url = "https://citmalumnes.upc.es/~alexbm1/TFG/data/namecat" + this.props.idCat + ".php";
    console.log(url);
    console.log(this.props.idCat);

    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          categories: json.categories
        });
      });

  }


  render() {

    return (
      <div class="divCategoryCard">{this.state.categories.map((category, idx) =>
        <CategoryName key={idx} categoryName={category} />
      )}
      </div>
    );
  }
}
class CategoryName extends React.Component {
  constructor(props) {
    super();
  }


  render() {
    let info = this.props.categoryName;



    return (

      <a href={'/category/' + info.id}>
        <h5 class="cursor categoryCard">{info.name}</h5>
      </a>

    );
  }
}

class CategoryWorks extends React.Component {
  constructor({ match, location }) {
    super();
    this.state = {
      idCategory: match.params.categoryID,
      works: [],

    }
    console.log(JSON.stringify(match));

  }


  componentDidMount() {
    let url = "https://citmalumnes.upc.es/~alexbm1/TFG/data/category" + this.state.idCategory + ".php";
    console.log(url);
    console.log(this.state.idCategory);
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
      <div className="cosPagina py-3">
        <div className="row row-cols-1 row-cols-md-5 ">{this.state.works.map((work, idx) =>
          <Work key={idx} workInfo={work}></Work>
        )}
        </div>
      </div>
    );
  }
}

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

