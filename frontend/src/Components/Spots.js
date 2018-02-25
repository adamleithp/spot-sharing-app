import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

import { SPOTS_QUERY } from '../constants'

import Spot from './Spot'
import Form from './Form'


class Spots extends Component {
  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>
    }

    return (
      <div>
        <Form />
        <ul>
          {this.props.data.spots && this.props.data.spots.map((spot, index) => {
            return (
              <li key={index} className="mb2">
                <Link to={`/spots/${spot.id}`}>
                  <Spot
                    id={spot.id}
                    title={spot.title}
                    content={spot.content}
                    cordinates={spot.cordinates}
                    type={'list'}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default graphql(SPOTS_QUERY)(Spots)
