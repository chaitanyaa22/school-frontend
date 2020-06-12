import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {getStudent} from '../Actions/actions'
import { Redirect } from 'react-router-dom'

export class Parent extends Component {
    state = {
        goToStudents : false
    }
    componentDidMount(){
        this.setState({
            goToStudents: false
        })
    }
    async getStudent(e){
        await this.props.getStudent(e)
        await this.setState({
            goToStudents: true
        })
    }
    render() {
        const { userData } = this.props
        return (
            <div className="container mt-4">
                {this.state.goToStudents ? <Redirect to='/user/children'/> : ""}
                <h2 className="font-weight-lighter">{userData[0].parentName}</h2>
                <p>Phone: {userData[0].parentPhone}</p>
                {this.props.userData.map((e, i) => {
                    return <div className="card my-2" key={i} onClick={()=>this.getStudent(e)}>
                        <div className="card-header">
                            {e.name}
                        </div>
                    </div>
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { userData } = state
    return { userData }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getStudent}, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(Parent)