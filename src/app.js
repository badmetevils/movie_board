import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Container, Draggable } from 'react-smooth-dnd';
import { fetchMovieLists } from './utils/requests';
import { applyDrag } from './utils/utils';
import { MovieCard } from './components/MovieCard';
import Movieboard from './components/Movieboard';
import Loader from './components/Loader';
import './styles/main.scss';

class App extends Component {
  state = {
    all: JSON.parse(localStorage.getItem('all')) || [],
    watchList: JSON.parse(localStorage.getItem('watchList')) || [],
    toDownload: JSON.parse(localStorage.getItem('toDownload')) || [],
    downloaded: JSON.parse(localStorage.getItem('downloaded')) || [],
    alreadySeen: JSON.parse(localStorage.getItem('alreadySeen')) || [],
    noRes: false,
  };
  componentDidMount() {
    const is_all_local = localStorage.getItem('all');
    if (is_all_local == null) {
      fetchMovieLists.then(res => {
        const { Search: allList } = res;
        const processed_data = allList.map((el, i) => {
          const mod = { id: `movie-${i}-${el.imdbID}`, data: el };
          return mod;
        });
        this.setState({ all: processed_data }, () => {
          localStorage.setItem('all', JSON.stringify(processed_data));
        });
      });
    }
  }
  findMovieInList = e => {
    let inp = e.target.value.toLowerCase().replace(/\s/g, '');
    if (Boolean(inp)) {
      const current_all = JSON.parse(localStorage.getItem('all'));
      const found_items = current_all.filter(x => {
        return x['data']['Title']
          .toLowerCase()
          .replace(/\s/g, '')
          .includes(inp);
      });
      if (found_items.length > 0) {
        this.setState({ all: found_items, noRes: false });
      } else {
        this.setState({ noRes: true, all: [] });
      }
    } else {
      this.setState({ all: JSON.parse(localStorage.getItem('all')), noRes: false });
    }
  };
  removeMovieFromBoard = (id, list) => {
    const delete_from = [...JSON.parse(localStorage.getItem(list))];
    const index_to_dlt = delete_from.findIndex(el => el.id === id);
    delete_from.splice(index_to_dlt, 1);
    localStorage.setItem(list, JSON.stringify(delete_from));
    this.setState({ [list]: delete_from });
  };

  render() {
    if (Array.isArray(this.state.all) && !this.state.all.length && !this.state.noRes) {
      return (
        <Fragment>
          <Loader msg="Please wait while fetching movie list ..." />
        </Fragment>
      );
    }
    return (
      <Fragment>
        <div className="group_style">
          <div className="heading">All Movies</div>
          <div id="search-box">
            <span className="fa fa-search form-control-feedback" />
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              id="search"
              onChange={this.findMovieInList}
            />
          </div>
          {this.state.noRes ? (
            <Fragment>
              <br />
              <div className="alert alert-danger">
                <strong>Opps!</strong> No Result Found for
              </div>
            </Fragment>
          ) : (
            <Container
              groupName="movie_board"
              behaviour="copy"
              getChildPayload={i => this.state.all[i]}
              onDrop={e => this.setState({ all: applyDrag(this.state.all, e) })}
            >
              {this.state.all.map((p, i) => {
                return (
                  <Draggable key={p.id}>
                    <MovieCard modClass="draggable-item" data={p.data} isSource={true} />
                  </Draggable>
                );
              })}
            </Container>
          )}
        </div>
        <Movieboard
          heading="Watch List"
          list="watchList"
          listData={this.state.watchList}
          onDrop={(e, list) => this.setState({ [list]: applyDrag(this.state[list], e, list) })}
          removeMovie={(id, list) => this.removeMovieFromBoard(id, list)}
        />
        <Movieboard
          heading="To Download"
          list="toDownload"
          listData={this.state.toDownload}
          onDrop={(e, list) => this.setState({ [list]: applyDrag(this.state[list], e, list) })}
          removeMovie={(id, list) => this.removeMovieFromBoard(id, list)}
        />
        <Movieboard
          heading="Downloded"
          list="downloaded"
          listData={this.state.downloaded}
          onDrop={(e, list) => this.setState({ [list]: applyDrag(this.state[list], e, list) })}
          removeMovie={(id, list) => this.removeMovieFromBoard(id, list)}
        />
        <Movieboard
          heading="Already Seen"
          list="alreadySeen"
          listData={this.state.alreadySeen}
          onDrop={(e, list) => this.setState({ [list]: applyDrag(this.state[list], e, list) })}
          removeMovie={(id, list) => this.removeMovieFromBoard(id, list)}
        />
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('movie-board'));
