import React, { Component } from 'react';
import './App.css';

const API = 'http://starlord.hackerearth.com/kickstarter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [],
      search: '',
      location: '',
      sortFundedVar: true,
    };
    this.nameSearch = this.nameSearch.bind(this);
    this.locationFilter = this.locationFilter.bind(this);
    this.sortByFundedAsc = this.sortByFundedAsc.bind(this);
    this.sortByFundedDesc = this.sortByFundedDesc.bind(this);
  }
  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(resdata => {
        console.log(resdata);
        this.setState({ apiData: resdata }
        )
      });

  }
  //search 
  nameSearch($event) {
    this.setState({ location: '' });
    this.setState({ search: $event.target.value });
  }

  //location filter
  locationFilter($event) {
    this.setState({ search: '' });
    this.setState({ location: $event.target.value });
  }

  //sort asc
  sortByFundedAsc() {
    this.setState({ sortFundedVar: true });
  }

  //sort by desc
  sortByFundedDesc() {
    this.setState({ sortFundedVar: false });
  }

  render() {
    //filter according to search
    let apiData = this.state.apiData.filter((data) => {
      return data.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    });

    //filter location
    apiData = apiData.filter((data) => {
      return data['location'].toLowerCase().indexOf(this.state.location.toLowerCase()) !== -1;
    });

    //sort asc and desc, Percenatge Funded
    apiData = this.state.sortFundedVar ? apiData.sort((a, b) => {
      return a['percentage.funded'] - b['percentage.funded'];
    }) : apiData.sort((a, b) => {
      return b['percentage.funded'] - a['percentage.funded'];
    });

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Browse top Kickstarter Projects</h1>
        </header>
        <div className="container">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                {/* <th>S.No.</th> */}
                <th>Title <br />
                  <input type="text" className="form-control" placeholder="Search" value={this.state.search} onChange={this.nameSearch} />
                </th>
                <th>Location <br />
                  <input type="text" className="form-control" placeholder="Location" value={this.state.location} onChange={this.locationFilter} />
                </th>
                <th>Percenatge Funded <br />
                  <button type="button" className="btn btn-light" onClick={this.sortByFundedAsc}><i className="fa fa-sort-asc" aria-hidden="true"></i></button>
                  <button type="button" className="btn btn-light" onClick={this.sortByFundedDesc}><i className="fa fa-sort-desc" aria-hidden="true"></i></button>
                </th>
                <th>End Time <br />
                  <button type="button" className="btn btn-light" onClick={this.sortByFundedAsc}><i className="fa fa-sort-asc" aria-hidden="true"></i></button>
                  <button type="button" className="btn btn-light" onClick={this.sortByFundedDesc}><i className="fa fa-sort-desc" aria-hidden="true"></i></button>
                </th>
              </tr>
            </thead>
            <tbody>
              {apiData.map(data =>
                <tr key={data['s.no']}>
                  {/* <td>{data['s.no']}</td> */}
                  <td><a href={'https://www.kickstarter.com' + data.url} target="_blank">{data['title']}</a></td>
                  <td>{data['location']}</td>
                  <td>{data['percentage.funded']}</td>
                  <td>{data['end.time']}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <footer>
          <div id="credits">
            <div className="container text-center">
              <div className="row">
                <div className="col-md-9">
                </div>
                <div className="col-md-3" id="social-networks">
                  <a href="https://github.com/SunilSigar" target="_blank"><i className="fa fa-2x fa-github"></i></a>
                  <a href="https://www.linkedin.com/in/sunilsigar/" target="_blank"><i className="fa fa-2x fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
