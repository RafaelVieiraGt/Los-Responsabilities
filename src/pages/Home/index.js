import { useState } from "react"
import './home.css'
import { Link } from "react-router-dom";
import { auth }  from '../../firebaseconection'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();
        if(email !== '' && password !== ''){
            await signInWithEmailAndPassword(auth, email, password)
            .then(()=>{
                navigate('/admin', { replace: true })
            })
            .catch(()=>{
                alert("Algo deu errado, verifique seu E-mail ou sua senha!")
            })
        }else{
            alert("Preencha todos os campos")
        }
        
    }

    return(
        <div className="home-container">
            <h1> Lo's Responsabilities </h1>
            <span>Gerencie suas tarefas com facilidade</span>

            <form className="form" onSubmit={handleLogin}>
                <input type="text"
                placeholder="Digite seu E-mail..."
                value={email}
                onChange={(e)=> setEmail(e.target.value)}/>

                <input 
                type="password"
                placeholder="*******"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>

                <button type="submit">Acessar</button>
                
            </form>
            <Link className='button-link' to='/register'>
                Cadastre-se agora mesmo!
            </Link> 
        </div>
    )
}


export default Home