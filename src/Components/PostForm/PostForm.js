import { useState } from 'react';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [description, setdescription] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const post = { title, description, image };
        if (title === '' || description === '' || image === '' || title.length < 8 || title.length > 32 || description.length < 8 || !image.startsWith('http')) {
            setError(true);
        }
        else {
            fetch('https://posts-pw2021.herokuapp.com/api/v1/post/create', {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
                .catch(err => console.log(err));

        }
    }

    const renderError = () => {
        return (
            <div className="alert alert-danger animate-pulse text-red-600 bg-gray-200 font-bold" role="alert">
                <p> El título debe tener entre 8 y 32 characters </p>
                <p> La descripción debe tener como mínimo 8 caracteres </p>
                <p> La imagen debe ser un url </p>
                <p> Todos los campos son obligatorios </p>
            </div>
        )
    }

    return (
        <div className="container mt-5 mb-5 p-5 bg-gray-300 rounded shadow-sm border border-secondary border-top-0 border-left-0 
            border-right-0 border-bottom-0 opacity-75">
                <h1 className="text-2xl font-bold text-center">Crear nuevo post</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row space-x-8">
                    <div className="form-group">
                        <label htmlFor="title">Titulo</label>
                        <input type="text" className="form-control rounded" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <input type="text" className="form-control rounded" id="description" value={description} onChange={(e) => setdescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Imagen</label>
                        <input type="text" className="form-control rounded" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
                    </div>
                </div>
                <div className="form-group m-3 text-center">
                    {error && renderError()}
                    <button type="submit" className="mt-6 h-auto w-1/2 md:w-min text-xl p-2 bg-blue-600 hover:bg-blue-700 text-white 
                    focus:outline-none focus:shadow-outline rounded-lg shadow px-7">Crear</button>
                </div>
            </form>
        </div>
    )
}


export default PostForm;