/* eslint-disable max-len */
import axios from 'axios'
import API from '../../target/API'
import movieListTable from '../../models/movieParser'

const MAX_PAGE = 720
const TIMER = 1 // 초 단위

const joinTheDirectors = (directors) => {
  const module = directors.map((director) => director.peopleNm).join(',')
  return module
}

const parsedDataInDatabase = (parsedData) => {
  const test = parsedData.map((movieData) => {
    const {
      movieNm, movieNmEn, prdtYear, openDt, prdtStatNm, nationAlt, genreAlt, repNationNm, directors,
    } = movieData

    // @ts-ignore
    return movieListTable.findOrCreate({
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
    }).catch((err) => {
      if (err.message !== 'movieNmEn must be unique') {
        console.error('MovieListTable Error =>', err)
      }
    })
  })

  return Promise.all(test).then(() => Promise.resolve(true))
}

const getMovieList = async (rowCount = 10, page = 1) => {
  const response = await axios.get(`${API}&itemPerPage=${rowCount}&curPage=${page}`)
  const pageIndex = page

  try {
    const { movieList } = response.data.movieListResult

    if (pageIndex > MAX_PAGE) {
      throw console.log('해당 API에 영화 정보가 더이상 없습니다.')
    }

    const saveInDatabase = await parsedDataInDatabase(movieList)

    if (saveInDatabase) {
      setTimeout(() => {
        getMovieList(rowCount, page + 1)
        console.log(`크롤링 상황 ${page}/${MAX_PAGE}`)
      }, TIMER * 1000)
    }
  } catch (err) {
    console.error('MovieList Parse Error', err.message)
  }
}


export default getMovieList
