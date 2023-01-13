//Base URL https://api.themoviedb.org/3

//URL da API ROTAS /movie/now_playing?api_key=307744afabf035d3263284d508bf2eed&language=pt-BR

import axios from 'axios'

const api = axios.create({
   baseURL:'https://api.themoviedb.org/3/' 
})

export default api;