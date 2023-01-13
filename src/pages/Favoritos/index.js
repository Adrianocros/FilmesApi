import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

import './favoritos.css'

function Favoritos(){

const [filmes, setFilmes] = useState([])

useEffect (() =>{
    const minhaLista = localStorage.getItem("@primeflix")
    setFilmes(JSON.parse(minhaLista) || [])
},[])


function excluirFilme(id){
   let filtroFilmes = filmes.filter((item) => {
    return(item.id !== id)
   })
   setFilmes(filtroFilmes)
   localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
   toast.info("Filmes removido de sua lista ",{
    position: toast.POSITION.TOP_CENTER
   })
}

    return(
        <div className='fav-container'>
            <div className='meus-filmes'>
                <h1>Milha lista de favoritos</h1>
                {filmes.length === 0 && <span>"Voce não possui filmes salvos !</span>}
                <ul>
                    {filmes.map((item)=> {
                        return(
                            <li key={item.id}>
                                <span>{item.title}</span>
                                <div>
                                    <Link class="button" to={`/filme/${item.id}`}><span className='btn-detalhes'>Detalhes</span></Link>
                                    <button class="button"  onClick={() => excluirFilme(item.id)}><span>Remover</span></button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Favoritos;