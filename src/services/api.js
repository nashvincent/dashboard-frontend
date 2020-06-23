import axios from 'axios'

const BASE_URL = 'https://196414905eb1.ngrok.io'

const getInitialData = async () => {
  const response = await axios.get(`${BASE_URL}/initial`)
  return response.data
}

const getRandom = async () => {
  const response = await axios.get(`${BASE_URL}/get_rand_abst`)
  return response.data
}

const analyze = async abst => {
  const response = await axios.post(`${BASE_URL}/analyze`, { abstract: abst })
  console.log('Axios API returned data after analysis')
  console.log(response)
  return response.data
}

const train = async abst => {
  const response = await axios.post(`${BASE_URL}/train`, { abstract: abst })
  console.log('data returned by train function')
  console.log(response.data)

  return response.data
}

const uploadFile = async file => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await axios.post(`${BASE_URL}/upload`, formData)
  return response.status
}

export default { getRandom, analyze, train, uploadFile, getInitialData }
