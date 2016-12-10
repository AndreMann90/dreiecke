import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {items: []};
  }

  render() {
    return (
      <div>
        <h3>Dreiecksrechner</h3>
        <NewTriangle onNew={(item) => this.newItem(item)}/>
        <TrianlgeList items={this.state.items} />
      </div>
    );
  }

  newItem(newItem) {
    this.setState((prevState) => ({
    items: prevState.items.concat(newItem),
  }));
  }
}

class NewTriangle extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {a: '', b: '', c: ''};
  }

  render() {
    return (
        <div>
          <p>Fläche: {this.areaText}</p>
          <form onSubmit={this.handleSubmit}>
            <input autoFocus pattern="[0-9]*[,\.]?[0-9]*" onChange={(e) => this.setState({a: e.target.value})} value={this.state.a} />
            <input pattern="[0-9]*[,\.]?[0-9]*" onChange={(e) => this.setState({b: e.target.value})} value={this.state.b} />
            <input pattern="[0-9]*[,\.]?[0-9]*" onChange={(e) => this.setState({c: e.target.value})} value={this.state.c} />
            <button disabled={!isFinite(this.current.area)}>{'Hinzufügen'}</button>
          </form>
        </div>
    )
  }

  handleSubmit(e) {
    e.preventDefault();
    var newItem = this.current;
    newItem.id = Date.now();

    this.setState({
      a: '',
      b: '',
      c: ''
    });

    this.props.onNew(newItem);
  }

  get areaText() {
    const a = this.current.area;
    if(isFinite(a)) {
      return a;
    } else {
      return '';
    }
  }

  get current() {
    const aa = parseFloat(this.state.a.replace(",", "."));
    const bb = parseFloat(this.state.b.replace(",", "."));
    const cc = parseFloat(this.state.c.replace(",", "."));
    const s = (aa + bb + cc) / 2;

    const decimals = 2;
    return {
      area: Math.sqrt(s * (s-aa) * (s-bb) * (s-cc)).toFixed(decimals),
      a: aa.toFixed(decimals),
      b: bb.toFixed(decimals),
      c: cc.toFixed(decimals)
    };
  }
}

class TrianlgeList extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.items.map(item =>
              (<li key={item.id}>{item.area} (a={item.a}, b={item.b}, c={item.c})</li>)
          )}
        </ul>
        <p>Gesamt: {this.props.items.reduce((sum, i) => (sum+parseFloat(i.area)), 0)}</p>
      </div>
    );
  }
}

export default App;
