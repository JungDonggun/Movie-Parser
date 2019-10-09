/* eslint-disable max-len */
import axios from 'axios'
import API from '../target/API'
import movieListTable from '../models/movieParser'


const joinTheDirectors = (directors) => {
  const module = directors.map((director) => director.peopleNm).join(',')

  return module
}

const parsedDataInDatabase = (parsedData) => {
  parsedData.map((movieData) => {
    const {
      movieNm, movieNmEn, prdtYear, openDt, prdtStatNm, nationAlt, genreAlt, repNationNm, directors,
    } = movieData

    // @ts-ignore
    movieListTable.findOrCreate({
      where: { movieNm },
      defaults: {
        movieNmEn,
        prdtYear,
        openDt,
        prdtStatNm,
        nationAlt,
        genreAlt,
        repNationNm,
        directors: joinTheDirectors(directors),
      },
    }).spread((_, created) => {
      if (created) {
        console.log('데이터 생성 완료.')
      } else {
        console.log('중복 됌')
      }
    }).catch((err) => {
      console.error('MovieListTable Error =>', err.message)
    })
  })
}

const getMovieList = async (rowCount = 10) => {
  const res = await axios.get(`${API}&itemPerPage=${rowCount}`)

  try {
    const { movieList } = res.data.movieListResult
    parsedDataInDatabase(movieList)
  } catch (err) {
    console.error('MovieList Parse Error', err.message)
  }
}


export default getMovieList
