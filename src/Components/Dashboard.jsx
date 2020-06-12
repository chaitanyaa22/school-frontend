import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Student from './Student'
import Parent from './Parent'
import Admin from './Admin'
import Teacher from './Teacher'
import { Redirect } from 'react-router-dom'
import {logout} from '../Actions/actions'

export class Dashboard extends Component {
    render() {
        const { userType } = this.props
        return (
            <div>
                <nav className="navbar navbar-light bg-light">
                    {userType === "" ? <Redirect to="/"/> : ""}
                    <span className="navbar-brand">{userType.charAt(0).toUpperCase() + userType.slice(1)} Panel</span>
                    <div><button className="btn btn-dark btn-sm" onClick={()=>this.props.logout()}>Logout</button></div>
                </nav>
                {userType === 'admin'
                ? <Admin/>
                : ""
                }
                {userType === 'teacher'
                ? <Teacher/>
                : ""
                }
                {userType === 'student'
                ? <Student/>
                : ""
                }
                {userType === 'parent'
                ? <Parent/>
                : ""
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { userType} = state
    return { userType}

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({logout}, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
