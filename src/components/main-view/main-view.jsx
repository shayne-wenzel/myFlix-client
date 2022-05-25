import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import "./main-view.scss"

import { RegisterView } from '../register-view/register-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(username, password, email, birthday);
  props.onRegister(false);
};

export class MainView extends React.Component {

  state = {
    visable: true
  }

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      isRegistered: true,
      user: null,
      visable: false
    }
  }
  

  componentDidMount(){
    axios.get('https://movime-api.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(isRegistered) {
    this.setState({
      isRegistered,
    });
  }

  render() {
    const { movies, selectedMovie, user, isRegistered, visable } = this.state;
    const buttonText = this.state.visable ? "Back" : "Welcome"

    if (isRegistered) {
      return (<div>
        {this.state.visable ? <RegisterView onRegister={(bool) => this.onRegister(bool)} /> : false}
        
        <Button
        onClick={() => {
          this.setState({ visable: !this.state.visable});
        }}
        >
          {buttonText}
        </Button>
        </div>
        );
    }

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className="main-view" />;
  
    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={4}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
          ))
        }
      </Row>
    );
  }
}
export default MainView;

