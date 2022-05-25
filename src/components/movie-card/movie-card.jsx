import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ShowMoreText from "react-show-more-text";
import "./movie-card.scss"



export class MovieCard extends React.Component {

  executeOnClick(isExpanded) {
    console.log(isExpanded);
}
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <ShowMoreText
                /* Default options */
                lines={3}
                more="Show more"
                less="Show less"
                className="content-css"
                anchorClass="my-anchor-css-class"
                onClick={this.executeOnClick}
                expanded={false}
                width={280}
                truncatedEndingComponent={"... "}
            >
          <Card.Text>{movie.Description}</Card.Text>
          </ShowMoreText>
          <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
        </Card.Body>
      </Card>    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};