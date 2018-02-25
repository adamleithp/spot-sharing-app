import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { graphql } from 'react-apollo'
import { SPOTS_QUERY } from '../constants'

import './App.css'

import Spots from './Spots'
import Spot from './Spot'

const SpotWrapper = ({ match }) => (
  <Spot type={'single'} id={match.params.spotId}/>
)

const SpotsWrapper = ({ location, match }) => (
  <div>
    <Route path={`${match.path}/:spotId`} component={SpotWrapper}/>
    <Route exact path={match.path} component={Spots}/>
  </div>
)


class App extends Component {
  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>
    }

    return (
      <Router>
        <div>
          <header className="header">
            <ul className="flex h-100 ">
              <li><Link className="flex h-100 items-center pa1 white" to="/">Home</Link></li>
              <li><Link className="flex h-100 items-center pa1 white" to="/spots">Spots</Link></li>
            </ul>
          </header>
          <div className="content pt2 w-60 center">
            {/* <Route exact path="/" component={Home}/> */}
            <Route path="/spots" component={SpotsWrapper} />
          </div>
        </div>
      </Router>
    )
  }
}


export default graphql(SPOTS_QUERY)(App)
