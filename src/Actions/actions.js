export const UserLogin = (userType, userData) => {
    return {
        type: 'login',
        payload: {
            userType: userType,
            userData: userData
        }
    }
}

export const addTeacher = (teacherData) => {
    return {
        type: 'add_teacher',
        payload: teacherData
    }
}

export const addStudent = (studentData) => {
    return {
        type: 'add_student',
        payload: studentData
    }
}

export const filterClass = (fclass) => {
    return {
        type: 'filter_class',
        payload: fclass
    }
}

export const filterSection = (fsection) => {
    return {
        type: 'filter_section',
        payload: fsection
    }
}

export const filterTeacher = (teacher) => {
    return {
        type: 'filter_teacher',
        payload: teacher
    }
}

export const getStudent = (child) => {
    return {
        type: 'get_student',
        payload: child
    }
}

export const logout = () => {
    return {
        type: 'logout'
    }
}
