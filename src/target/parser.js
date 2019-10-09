import axios from 'axios'
import { API_URL } from './API'
import { get } from 'config'

const API_KEY = get('Customer.API_KEY')

let IS_PROCESSING = false

setInterval(() => {
  if (IS_PROCESSING) {
    console.log("Movie-Parser가 영화데이터를 수집중입니다.")
  } 
}, 2000)


console.log("API KEY => ", API_KEY)
