import Client from './api'
import { data } from './seeds.json'

const companies = data.map((item) => ({
  name: item.name,
  email: item.email,
  password: '123'
}))

export const companyCreation = async () => {
  companies.map(async (item) => {
    try {
      const res = await Client.post('/companyregister', item)
      return res.data
    } catch (error) {
      // throw error
    }
  })
}
