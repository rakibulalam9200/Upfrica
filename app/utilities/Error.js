import { isEmpty, isValidEmail, isValidPassword, isValidUserName } from './Validation'

  
  export const errorTypes = [
    'email',
    'username',
    'password',
    'phone',
    'firstName',
    'lastName',
    'policy'
  ]
  
  export const getErrorMessage = (err) => {
    let errorMsg = ''
    const data = err.response.data
    console.log(data)
    errorTypes.forEach((type) => {
      if (data['errors'][type]) {
        try {
          errorMsg += data['errors'][type][0] + '\n'
        } catch (e) {}
      }
    })
  
    return errorMsg
  }
  
  export const getOnlyErrorMessage = (err) => {
    let errorMsg = ''
    const data = err.response.data
    console.log(data)
    if (data.message) {
      errorMsg += data.message
    }
  
    return errorMsg
  }
  
  const setSingleError = (key, val, setErrors) => {
    setErrors((prev) => {
      return {
        ...prev,
        [key]: val,
      }
    })
  }
  
  export const hasEmailErrors = (email, setErrors) => {
    if (isEmpty(email)) {
      setSingleError('email', 'Email can not be empty', setErrors)
      return true
    }
  
    if (!isValidEmail(email)) {
      setSingleError('email', 'Please Enter a valid email address.', setErrors)
      return true
    }
    setSingleError('email', '', setErrors)
    return false
  }
  
//   export const hasUserNameErrors = (userName, setErrors) => {
//     if (isEmpty(userName)) {
//       setSingleError('userName', 'User Name can not be empty.', setErrors)
//       return true
//     }
  
//     if (!isValidUserName(userName)) {
//       setSingleError('userName', 'Please Enter a valid user name.', setErrors)
//       return true
//     }
//     setSingleError('userName', '', setErrors)
//     return false
//   }
  
  export const hasPasswordErrors = (password, rPassword, setErrors) => {
    if (isEmpty(password) || isEmpty(rPassword)) {
      setSingleError('password', 'Passwords can not be empty', setErrors)
      return true
    }
  
    if (password !== rPassword) {
      setSingleError('password', 'Password did not match.', setErrors)
      return true
    }
  
    if (!isValidPassword(password)) {
      setSingleError(
        'password',
        'Password should contain minimum six characters',
        setErrors
      )
      return true
    }
    setSingleError('password', '', setErrors)
    return false
  }

  export const hasUserNameErrors = (username, setErrors) => {
    if (isEmpty(username)) {
      setSingleError('username', 'User name can not be empty', setErrors)
      return true
    }
  
    if (!isValidUserName(username)) {
      setSingleError('username', 'Invalid user name', setErrors)
      return true
    }
    setSingleError('username', '', setErrors)
    return false
  }

  export const hasfNameErrors = (firstName, setErrors) => {
    if (isEmpty(firstName)) {
      setSingleError('firstName', `Last Name can not be empty` , setErrors)
      return true
    }
    setSingleError('firstName', '', setErrors)
    return false
  }

  export const haslNameErrors = (lastName, setErrors) => {
    if (isEmpty(lastName)) {
      setSingleError('lastName', `Last Name can not be empty` , setErrors)
      return true
    }
    setSingleError('lastName', '', setErrors)
    return false
  }

  export const hasPolicyErrors = (policy, setErrors) => {
    console.log("policy...",policy)
    if (!policy) {
      setSingleError('policy', `Please, Check Term & Privacy Policy` , setErrors)
      return true
    }
    setSingleError('policy','', setErrors)
    return false
  }

  
  
  