import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { SPOT_ADD, SPOTS_QUERY } from '../constants'

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      content: ''
    }
  }


  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onClick(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        id: 123123,
        title: this.state.title,
        content: this.state.content
      },
      refetchQueries: [{
        query: SPOTS_QUERY
      }]
    })
      .then(({ data }) => {
        console.log('got data', data);

      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }


  render() {
    return (
      <form className="ba pa2 mb3">
        <div className="mb2">
          <input type="text"
            className="input"
            placeholder="item name"
            value={this.state.title}
            onChange={this.onChange.bind(this)}
            name="title"/>
        </div>

        <div className="mb2">
          <input type="text"
            className="input"
            placeholder="content name"
            value={this.state.content}
            onChange={this.onChange.bind(this)}
            name="content"/>
        </div>

        <div>
          <button className="btn" onClick={this.onClick.bind(this)}>Add Spot</button>
        </div>
      </form>
    )
  }
}

export default graphql(SPOT_ADD)(Form)
