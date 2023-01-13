import {Link} from 'react-router-dom'
import './erro.css'


function Erro(){
    return(
    <div className="not-found">
        <h3>ERROR</h3>
        <h1>404</h1>
        <h2>OPS ! - Pagina não encontrada </h2>
        <Link to="/">Veja Todos os filmes</Link>
    </div>)
    
}

export default Erro;