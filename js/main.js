import axiosClient from './api/axiosClient'

console.log('Hello form main.js')

async function main() {
  const response = await axiosClient.get('/posts')
  console.log('🏆 ~ main ~ response', response)
}

main()
