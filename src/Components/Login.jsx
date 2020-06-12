import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { UserLogin } from '../Actions/actions'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'

export class Login extends Component {
    state = {
        userType: '',
        email: '',
        password: '',
        phone: '',
        otp: '',
        error: false
    }

    async postLogin() {
        var url
        var data
        if (this.state.userType === 'student' || this.state.userType === 'parent') {
            if (this.state.phone !== 0 && this.state.otp !== 0) {
                this.setState({
                    error: false
                })
                if (this.state.userType === 'student') {
                    url = 'https://schools-mgmt.herokuapp.com/student/login'
                }
                else if (this.state.userType === 'parent') {
                    url = 'https://schools-mgmt.herokuapp.com/parent/login'
                }
                data = {
                    otp: this.state.otp
                }
                if(this.state.userType === 'parent'){
                    data.parentPhone = this.state.phone
                }
                else if(this.state.userType === 'student'){
                    data.phone = this.state.phone
                }
            }
            else {
                await this.setState({
                    error: true
                })
                window.alert('Please fill all the fields')
            }
        }
        else if (this.state.userType === 'teacher' || this.state.userType === 'admin') {
            if (this.state.email !== '' && this.state.password !== '') {
                this.setState({
                    error: false
                })
                if (this.state.userType === 'teacher') {
                    url = 'https://schools-mgmt.herokuapp.com/teacher/login'
                }
                else if (this.state.userType === 'admin') {
                    url = 'https://schools-mgmt.herokuapp.com/admin/login'
                }
                data = {
                    email: this.state.email,
                    password: this.state.password
                }
            }
            else {
                await this.setState({
                    error: true
                })
                window.alert('Please fill all the fields')
            }

        }
        if (this.state.error === false) {
            try {
                let req = await axios.post(url, data)
                this.props.UserLogin(this.state.userType, req.data)
            }
            catch (e) {
                window.alert(e.response.data)
                this.setState({
                    email: '',
                    password: '',
                    phone: '',
                    otp: '',
                    error: false
                })
            }
        }
    }
    render() {
        return (
            <div className="col">
                {this.props.userLogin ? <Redirect to="/user" /> : ""}
                <div className="mt-5 row justify-content-center">
                    <div className="col-lg-4 col-md-8 col-sm-12 border p-5 bg-light">
                        <h1 className="text-center font-weight-lighter mb-4">Log In</h1>
                        <div className="text-center">
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input" onChange={() => this.setState({ userType: 'student' })} />
                                <label className="custom-control-label" htmlFor="customRadioInline1">Student</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline2" name="customRadioInline1" className="custom-control-input" onChange={() => this.setState({ userType: 'teacher' })} />
                                <label className="custom-control-label" htmlFor="customRadioInline2">Teacher</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline3" name="customRadioInline1" className="custom-control-input" onChange={() => this.setState({ userType: 'parent' })} />
                                <label className="custom-control-label" htmlFor="customRadioInline3">Parent</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline4" name="customRadioInline1" className="custom-control-input" onChange={() => this.setState({ userType: 'admin' })} />
                                <label className="custom-control-label" htmlFor="customRadioInline4">Admin</label>
                            </div>
                        </div>
                        {(this.state.userType === "admin" || this.state.userType === "teacher")
                            ? <div className="p-3">
                                <input type="text" className="form-control m-2" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                                <input type="password" className="form-control m-2" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                                <button className="btn btn-warning m-2 w-100" onClick={() => this.postLogin()}>Log In</button>
                            </div>
                            : ""
                        }
                        {(this.state.userType === "parent" || this.state.userType === "student")
                            ? <div className="p-3">
                                <input type="number" className="form-control m-2" placeholder="Phone" value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value })} />
                                <input type="number" className="form-control m-2" placeholder="OTP" value={this.state.otp} onChange={(e) => this.setState({ otp: e.target.value })} />
                                <button className="btn btn-warning m-2 w-100" onClick={() => this.postLogin()}>Log In</button>
                            </div>
                            : ""
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { userLogin } = state
    return {
        userLogin
    }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ UserLogin }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
