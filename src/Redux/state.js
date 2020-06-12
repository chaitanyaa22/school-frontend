let initialState = {
    userType: '',
    userData: {},
    userLogin: false,
    filteredData: {},
    filterClass: '',
    filterSection: '',
    filterTeacher: '',
    getStudent: {}
}


function filterStudentData(newState) {
    let studentsFiltered = newState.userData.students.filter(function (e) {
        if ((e.class === newState.filterClass || newState.filterClass === '') && (e.section === newState.filterSection || newState.filterSection === '')) {
            return e
        }
        return
    })
    return studentsFiltered
}

function filterTeacherData(newState) {
    let teachersFiltered = newState.userData.teachers.filter(function (e) {
        if (e.name.toLowerCase().search(newState.filterTeacher.toLowerCase()) >= 0 || e.filterTeacher === '') {
            return e
        }
        return
    })
    return teachersFiltered
}

export default function appReducer(state = initialState, action) {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        default:
            return newState
        case 'login':
            newState.userType = action.payload.userType
            newState.userData = action.payload.userData
            newState.filteredData = newState.userData
            newState.userLogin = true
            return newState
        case 'add_teacher':
            if (newState.userType === 'admin') {
                newState.userData.teachers.push(action.payload)
            }
            newState.filteredData.teachers = filterTeacherData(newState)
            newState.filteredData.students = filterStudentData(newState)
            return newState
        case 'add_student':
            if (newState.userType === 'admin') {
                newState.userData.students.push(action.payload)
            }
            newState.filteredData.teachers = filterTeacherData(newState)
            newState.filteredData.students = filterStudentData(newState)
            return newState
        case 'filter_class':
            newState.filterClass = action.payload
            newState.filteredData.teachers = filterTeacherData(newState)
            newState.filteredData.students = filterStudentData(newState)
            return newState
        case 'filter_section':
            newState.filterSection = action.payload
            newState.filteredData.teachers = filterTeacherData(newState)
            newState.filteredData.students = filterStudentData(newState)
            return newState
        case 'filter_teacher':
            newState.filterTeacher = action.payload
            newState.filteredData.teachers = filterTeacherData(newState)
            newState.filteredData.students = filterStudentData(newState)
            return newState
        case 'get_student':
            newState.getStudent = action.payload
            return newState
        case 'logout':
            newState = initialState
            return newState
    }
}