import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Button, Card, Col } from 'react-bootstrap';

import './profile-view.scss';

export function FavouriteMoviesView(props) {
  const { movies, favouriteMovies, currentUser, token } = props;

  const favouriteMoviesId = favouriteMovies.map(m => m._id)

  const favouriteMoviesList = movies.filter(m => {
    return favouriteMoviesId.includes(m._id)
  })

  const handleMovieDelete = (movieId) => {
    axios.delete(`https://movime-api.herokuapp.com/users/${currentUser}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`The movie was successfully deleted.`)
      window.open('/users/:username', '_self');
    }).
    catch(error => console.error(error))
  }

  return (
    <Fragment>
      {favouriteMoviesList.length === 0 ? (
          <p>You have no favourite movies yet.</p>
          ) : (
            favouriteMoviesList.map((movie) => {
              return (
              <Col xs={10} sm={8} md={6} lg={4} >
                <Card id="movie-card">
                  <Link to={`/movies/${movie._id}`}>
                    <Card.Img variant="top" src={movie.ImagePath} />
                  </Link>
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                      <Button className="button" variant="outline-primary" size="sm">Open</Button>
                    </Link>
                    <Button 
                    className="button ml-2" 
                    variant="outline-primary" 
                    size="sm" onClick={()=> {handleMovieDelete(movie._id)}} >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              )
            })
          )
        }
    </Fragment>
  )
}