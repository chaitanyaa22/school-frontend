import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addTeacher, addStudent, filterClass, filterSection, filterTeacher, getStudent } from '../Actions/actions'
import Axios from 'axios'
import {Redirect} from 'react-router-dom'

export class Admin extends Component {
    state = {
        addTeacherName: '',
        addTeacherEmail: '',
        addTeacherSubject: '',
        addStudentName: '',
        addStudentClass: '',
        addStudentSection: '',
        addStudentRollNo: '',
        addStudentPhone: '',
        addStudentParentName: '',
        addStudentParentPhone: '',
        showTable: 'teacher',
        goToStudents : false
    }

    componentDidMount(){
        this.setState({
            goToStudents: false
        })
    }

    async addTeacher() {
        let data = {
            name: this.state.addTeacherName,
            email: this.state.addTeacherEmail,
            subject: this.state.addTeacherSubject
        }
        try {
            let req = await Axios.post('https://schools-mgmt.herokuapp.com/admin/addteacher', data)
            this.props.addTeacher(req.data)
        }
        catch (e) {
            window.alert(e.response.data)
        }

    }

    async addStudent() {
        let data = {
            name: this.state.addStudentName,
            class: this.state.addStudentClass,
            section: this.state.addStudentSection,
            rollNo: this.state.addStudentRollNo,
            phone: this.state.addStudentPhone,
            parentName: this.state.addStudentParentName,
            parentPhone: this.state.addStudentParentPhone
        }
        try {
            let req = await Axios.post('https://schools-mgmt.herokuapp.com/admin/addstudent', data)
            this.props.addStudent(req.data)
        }
        catch (e) {
            window.alert(e.response.data)
        }
    }

    async getStudent(e){
        await this.props.getStudent(e)
        await this.setState({
            goToStudents: true
        })
    }

    render() {
        const { userData, filteredData } = this.props
        return (
            <div className="container">
                {this.state.goToStudents ? <Redirect to='/user/children'/> : ""}
                <ul className="nav nav-pills nav-fill mt-3">
                    <li className="nav-item">
                        <span className={`${this.state.showTable === 'teacher' ? 'active' : ''} nav-link`} onClick={() => this.setState({ showTable: 'teacher' })}>Teachers</span>
                    </li>
                    <li className="nav-item">
                        <span className={`${this.state.showTable === 'student' ? 'active' : ''} nav-link`} onClick={() => this.setState({ showTable: 'student' })}>Students</span>
                    </li>
                </ul>
                {(this.state.showTable === 'teacher')
                    ? <div>
                        <div className="my-3 mt-5">
                            <span><strong>All Teachers</strong></span>
                            <span className="mx-3">Search by Name: </span>
                            <span className="mx-1"><input className="rounded" type="text" placeholder="Enter name here" value={this.props.fTeacher} onChange={(e)=>this.props.filterTeacher(e.target.value)} /></span>
                            <button type="button" className="btn btn-success btn-sm float-right" data-toggle="modal" data-target="#teacherModal">Add Teacher</button>
                        </div>
                        <table className="table table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.teachers.map((e, i) => {
                                    return <tr key={i}>
                                        <td>{e.name}</td>
                                        <td>{e.email}</td>
                                        <td>{e.subject}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <div className="modal fade" id="teacherModal" tabIndex="-1" role="dialog" aria-labelledby="teacherModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Add Teacher</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="p-3">
                                            <label htmlFor="name" className="w-100">Name
                                <input type="text" className="form-control" value={this.state.addTeacherName} onChange={(e) => this.setState({ addTeacherName: e.target.value })} id="name" />
                                            </label>
                                            <label htmlFor="email" className="w-100">Email
                                <input type="email" className="form-control" id="email" value={this.state.addTeacherEmail} onChange={(e) => this.setState({ addTeacherEmail: e.target.value })} />
                                            </label>
                                            <label htmlFor="subject" className="w-100">Subject
                                <input type="text" className="form-control" id="subject" value={this.state.addTeacherSubject} onChange={(e) => this.setState({ addTeacherSubject: e.target.value })} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="modal-footer border-0">
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.addTeacher()}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ""
                }
                {(this.state.showTable === 'student')
                    ? <div>
                        <div className="my-3 mt-5">
                            <span><strong>All Students</strong></span>
                            <span className="mx-3">Class</span>
                            <span className="mx-1">
                                <select name="" id="" className="rounded" value={this.props.fClass} onChange={(e)=>{this.props.filterClass(e.target.value)}}>
                                    <option value="">Select Class</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </span>
                            <span className="mx-3">Section</span>
                            <span className="mx-1">
                                <select name="" id="" className="rounded" value={this.props.fSection} onChange={(e)=>this.props.filterSection(e.target.value)}>
                                    <option value="">Select Section</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                    <option value="G">G</option>
                                    <option value="H">H</option>
                                    <option value="I">I</option>
                                    <option value="J">J</option>
                                </select>
                            </span>
                            <button className="btn btn-success btn-sm float-right" data-toggle="modal" data-target="#studentModal">Add Student</button>
                        </div>
                        <table className="table table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Class</th>
                                    <th>Section</th>
                                    <th>Roll no.</th>
                                    <th>Phone</th>
                                    <th>Parent Name</th>
                                    <th>Parent Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.students.map((e, i) => {
                                    return <tr key={i} onClick={()=>this.getStudent(e)}>
                                        <td>{e.name}</td>
                                        <td>{e.class}</td>
                                        <td>{e.section}</td>
                                        <td>{e.rollNo}</td>
                                        <td>{e.phone}</td>
                                        <td>{e.parentName}</td>
                                        <td>{e.parentPhone}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <div className="modal fade" id="studentModal" tabIndex="-1" role="dialog" aria-labelledby="teacherModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Add Student</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="modal-body">
                                            <div className="p-3">
                                                <label htmlFor="name" className="w-100">Name
                                <input type="text" className="form-control" id="name" value={this.state.addStudentName} onChange={(e) => this.setState({ addStudentName: e.target.value })} />
                                                </label>
                                                <label htmlFor="class" className="w-100">Class
                                <select className="form-control" id="class" value={this.state.addStudentClass} onChange={(e) => this.setState({ addStudentClass: e.target.value })}>
                                                        <option value="">Select Class</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                    </select>
                                                </label>
                                                <label htmlFor="section" className="w-100">Section
                                <select className="form-control" id="section" value={this.state.addStudentSection} onChange={(e) => this.setState({ addStudentSection: e.target.value })} >
                                    <option value="">Select Section</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                    <option value="G">G</option>
                                    <option value="H">H</option>
                                    <option value="I">I</option>
                                    <option value="J">J</option>
                                </select>
                                                </label>
                                                <label htmlFor="rollno" className="w-100">Roll Number
                                <input type="number" className="form-control" id="rollno" value={this.state.addStudentRollNo} onChange={(e) => this.setState({ addStudentRollNo: e.target.value })} />
                                                </label>
                                                <label htmlFor="phone" className="w-100">Phone
                                <input type="number" className="form-control" id="phone" value={this.state.addStudentPhone} onChange={(e) => this.setState({ addStudentPhone: e.target.value })} />
                                                </label>
                                                <label htmlFor="parentname" className="w-100">Parent's name
                                <input type="text" className="form-control" id="parentname" value={this.state.addStudentParentName} onChange={(e) => this.setState({ addStudentParentName: e.target.value })} />
                                                </label>
                                                <label htmlFor="parentphone" className="w-100">Parent's Phone
                                <input type="number" className="form-control" id="parentphone" value={this.state.addStudentParentPhone} onChange={(e) => this.setState({ addStudentParentPhone: e.target.value })} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer border-0">
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.addStudent()}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ""
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { userData, filteredData } = state
    return { userData, filteredData,
    fClass : state.filterClass,
    fSection : state.filterSection,
    fTeacher: state.filterTeacher
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addTeacher, addStudent, filterClass, filterSection, filterTeacher, getStudent }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
