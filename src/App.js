import React, { Component } from 'react';
import logo from './Streamline-61-512.png';
import './App.css';

var request = require('request');

const host = 'https://young-bastion-54874.herokuapp.com';
//const port = '1700';

function Word(word, links) {
  this.word = word;
  this.links = links;
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <a href=""><img src={logo} className="App-logo" alt="logo" /></a>

        </div>
        <p className="App-intro">
          Enter a Russian word to hear pronounciations of the declensions and conjugations.
        </p>
        <Testing />
      </div>
    );
  }
}


class Testing extends React.Component {

  constructor() {
    super();
    this.state = { testing: '', searchWord: '', mp3Path: '', Words: [], mp3Paths: [], pathsArray: [], hideResult: true };
    this.handleEvent = this.handleEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
  }

  handleEvent(e) {

    e.preventDefault();
    var options = {
      url: host + '/word/' + encodeURI(this.state.searchWord),
      headers: {
        'User-Agent': 'request',
      }
    };

    fetch(host+'/word/' + (encodeURI(this.state.searchWord))).then((response) => response.json()).then((responseJson) => {
      this.setState({ testing: responseJson });
      for (var x in responseJson) {
        var tempword = (responseJson[x].normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
        this.fetchAPI(tempword)
      }


    });
    return false;
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ searchWord: e.target.value });
    return false;
  }

  fetchAPI(arg) {

    var Links = [];
    fetch(host+'/forvo/' + (encodeURI(arg))).then((response) => response.json()).then((responseJson) => {
      for (var y in responseJson['items']) {
        Links.push(responseJson['items'][y]['pathmp3']);
      }
      this.state.Words.push(new Word(arg, Links));
      this.setState({ hideResult: '' });
    });

  };

  render() {
    return (
      <div className="ff">
        <form onSubmit={this.handleEvent}><input value={this.state.searchWord} className="container1" onChange={this.handleChange} onSubmit={this.handleEvent} /></form><button className="button" onClick={this.handleEvent}>Search</button>

        <p className={this.state.hideResult ? 'hidden' : ''} style={{ animation: 'fadein 5s', font: 'Ubuntu' }}>
          <NumberList className="text" list={this.state.Words} />
        </p>
      </div>
    )
  }
}

function NumberList(props) {
  var passlist = [];
  const list = props.list;
  for (var x in list) {
    var tempLINK = list[x].links;
    var pushLI = [];
    for (var y in tempLINK) {
      let tempaudio = tempLINK[y];
      pushLI.push((<ul className="links">{playNoise(tempaudio)}</ul>));
    }
    var tempLI = (<li key={[x]}>
      {list[x].word} {pushLI}<br /><br />
    </li>)
    passlist.push(tempLI);

  }
  return (

    <ul className="links">{passlist}</ul>
  );
}


function playNoise(arg) {

  return <a href={arg} onClick={(event) => {
    event.preventDefault();
    var tempaudio = new Audio(arg);
    tempaudio.play();
    return false;
  }}>        <img className="item" src='/1497928788_volume.png' width='15' height='15' /></a>
}






export default App;