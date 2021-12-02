import { useUserContext } from '../../Contexts/UserContext'
import { useNavigate } from 'react-router-dom'


import Services from '../../Services/Services';
import { useEffect, useState } from 'react'
import PostBox from '../../Components/PostBox/PostBox'

export default function User() {
    const navigate = useNavigate()
    const { logout } = useUserContext()
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(0)
    const [postTitle, setPostTitle] = useState('')
    const [postFound, setPostFound] = useState([])

    const logoutHandler = () => {
        logout();
        navigate("/login");
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await Services.getAll(page);
            setPosts(posts.data);
          
        }// fetchPosts
        fetchPosts()
        
    
    }, [page]) // use efect
    
    const nextPage = () => {
        setPage(page + 1);
    }
    const prevPage = () => {
        if (page !==0) {
            setPage(page - 1)
        }
        else{
            setPage(0)
        }
    } 
    const  postsFound = (title) => { 
        const postsFound = posts.filter(post => post.title.toLowerCase().includes(title.toLowerCase()))
        setPostFound(postsFound)
    } 

    const postlist1 = posts.map(posts => {
        return <PostBox key={posts.id} post={posts} />
    })
    
   

    return( 
    <main className="flex gap-4 flex-col lg:flex-row justify-around items-center p-6 lg:p-10 min-h-screen  bg-gradient-to-r from-green-400 to-blue-400 w-screen">
        <section className="w-4/5 lg:w-1/2 gap-6 h-full flex flex-col justify-center items-center">
            <div className="w-4/5 lg:w-1/2 gap-6 h-full flex flex-col justify-around items-center">
            <h1 className="text-6xl text-black text-center w-screen">¡Bienvenido a la página de usuario!</h1>
                
                <form className="flex flex-row gap-4">
                    <input className="w-full py-2 px-16 rounded-lg outline-none" type="text" placeholder="Buscar Post" onChange={(e) => setPostTitle(e.target.value)}/>
                    <button className="w-full rounded-lg bg-pink-500 hover:bg-pink-600" type="button" onClick={(e) => postsFound(postTitle)}>Buscar</button>
                </form>

                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-medium text-black text-center">Posts encontrados </h3>
                    <div className="flex flex-col gap-4">
                        {postFound.map(post => {
                            return <PostBox key={post.id} post={post} />
                        })}
                    </div>
                </div>
                
                
                <div className="flex flex-col mt-6 justify-center">
                

                <p className="text-xl font-medium text-white text-center mt-6">__________________________________________</p>
                    <h3 className="text-2xl font-medium text-black text-center">Posts</h3>
                    <div className="grid ">
                        {postlist1}
                    </div>
                </div>
                <div className="flex flex-row gap-4 justify-item-center">
                        <button onClick={prevPage} className=" mt-6 h-auto w-1/2 md:w-min text-xl p-2 bg-blue-600 hover:bg-blue-700 text-white 
                focus:outline-none focus:shadow-outline rounded-lg shadow px-7" >Anterior</button>
                        <button onClick={nextPage} className="  mt-6 h-auto w-1/2 md:w-min text-xl p-2 bg-blue-600 hover:bg-blue-700 text-white 
                focus:outline-none focus:shadow-outline rounded-lg shadow px-7" >Siguiente</button>
                </div>
            
            
            </div>
        <button onClick={logoutHandler} className=" mt-6 h-auto w-1/2 md:w-min text-xl p-2 bg-red-500 hover:bg-red-600 text-white 
            focus:outline-none focus:shadow-outline rounded-lg shadow px-7" >Cerrar sesión</button>
        </section>
    </main>
    )
}
