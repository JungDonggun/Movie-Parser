/* eslint-disable max-len */
import axios from 'axios'
import API from '../../target/API'
import movieListTable from '../../models/movieParser'

const TIMER = 1 // 초 단위

const parsedDataInDatabase = (parsedData) => {
  console.log('parsedData leng', parsedData.length)
  console.log('parsedData type', typeof parsedData)

  const isWork = parsedData.map((movieData) => {
    const {
      title,
      alternativeTitle,
      language,
      regDate,
      person,
      referenceIdentifier,
      rights,
    } = movieData

    let { extent, subjectCategory } = movieData

    extent = extent.split(':')[1].replace(' ', '')
    subjectCategory = subjectCategory.split(':')[1].replace(' ', '')

    console.log('movieData', {
      title,
      alternativeTitle,
      extent,
      language,
      regDate,
      person,
      referenceIdentifier,
      rights,
      subjectCategory,
    })

    // @ts-ignore
    return movieListTable.findOrCreate({
      where: { title },
      defaults: {
        alternativeTitle,
        extent,
        language,
        regDate,
        person,
        referenceIdentifier,
        rights,
        subjectCategory,
      },
    }).spread(() => {
      console.log(`movie Name: ${title}`)
    }).catch((err) => {
      if (err.message !== 'movieNmEn must be unique') {
        console.error('MovieListTable Error =>', err)
      }
    })
  })

  return Promise.all(isWork).then(() => Promise.resolve(true))
}

const getMovieList = async (rowCount = 10, page = 1) => {
  const response = await axios.get(`${API}?numOfRows=${rowCount}&pageNo=${page}`)
  const pageIndex = page

  try {
    const parsedData = response.data.response.body.items.item


    const saveInDatabase = await parsedDataInDatabase(parsedData)

    if (saveInDatabase) {
      setTimeout(() => {
        getMovieList(rowCount, page + 1)
        console.log(`${page} 페이지를 DataBase에 저장했습니다.`)
      }, TIMER * 1000)
    }
  } catch (err) {
    console.error('MovieList Parse Error', err.message)
  }
}


export default getMovieList
