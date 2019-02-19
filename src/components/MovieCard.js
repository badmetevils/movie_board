import React from 'react';
import '../styles/moviecards.scss';

export const MovieCard = props => {
  const { modClass, data, isSource, list } = props;
  const { Poster, Title, Type, Year, imdbID } = data;
  return (
    <div className={modClass}>
      <div className="card">
        <div className="row">
          <div className="col-3">
            <img className="poster img-fluid" src={Poster} alt={Title} />
          </div>
          <div className="col-8">
            <div className="details">
              <p>{Title}</p>
              <span className="badge badge-secondary">{Type}</span>
              <span className="badge badge-secondary">{Year}</span>
            </div>
          </div>
          <div className="col-1">
            {!isSource ? (
              <span
                className="delete-btn fa fa-times"
                onClick={() => {
                  props.deleteMovie();
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
