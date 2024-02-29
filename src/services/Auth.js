import Client from './api'

export const SignInCustomer = async (data) => {
  try {
    const res = await Client.post('/login', data)
    localStorage.setItem('token', res.data.token)
    return res.data.customer
  } catch (error) {
    throw error
  }
}

export const SignInCompany = async (data) => {
  try {
    const res = await Client.post('/companylogin', data)
    localStorage.setItem('token', res.data.token)
    return res.data.company
  } catch (error) {
    throw error
  }
}

export const RegisterCustomer = async (data) => {
  try {
    console.log(data)
    const res = await Client.post('/register', data)
    return res.data
  } catch (error) {
    throw error
  }
}
export const CheckSession = async () => {
  try {
    const res = await Client.get('/session')
    console.log('check session ', res.data)
    return res.data
  } catch (error) {
    throw error
  }
}
