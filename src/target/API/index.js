import config from 'config'

const key = config.get('Customer.API_KEY')

const query = `?key=${key}`

const API_URL = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json${query}`

export default API_URL
