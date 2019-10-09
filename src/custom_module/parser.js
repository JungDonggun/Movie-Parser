/* eslint-disable max-len */
import axios from 'axios'
import API from '../target/API'
import movieListTable from '../models/movieParser'

const parsedDataInDatabase = (parsedData) => {
  console.log('parsedData index => ', parsedData.length)

  parsedData.map((movieData) => {
    const {
      movieNm, movieNmEn, prdtYear, openDt, prdtStatNm, nationAlt, genreAlt, repNationNm, directors, companys,
    } = movieData

    const defaults = {
      movieNmEn, prdtYear, openDt, prdtStatNm, nationAlt, genreAlt, repNationNm, directors, companys,
    }

    movieListTable.findOrCreate({
      where: { movieNm },
      defaults,
    }).spread((_, created) => {
      if (created) {
        console.log('데이터 생성 완료.')
      } else {
        console.log('중복 됌')
      }
    })
  })
}

const getMovieList = async (rowCount = 1) => {
  const res = await axios.get(`${API}&itemPerPage=${rowCount}`)

  try {
    const { movieList } = res.data.movieListResult
    console.log('data => ', movieList)

    parsedDataInDatabase(movieList)
  } catch (err) {
    console.error('MovieList Parse Error', err.message)
  }
}


export default getMovieList
