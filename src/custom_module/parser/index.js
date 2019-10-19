/* eslint-disable max-len */
import axios from 'axios'
import API from '../../target/API'
import movieListTable from '../../models/movieParser'

const MAX_PAGE = 720
const LATEST_PAGE = 389;
const TIMER = 1 // 초 단위

const joinTheDirectors = (directors) => {
  const module = directors.map((director) => director.peopleNm).join(',')
  return module
}

const parsedDataInDatabase = (parsedData) => {
  const isWork = parsedData.map((movieData) => {
    const {
      alternativeTitle,
      extent,
      person,
      referenceIdentifier,
      rights,
      subjectCategory,
    } = movieData

    // @ts-ignore
    // return movieListTable.findOrCreate({
    //   where: { movieNm },
    //   defaults: {
    //     movieNmEn,
    //     prdtYear,
    //     openDt,
    //     prdtStatNm,
    //     nationAlt,
    //     genreAlt,
    //     repNationNm,
    //     directors: joinTheDirectors(directors),
    //   },
    // }).spread(() => {
    //   console.log(`movie Name: ${movieNm}`)
    // }).catch((err) => {
    //   if (err.message !== 'movieNmEn must be unique') {
    //     console.error('MovieListTable Error =>', err)
    //   }
    // })
  })

  return Promise.all(isWork).then(() => Promise.resolve(true))
}

const getMovieList = async (rowCount = 10, page = 1) => {
  const response = await axios.get(`${API}?numOfRows=${rowCount}&pageNo=${page}`)
  const pageIndex = page

  try {
    console.log('response', response.data.response.body.items.item)
  } catch (err) {
    console.error('err o=> ', err)
  }

  try {
    const parsedData = response.data.response.body.items.item

    if (pageIndex > MAX_PAGE) {
      throw console.log('해당 API에 영화 정보가 더이상 없습니다.')
    }

    const saveInDatabase = await parsedDataInDatabase(parsedData)

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
