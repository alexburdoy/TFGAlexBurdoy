import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import firebaseAuth from './firebase-config';
import { AuthProvider } from './Auth.js';
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import SignUp from "./SignUp";

/*
<form className="form-inline" action={"https://citmalumnes.upc.es/~alexbm1/TFG/data/cercaWorks.php"} method={'GET'}>
  <input class="form-control mr-sm-2 navbar-form borderRadius" type="search" aria-label="Search" id="query" name="query" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search"></input>
  <input class="btn btn-outline-info my-2 my-sm-0 navbar-form searchButton" type="submit" value="Search"></input>
</form>
*/
function App() {

  const [query, setQuery] = useState('');



  const searchWork = async (e) => {
    e.preventDefault();

    //const query="hola";
    const url = `https://citmalumnes.upc.es/~alexbm1/TFG/data/cercaWorks.php?query=${query}`;
    console.log(url);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    } catch (er) {
      console.log(er);
    }

  }

  return (

    <div className="App">
      <AuthProvider>
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fontstyle">

            <a className="navbar-brand  cursor" href="/">
              <img src={logo} height="50" className="d-inline-block align-top glitch" alt="" loading="lazy" ></img>

            </a>
            <div className="collapse navbar-collapse" id="navbarNav">

              <Categories></Categories>


            </div>



            <form className="form-inline" onSubmit={searchWork}>

              <input className="form-control mr-sm-2 navbar-form borderRadius" type="search" aria-label="Search" id="workSearch" name="query" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search"></input>

              <a className="btn btn-outline-info my-2 my-sm-0 navbar-form searchButton" type="button" value="Search" href={'/workSearch/' + query}>Search</a>


            </form>
            <Link to='/'>
              <button className="btn btn-danger mx-2 searchButton" onClick={() => firebaseAuth.auth().signOut()} >Sign Out</button>
            </Link>

          </nav>


          <PrivateRoute exact path="/" component={WorksList} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/workSearch/:query" component={MovieSearch} />
          <Route exact path="/category/:categoryID" component={CategoryWorks} />
          <Route exact path="/user/:userEmail" component={UserWorks} />
          <Route exact path="/work/:workID" component={WorkDetails} />
          <Route exact path="/addWork" component={AddWork} />




        </Router>
      </AuthProvider>

      <footer className="footer mt-auto  bg-dark displayBlock">
        <div className="container text-center p-1">
          <a href="https://twitter.com/alex_burdoy" className="fab fa-twitter px-1"></a>
          <a href="https://www.instagram.com/germadelalaia" className="fab fa-instagram px-1"></a>
          <a href="https://github.com/alexburdoy/" className="fab fa-github px-1"></a>
          <a href="https://www.youtube.com/channel/UC2luRv7xsGxDobJ3HXYU4Sg" className="fab fa-youtube px-1"></a>
        </div>

        <div className="container text-center py-1 textWhite">
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
      <ul className="navbar-nav">{this.state.categories.map((category, idx) =>
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
      <li className="nav-item ">

        <a className="nav-link glitch" href={'/category/' + info.id}>{info.name}</a>

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
          <div className="wrapper-move-heading">
            <h1 className="hero-heading second">PORTAFOLIS </h1>
            <h1 className="hero-heading second">  PORTAFOLIS</h1>
          </div>
          <div className="hero-slider w-slider">
            <div className="hero-slider-mask w-slider-mask">
              <div className="hero-slide w-slide">
                <div className="container-heading-slider">
                  <div className="whapper-heading-slide">
                    <div className="overflow">
                      <div className="sub-heading">
                        PLATAFORMA MULTIMÈDIA
                      </div>
                      <div className="bakground"></div>

                    </div>
                    <div className="overflow">
                      <div className="heading">
                        TREBALLS RECOMANATS
                      </div>
                      <div className="bakground"></div>

                    </div>
                  </div>
                  <div className="slideRecomanats">
                    <div className="background-first-slide"></div>
                    <div className="background-second-slide"></div>
                    <div className="background-third-slide"></div>
                    <div className="background-first-slide"></div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="cosPagina p-5 mt-2 mb-5">
          <div className="row row-cols-1 row-cols-md-4 ">{this.state.works.map((work, idx) =>
            <Work key={idx} workInfo={work}></Work>
          )}
          </div>
        </div>
        <div className="m-5 pb-5 px-4 textCenter ">
          <Link to="/addWork">
            <a className="btn btn-primary addButton borderRadius" >Add</a>
          </Link>
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
          <div className="card-body">
            <CategoryCard idCat={info.categoria}></CategoryCard>
            <Link to={'/work/' + info.id}>
              <h5 className="card-title title">{info.name}</h5>
              <p className="card-text">{info.description}</p>
            </Link>
            <a href={'/user/' + info.user}>
              <p className="card-text"><small className="text-muted email">{info.user}</small></p>
            </a>
            <p className="card-text"><small className="text-muted">{info.data}</small></p>

          </div>
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
    const url = "https://citmalumnes.upc.es/~alexbm1/TFG/data/namecat.php?name=" + this.props.idCat;
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
      <div >{this.state.categories.map((category, idx) =>
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
        <h5 className="cursor categoryCard">{info.name}</h5>
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
      categories: [],

    }
    console.log(JSON.stringify(match));

  }


  componentDidMount() {
    let url2 = "https://citmalumnes.upc.es/~alexbm1/TFG/data/namecat.php?name=" + this.state.idCategory + ".php";
    let url = "https://citmalumnes.upc.es/~alexbm1/TFG/data/category.php?id=" + this.state.idCategory;
    console.log(url);
    console.log(url2);
    console.log(this.state.idCategory);
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          works: json.works,
        });
      });

    fetch(url2)
      .then(response => response.json())
      .then(json => {
        this.setState({
          categories: json.categories,
        });
      });

  }

  render() {
    return (
      <div className="cosPagina py-3 mx-5 mt-4">
        <div>{this.state.categories.map((category, idx) =>
          <CatName key={idx} catInfo={category}></CatName>
        )}
        </div>
        <div className="row row-cols-1 row-cols-md-4 ">{this.state.works.map((work, idx) =>
          <Work key={idx} workInfo={work}></Work>
        )}
        </div>
        <div className=" pb-5 px-4 textCenter mt-5"><a className="btn btn-primary addButton borderRadius" href="/addWork">Add</a></div>
      </div>
    );
  }
}

class UserWorks extends React.Component {
  constructor({ match, location }) {
    super();
    this.state = {
      userEmail: match.params.userEmail,
      works: [],
      categories: [],

    }
    console.log(JSON.stringify(match));

  }


  componentDidMount() {
    let url = "https://citmalumnes.upc.es/~alexbm1/TFG/data/user.php?email=" + this.state.userEmail;
    console.log(url);
    console.log(this.state.userEmail);
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          works: json.works,
        });
      });



  }

  render() {
    return (
      <div className="cosPagina py-3 mx-5 mt-4">
        <h1 className="pl-3 detailsTitle mb-4">{this.state.userEmail}</h1>
        <div className="row row-cols-1 row-cols-md-4 ">{this.state.works.map((work, idx) =>
          <Work key={idx} workInfo={work}></Work>
        )}
        </div>
      </div>
    );
  }
}

class CatName extends React.Component {
  constructor(props) {
    super();
  }


  render() {
    let info = this.props.catInfo;



    return (

      <h1 className="pl-3 detailsTitle mb-4">{info.name}</h1>

    );
  }
}

class WorkDetails extends React.Component {
  constructor({ match, location }) {
    super();
    this.state = {
      idWork: match.params.workID,
      works: [],

    }
    console.log(JSON.stringify(match));

  }


  componentDidMount() {
    let url = "https://citmalumnes.upc.es/~alexbm1/TFG/data/work.php?id=" + this.state.idWork;
    console.log(url);
    console.log(this.state.idWork);
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
      <div className="cosPagina p-5 mt-2 mb-5">
        <div>{this.state.works.map((work, idx) =>
          <Detail key={idx} workInfo={work}></Detail>
        )}
        </div>
      </div>
    );
  }
}

class Detail extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let info = this.props.workInfo;



    return (
      <div>
        <h1 className="pl-3 detailsTitle mb-4">{info.name}</h1>
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col mb-4">
            <p className="card-text">{info.description}</p>
            <a href={'/user/' + info.user}>
              <p className="card-text"><small className="text-muted email">{info.user}</small></p>
            </a>
            <p className="card-text"><small className="text-muted">{info.data}</small></p>

            <CategoryCard idCat={info.categoria}></CategoryCard>
          </div>
          <div className="col mb-4">
            <img src={'https://citmalumnes.upc.es/~alexbm1/TFG/img/' + info.imgURL} className="detailsImg" alt={info.name}></img>
          </div>
        </div>
        <div className="commentContainer m-1 p-4">
          <CommentDiv idWorkComment={info.id}></CommentDiv>
        </div>
        <AddComment workID={info.id} />


      </div>








    );
  }
}

function AddComment({ workID }) {


  let [query, setQuery] = useState('');

  var user = firebase.auth().currentUser;
  var emailUser;
  if (user != null) {
    emailUser = user.email;
    console.log(emailUser);
  }





  let searchWork = async (e, d, i) => {
    //.preventDefault();
    // d.preventDefault();
    // i.preventDefault();

    //const query="hola";
    const url = `https://citmalumnes.upc.es/~alexbm1/TFG/data/addComment.php?idWork=${workID}&comment=${query}&user=${emailUser}`;
    console.log(url);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    } catch (er) {
      console.log(er);
    }

  }
  //let work = this.props.workID;




  return (
    <div>

      <div className="cosPagina">
        <div className="mx-5 mt-5">
          <h1 className="pl-3 detailsTitle mb-4">Afegir Comentari</h1>
          <form onSubmit={searchWork} method="get">
            <div className="form-row mx-5">
              <div className="col-md-12 mb-12 my-2">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text borderRadius" id="inputGroupPrepend2">Comentari</span>
                  </div>
                  <input type="text" className="form-control borderRadius" id="workName" name="query" value={query} onChange={(e) => setQuery(e.target.value)} required></input>
                </div>
              </div>
            </div>
            <a className="btn btn-outline-info my-2 my-sm-0 navbar-form searchButton mx-5 p-2" type="button" value="Afegeix" onClick={searchWork} href={workID}>Afegeix</a>
          </form>
        </div>
      </div>
    </div>
  );




}

class CommentDiv extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: [],


    }

  }

  componentDidMount() {
    const url = "https://citmalumnes.upc.es/~alexbm1/TFG/data/comment.php?idWorkComment=" + this.props.idWorkComment;
    console.log(url);
    console.log(this.props.idWorkComment);

    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          comments: json.comments
        });
      });

  }


  render() {

    return (
      <div >{this.state.comments.map((comment, idx) =>
        <Comment key={idx} commentContent={comment} />
      )}
      </div>
    );
  }
}

class Comment extends React.Component {
  constructor(props) {
    super();
  }


  render() {
    let info = this.props.commentContent;



    return (

      <div className="comment py-2 px-5 mx-5 my-2">
        <a href={'/user/' + info.user}>
          <h5 className="email">{info.user}</h5>
        </a>
        <p className="textComment">{info.comment}</p>
        <p ><small className="text-muted">{info.data}</small></p>
      </div>


    );
  }
}
class MovieSearch extends React.Component {

  constructor(props) {
    super();
    this.state = {
      results: [],

    }

  }

  componentDidMount() {
    let url = "https://citmalumnes.upc.es/~alexbm1/TFG/data/cercaWorks.php?query=" + this.props.match.params.query
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          results: json.results,



        });
      });

  }

  render() {


    return (
      <div>

        <div className="cosPagina">
          <div className="mx-2 mt-5">
            <div className="row featurette mt-2 px-3">
              <div className="col-md-1 order-md-1">
                <a className="btn btn-danger my-4 my-sm-2 navbar-form borderRadius" href="/" type="button" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                  </svg>
                 Back</a>
              </div>
              <div className="col-md-11 order-md-2 vertCenter">
                <h1 className="results">Results for: {this.props.match.params.query}</h1>
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-5 p-3">{this.state.results.map((work, idx) =>
            <Work key={idx} workInfo={work}></Work>
          )}
          </div>


        </div>

      </div>
    );
  }



}

function AddWork() {

  let [query, setQuery] = useState('');
  let [description, setDescription] = useState('');
  let [imgURL, setImgURL] = useState('');
  let [category, setCategory] = useState('');

  var user = firebase.auth().currentUser;
  var emailUser;
  if (user != null) {
    emailUser = user.email;
    console.log(emailUser);
  }

  let searchWork = async (e, d, i) => {
    //.preventDefault();
    // d.preventDefault();
    // i.preventDefault();

    //const query="hola";
    const url = `https://citmalumnes.upc.es/~alexbm1/TFG/data/addWork.php?name=${query}&description=${description}&imgUrl=${imgURL}&categoria=${category}&user=${emailUser}`;
    console.log(url);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    } catch (er) {
      console.log(er);
    }

  }




  return (
    <div>

      <div className="cosPagina">
        <div className="mx-5 mt-5">
          <h1 className="pl-3 detailsTitle mb-4">Afegir Treball al perfil de l'usuari {emailUser}</h1>

          <form onSubmit={searchWork} method="get">
            <div className="form-row mx-5">
              <div className="col-md-4 mb-12 my-2 p-2">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend2">Nom</span>
                  </div>
                  <input type="text" className="form-control borderRadius" id="workName" placeholder="Treball Multimedia" name="query" value={query} onChange={(e) => setQuery(e.target.value)} required></input>
                </div>
              </div>
            </div>

            <div className="form-row mx-5">
              <div className="col-md-4 mb-12 my-2 p-2">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend2">Descripció</span>
                  </div>
                  <input type="text" className="form-control borderRadius" id="workDescription" placeholder="Descripció" name="description" value={description} onChange={(d) => setDescription(d.target.value)} required></input>
                </div>
              </div>
            </div>

            <div className="form-row mx-5">
              <div className="col-md-4 mb-12 my-2 p-2">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend2">URL Imatge</span>
                  </div>
                  <input type="text" className="form-control borderRadius" id="workImgURL" placeholder="foto.jpg" name="imgURL" value={imgURL} onChange={(i) => setImgURL(i.target.value)} required></input>
                </div>
              </div>
            </div>

            <div className="form-row mx-5">
              <div className="col-md-4 mb-12 my-2 p-2">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend2">Categoria</span>
                  </div>
                  <input type="number" className="form-control borderRadius" id="workImgURL" placeholder="Número Categoria" name="category" value={category} onChange={(c) => setCategory(c.target.value)} required></input>
                </div>
              </div>
            </div>

            <Link to="/">
              <a className="btn btn-outline-info my-2 my-sm-0 navbar-form searchButton mx-5 p-2" type="button" value="Afegeix" onClick={searchWork}>Afegeix</a>
            </Link>
            <div>
              <h2 className="pl-3 detailsTitle my-4">Categories</h2>
              <p className="pl-3 my-4">Programació = 1 | Disseny = 2 | VFX = 3 | 3D = 4</p>
            </div>
            <div>
              <h2 className="pl-3 detailsTitle my-4">Imatges Disponibles</h2>
              <p className="pl-3 my-4">programacio.png | disseny.jpg | vfx.jpg | 3d.jpg</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );




}

export default App;

