import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { SPOT, SPOTS_QUERY, SPOT_REMOVE } from '../constants'


class Spot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: props.title || '',
      content: props.content || '',
    }
  }

  componentWillMount(){
    if (this.props.type === 'single') {
      this.props.getSpot({
        variables: {
          id: this.props.id,
        },
      })
      .then(({ data }) => {
        this.setState({
          title: data.getSpot.title,
          content: data.getSpot.content,
        })

      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
    }
  }

  onClick(event) {
    this.props.SpotRemove({
      variables: {
        id: this.props.id,
      },
      refetchQueries: [{
        query: SPOTS_QUERY
      }]
    })
      .then(({ data }) => {
        this.props.history.push(`/spots`)

      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {
    return (
      <div className="ba pa2 flex justify-between">
        <div className="flex-auto">
          <p className="ma0 mb2">Title: {this.state.title}</p>
          <p className="ma0">Content: {this.state.content}</p>
        </div>
        { this.props.type === 'single' ?
          <div>
            <button className="btn btn-danger" onClick={this.onClick.bind(this)}>Delete</button>
          </div>
          : null
        }
      </div>
    )
  }
}

export default withRouter(
  compose(
    graphql(SPOT, { name: 'getSpot' }),
    graphql(SPOT_REMOVE, { name: 'SpotRemove' }),
  )(Spot)
)
