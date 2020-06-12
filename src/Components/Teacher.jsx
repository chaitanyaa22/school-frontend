import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export class Teacher extends Component {
    render() {
        const { userData } = this.props
        return (
            <div className="container mt-4">
                <h2 className="font-weight-lighter">{userData.name}</h2>
                <p><strong>Email: </strong>{userData.email}</p>
                <p><strong>Subject: </strong>{userData.subject}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Teacher)