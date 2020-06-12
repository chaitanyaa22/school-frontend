import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import { BrowserRouter, Route } from 'react-router-dom'
import StudentDetails from './Components/StudentDetails'

export class App extends Component {
  render() {
    return (
      <div >
        <BrowserRouter >
          <Route path="/" exact>
            <Login/>
          </Route>
          <Route path="/user" exact>
            <Dashboard/>
          </Route>
          <Route path="/user/children" >
            <StudentDetails/>
          </Route>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }

}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)