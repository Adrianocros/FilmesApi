import {useParams, useNavigate, Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import api from '../../services/api'
import './filme.css'
import {toast,ToastContainer } from 'react-toastify'


function Filme(){
    const {id} = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:"307744afabf035d3263284d508bf2eed",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                //console.log(response.data)
                setFilme(response.data)
                setLoading(false)
            })
            .catch(() => {
                console.log("Filme nao encontrado")
                navigate("/",{replace:true})
                return;
            })
        }
        loadFilme();

    },[navigate, id])


    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

        if(hasFilme){
            toast.warn("Filme ja salvo na sua lista!",{
                position: toast.POSITION.TOP_CENTER
            })

            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix",JSON.stringify(filmesSalvos))
        toast.success("Filme salvo em sua lista",{
            position: toast.POSITION.TOP_CENTER
        })

    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes !</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt="{filme.title}" />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10 - Data de lançamento: {filme.release_date}</strong>
            <strong>{filme.genres.name}</strong>

            <div className='areaButton'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
                <button>
                    <Link to={`/`}>Home</Link>
                </button>
            </div>

        </div>
    )
}

export default Filme;


//https://api.themoviedb.org/3/movie/550?api_key=307744afabf035d3263284d508bf2eed