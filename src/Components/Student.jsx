import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export class Student extends Component {
    render() {
        const { userData } = this.props
        return (
            <div className="mt-4 container">
                <h2 className="font-weight-lighter">{userData.name}</h2>
                <p><strong>Class: </strong>{userData.class}</p>
                <p><strong>Section: </strong>{userData.section}</p>
                <p><strong>Roll Number: </strong>{userData.rollNo}</p>
                <p><strong>Phone: </strong>{userData.phone}</p>
                <p><strong>Parent's Name: </strong>{userData.parentName}</p>
                <p><strong>Parent's Phone: </strong>{userData.parentPhone}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { userData } = state
    return { userData }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(Student)