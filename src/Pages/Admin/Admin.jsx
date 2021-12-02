import { useUserContext } from '../../Contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PostForm from '../../Components/PostForm/PostForm'
import Services from '../../Services/Services'
import PostBox from '../../Components/PostBox/PostBoxAdmin'
import PostBoxNoToggle from '../../Components/PostBox/PostBox'


export default function Admin() {
    const navigate = useNavigate()
    const { logout } = useUserContext()
    const [posts, setPosts] = useState([])
    const [posts1, setPosts1] = useState([])
    const [page, setPage] = useState(0)
    const [pageOwned, setPageOwned] = useState(0)
    const [postTitle, setPostTitle] = useState('')
    const [postFound, setPostFound] = useState([])

    const logoutHandler = () => {
        logout()
        navigate("/login")
    }

    useEffect(() => {
        const getPosts = async () => {
            const posts = await Services.getAll(page)
            setPosts(posts.data)
        }
        getPosts()
    }, [page])  /*acá obtenmos el get all */
    
    useEffect(() => {
        const getPostsowned = async () => {
            const posts1 = await Services.getOwned(pageOwned)
            setPosts1(posts1.data)
        }
        getPostsowned()
    }, [pageOwned])  /*acá obtenmos el get owned */

    const nextPage = () => {
         setPage(page + 1)
    }

    const prevPage = () => {
        if (page !==0) {
            setPage(page - 1)
        }
        else{
            setPage(0)
        }
    }

    const nextPageOwned = () => {
        setPageOwned(pageOwned + 1)
   }

   const prevPageOwned = () => {
       if (pageOwned !==0) {
           setPageOwned(pageOwned - 1)
       }
       else{
           setPageOwned(0)
       }
   }
    
    const  postsFound = (title) => { 
        const postsFound = posts.filter(post => post.title.toLowerCase().includes(title.toLowerCase()))
        setPostFound(postsFound)
    } 
    


    const postList = posts.map(posts => {
        return <PostBoxNoToggle key={posts.id} post={posts} />
    })

    const postsOwned = posts1.map(posts => {
        return <PostBox key={posts.id} post={posts} />
    })

    return( 
    <main className="flex gap-4 flex-col lg:flex-row justify-around items-center p-6 lg:p-10 min-h-screen  bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 w-screen">
    <section className="w-4/5 lg:w-1/2 gap-6 h-full flex flex-col justify-center items-center">
        <h1 className="text-6xl text-black text-center w-screen">¡Bienvenido a la página de admin!</h1>
  
        
        <div className="flex flex-col">
            <PostForm/>
        </div>

        <form className="flex flex-row gap-4">
            <input className="w-full py-2 px-16 rounded-lg outline-none" type="text" placeholder="Buscar Post" onChange={(e) => setPostTitle(e.target.value)}/>
            <button className="w-full rounded-lg bg-pink-500 hover:bg-pink-600" type="button" onClick={(e) => postsFound(postTitle)}>Buscar</button>
        </form>

        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-medium text-black text-center">Posts encontrados </h1>
            <div className="flex flex-col gap-4">
                {postFound.map(post => {
                    return <PostBoxNoToggle key={post.id} post={post} />
                })}
            </div>
        </div>

        <h1 className="text-xl font-medium text-white text-center mt-6">__________________________________________</h1>
        
        <div className="flex flex-col mt-6 justify-center content-center">
            <h1 className="text-2xl font-medium text-black text-center">Tus posts</h1>
            <div className="flex flex-col content-center md:w-min">
                {postsOwned}
            </div>
            <div className="flex flex-row gap-4 justify-center">
                <button onClick={prevPageOwned} className="mt-6 h-auto w-1/2 md:w-min text-xl p-2 bg-green-500 hover:bg-green-600 text-white 
                    focus:outline-none focus:shadow-outline rounded-lg shadow px-7" >Anterior</button>
                <button onClick={nextPageOwned} className="mt-6 h-auto w-1/2 md:w-min text-xl p-2 bg-green-500 hover:bg-green-600 text-white 
                    focus:outline-none focus:shadow-outline rounded-lg shadow px-7" >Siguiente</button>
            </div>
            <h1 className="text-xl font-medium text-white text-center mt-6">__________________________________________</h1>
            <h1 className="text-2xl font-medium text-black text-center">Posts</h1>
            <div className="flex flex-col content-center md:w-min">
                {postList}
            </div>
        </div>

        <div className="flex flex-row gap-4 justify-item-center">
                <button onClick={prevPage} className="mt-6 h-auto w-1/2 md:w-min text-xl p-2 bg-green-500 hover:bg-green-600 text-white 
                    focus:outline-none focus:shadow-outline rounded-lg shadow px-7" >Anterior</button>
                <button onClick={nextPage} className="mt-6 h-auto w-1/2 md:w-min text-xl p-2 bg-green-500 hover:bg-green-600 text-white 
                    focus:outline-none focus:shadow-outline rounded-lg shadow px-7" >Siguiente</button>
        </div>

        <h1 className="text-xl font-medium text-white text-center mt-6">__________________________________________</h1>

        <button onClick={logoutHandler} className="mt-6 h-auto w-1/2 md:w-min text-xl bg-red-600 hover:bg-red-700 text-white 
            focus:outline-none focus:shadow-outline rounded-lg shadow px-10 py-2 text-center" >Cerrar sesión</button>

    </section>


</main>);
}