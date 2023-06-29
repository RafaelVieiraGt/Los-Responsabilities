import './admin.css'
import { useState, useEffect } from 'react';
import { auth, db } from '../../firebaseconection'
import { signOut } from 'firebase/auth';
import { addDoc, collection,updateDoc, onSnapshot,orderBy,query,where, deleteDoc, doc } from 'firebase/firestore';

function Admin(){
    const [tarefaInput, setTarefaInput] = useState("")
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState({})

    const [tarefas, setTarefas] = useState([])
    useEffect(()=>{
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if(userDetail){
                const data =JSON.parse(userDetail);
                const tarefaRef = collection(db,"tarefas");
                const q =query(tarefaRef,orderBy("created", "desc"), where("userUid","==", data?.uid))
                const unsub = onSnapshot(q,(snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc)=>{
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid,
                            
                        })
                    })
                    
                    setTarefas(lista);
                })
            }
        }

        loadTarefas();
    },[])


    async function handleRegister(e){
        e.preventDefault();
        if(tarefaInput===""){
            alert("Digite uma Tarefa!")
            return
        }


        if(edit?.id){
            handleUpdateTarefa();
            return
        }

        await addDoc(collection(db,"tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid,
        })
        .then(()=>{
            alert("Tarefa Registrada!");
            setTarefaInput("");
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    async function handleLogout(){
        await signOut(auth);
    }

    async function deleteTarefa(id){
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)
    }

    function editTarefa(item){
        setTarefaInput(item.tarefa)
        setEdit(item);

    }

    async function handleUpdateTarefa(){
        const docRef = doc(db,"tarefas", edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
        .then(()=>{
            console.log("tarefa atualizada");
            setTarefaInput("");
            setEdit({})
        })
        .catch(()=>{
            console.log("erro ao atualizar")
            setEdit({});
            setTarefaInput("");
        })

    }
    return(
        <div className='admin-container'>
            <h1>Minhas tarefas</h1>
            <form className='form' onSubmit={handleRegister}>
                <textarea placeholder='Digite sua tarefa'
                value={tarefaInput}
                onChange={(e)=>{setTarefaInput(e.target.value)}}>

                </textarea>

                {Object.keys(edit).length > 0 ? (
                    <button className='btn-register' type='submit' style={{backgroundColor: '#ffcc23', color: "black"}}>Atualizar Tarefa</button>

                ) : (
                    <button className='btn-register' type='submit'>Registrar Tarefa</button>
                )}
            </form>

            {tarefas.map((item)=>(
                <article key={item.id} className='list'>
                <p>{item.tarefa}</p>
                <div>
                    <button onClick={()=> editTarefa(item)}>Editar</button>
                    <button className='btn-delete' onClick={()=>deleteTarefa(item.id)}>Concluir</button>
                </div>
            </article>
            ))}


            <button className='btn-logout' onClick={handleLogout}>Sair</button>
        </div>
    )
}

export default Admin;