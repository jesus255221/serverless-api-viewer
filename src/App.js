import logo from './logo.svg';
import React, { Component } from "react";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      content: '',
      username: '',
      title: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8787").then(res => res.json()).then((res) => this.setState({
      posts: res
    }))
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.posts.map((p) => <li><p><b>{p.title}</b><br /><it>{p.username}</it><br />{p.content}</p></li>)}
        </ul>
        <form>
          <label for="user">User:</label> <br />
          <input type="text" id="username" value={this.state.username} onChange={this.handleChange}></input> <br />
          <label for="title">Title:</label> <br />
          <input type="text" id="title" value={this.state.title} onChange={this.handleChange}></input> <br />
          <label for="content">Content:</label> <br />
          <input type="text" id="content" value={this.state.content} onChange={(evt) => this.handleChange(evt)}></input>
          <button type="submit" onClick={this.handleSubmit}>Post</button>
        </form>
      </div>
    );
  }


  handleChange(event) {
    this.setState(
      { [event.target.id]: event.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault()
    fetch("http://127.0.0.1:8787", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify({
        username: this.state.username,
        title: this.state.title,
        content: this.state.content,
      })
    }).then((res) => res.json()).then((res) => {
      this.setState({
        posts: res
      })
    })
    // .then(res => res.json()).then((res) => {
    //   console.log(res)
    //   this.setState({
    //   posts: res.posts})})
  }
}

export default App;
