import axios from 'axios'
import {CLIENT_URL} from './constants'

export default axios
    .get(`${CLIENT_URL}/api/words`)
    .catch(err => console.log(err))
    
