import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { MovieCard } from './MovieCard';
import PropTypes from 'prop-types';

export default class Movieboard extends Component {
  render() {
    const { heading, list, listData } = this.props;
    return (
      <div className="group_style">
        <div className="heading">{heading}</div>
        <Container
          groupName="movie_board"
          getChildPayload={i => listData[i]}
          onDrop={e => {
            this.props.onDrop(e, list);
          }}
        >
          {listData.map((p, i) => {
            return (
              <Draggable key={`${list}-${i}`}>
                <MovieCard
                  modClass="draggable-item"
                  data={p.data}
                  deleteMovie={() => this.props.removeMovie(p.id, list)}
                />
              </Draggable>
            );
          })}
        </Container>
      </div>
    );
  }
}

PropTypes.Movieboard = {
  heading: PropTypes.string,
  list: PropTypes.string.isRequired,
  listData: PropTypes.array.isRequired,
  removeMovie: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};
