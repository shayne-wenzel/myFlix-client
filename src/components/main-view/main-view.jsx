import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import "./main-view.scss"


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RegisterView } from '../register-view/register-view';
import { LoginView } from '../login-view/login-view';
import { Menubar } from '../navbar/navbar';
import { MovieView } from '../movie-view/movie-view';

import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { setMovies } from '../../actions/actions';
import MoviesList from '../../movies-list/movies-list';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      isRegistered: true,
      user: null,
      visable: false
    }
  }
  
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://movime-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  onRegister() {
    this.setState({
      isRegistered: false
    });
  }

  render() {

    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <Menubar user={user} /> 
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies}/>;
         }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegisterView />
            </Col>
          }} />
    <Route path="/movies/:id" render={({ match, history }) => {
       if (!user) return <Col>
       <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
     </Col>
     if (movies.length === 0) return <div className="main-view" />;
     return <Col md={8}>
        <MovieView movie={movies.find(m => m._id === match.params.id)} onBackClick={() => history.goBack()} />
      </Col>
    }} />
    <Route path="/directors/:name" render={({ match, history}) => {
      if (!user) return <Col>
      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
    </Col>
    if (movies.length === 0) return <div className="main-view" />;
    return <Col md={8}>
      <DirectorView director={movies.find(m => m.Director.Name === match.params.name )} onBackClick={() => history.goBack()}/>
      </Col>
    }} />
    <Route path="/genres/:name" render={({ match, history}) => {
      if (!user) return <Col>
      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
    </Col>
    if (movies.length === 0) return <div className="main-view" />;
    return <Col md={8}>
      <GenreView genre={movies.find(m => m.Genre.Name === match.params.name )} onBackClick={() => history.goBack()}/>
      </Col>
    }} />
    <Route path={`/users/${user}`} render={({ history}) => {
       if (!user) return <Col>
       <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
     </Col>
     if (movies.length === 0) return <div className="main-view" />;
     return <Col md={8}>
      <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
      </Col>
    }} />
  </Row>
</Router>
     
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);