import axios from 'axios'
import API from '../target/API'

const getMovieList = async () => {
  const res = await axios.get(API)

  try {
    const { movieList } = res.data.movieListResult
    console.log('data => ', movieList)
  } catch (err) {
    console.log('MovieList Parse Error', err)
  }
}

export default getMovieList
