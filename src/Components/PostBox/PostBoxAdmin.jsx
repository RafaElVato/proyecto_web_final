import { FcLike } from 'react-icons/fc';
import { AiOutlineComment } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import Service from '../../Services/Services';
import { useState } from 'react';

export default function PostBox ({ post }) {
  const [comment, setComment] = useState('');
  
  const commentsList = post.comments.map((comment) => {
    return (
      <div className="comment-box bg-gray-300 p-2 rounded-lg m-2">
        <p className="comment-text">{comment.user.username}</p>
        <p className="comment-text">{comment.description}</p>
      </div>
    );
  });

  const commentPost = (e) => {
    const id = post._id;
    const commentBody = {
      description: comment
    }
    Service.commentPost(id, commentBody)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
    setComment('');
  };

    const togglePostActive = () => {
        if (post.active==='true') {
            Service.toggle(post._id, false)
        } else {
            Service.toggle(post._id, true)
        }
    }

  return (
    <div className="post-box col-md-4 col-sm-6 col-12 p-10 mb-4 shadow-lg rounded bg-gray-200 m-2">
        <div className="flex flex-row text-center justify-center">
            <button className="like-button bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full justify-center items-center" onClick={togglePostActive}> x </button>
        </div>
      <h1 className="font-roboto text-black text-center"> {post.user.username} </h1>
      <h1 className="text-center text-xl font-bold text-black">{post.title}</h1>
      <h1 className="text-justify text-sm text-black">{post.description}</h1>
        <div className="post-box-body-image auto">
          <img src={post.image} alt="post" />
        </div>
      <div className="post-box-footer flex flex-row justify-center space-x-36">
          <div className="post-box-footer-left-icon flex flex-row">
            <button className="btn btn-link"> <AiOutlineComment /> </button>
            <h1 className="text-sm text-black">{post.comments.length}</h1>
          </div>
          <div className="post-box-footer-left-icon">
            <button className="btn btn-link"> <FcLike /> </button>
          </div>
          <div className="post-box-footer-left-icon flex flex-row">
            <button className="btn btn-link"> <AiOutlineLike /> </button>
            <h1 className="text-sm text-black">{post.likes.length}</h1>
          </div>
      </div>
        <div className="comment-box flex flex-col bg-gray-400 p-3 rounded-sm">
          <h1 className="comment-text text-black font-bold">Comentarios</h1>
            <h1 className="comment-text">{commentsList}</h1>
        </div>
        <form className="comment-box flex flex-row justify-center items-center" onSubmit={commentPost}>
          <input className="comment-text" type="text" placeholder="Comentar" onChange={(e) => setComment(e.target.value)}/>
          <button className="btn btn-link rounded-full bg-blue-600 p-3 m-2" type="submit"><FiSend/></button>
        </form>
    </div>
  ) 
}