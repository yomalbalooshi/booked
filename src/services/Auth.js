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
    const res = await Client.post('/register', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateCustomerProfile = async (data) => {
  try {
    const res = await Client.get('/session')
    await Client.put(`/update/${res.data.id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateCompanyProfile = async (data) => {
  try {
    const res = await Client.get('/session')
    await Client.put(`/companyupdate/${res.data.id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const res = await Client.get('/session')
    return res.data
  } catch (error) {
    throw error
  }
}
