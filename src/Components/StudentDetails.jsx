import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import {logout} from '../Actions/actions'
import { bindActionCreators } from 'redux'

export class StudentDetails extends Component {
    render() {
        const { userType, getStudent } = this.props
        return (
            <div>
                <nav className="navbar navbar-light bg-light">
                    {userType === '' ? <Redirect to="/"/> : ""}
                    <span className="navbar-brand">{userType.charAt(0).toUpperCase() + userType.slice(1)} Panel</span>
                    <div><button className="btn btn-dark btn-sm" onClick={()=>this.props.logout()}>Logout</button></div>
                </nav>
                <div className="container mt-3">
                    <Link to="/user"><button className="btn btn-dark">Home</button></Link>
                    <div className="mt-5">
                        <p><strong>Name: </strong>{getStudent.name}</p>
                        <p><strong>Class: </strong>{getStudent.class}</p>
                        <p><strong>Section: </strong>{getStudent.section}</p>
                        <p><strong>Roll No: </strong>{getStudent.rollNo}</p>
                        <p><strong>Phone: </strong>{getStudent.phone}</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    const { userType, getStudent } = state
    return { userType, getStudent }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({logout}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetails)
