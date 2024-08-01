import React, { useState, useEffect } from 'react';
import supabase from '../../Client';
import { useParams } from 'react-router-dom';

function CommentSection({ user }) {
  const [content, setContent] = useState('');
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(false);
  const [activeReply, setActiveReply] = useState({});
  const [activeSeeReply, setActiveSeeReply] = useState({});
  const [replyContent, setReplyContent] = useState({}); 
  const [newReply, setNewReply] = useState(false);
  const [commentsFetched, setCommentsFetched] = useState(false);

  useEffect(() => {
    console.log('fetching comments and replies');
    const fetchCommentsAndReplies = async () => {
      try {
        const response = await fetch(`https://vintech-ecommerce-pern.onrender.com/api/comments/${params.id}`);
        const data = await response.json();
        const commentsWithReplies = await Promise.all(data.map(async (comment) => {
          const repliesResponse = await fetch(`https://vintech-ecommerce-pern.onrender.com/api/replies/${comment.id}`);
          const repliesData = await repliesResponse.json();
          return { ...comment, replies: repliesData };
        }));
        setComments(commentsWithReplies || []);
        setCommentsFetched(true);
      } catch (error) {
        console.error('Failed to fetch comments and replies:', error);
      }
    };

    fetchCommentsAndReplies();
  }, [params.id, newComment, newReply]);

  useEffect(() => {
    const initialActiveReplies = comments.reduce((acc, comment) => {
      acc[comment.id] = false;
      return acc;
    }, {});
    setActiveReply(initialActiveReplies);
    setActiveSeeReply(initialActiveReplies);
  }, [comments]);

  const publishComment = async (event) => {
    event.preventDefault();

    if(!user){
      alert("Log In to ask a question");
      return;
    }

    try {
      await supabase.from('Comments').insert([
        {
          productId: params.id,
          authorId: user.id,
          content: content,
        },
      ]);
      setContent('');
      setNewComment(!newComment);
    } catch (error) {
      console.error('Failed to publish comment:', error);
    }
  };

  const handleReplyChange = (commentId, value) => {
    setReplyContent(prev => ({ ...prev, [commentId]: value }));
  };

  const publishReply = async (event, commentId) => {
    event.preventDefault();

    if(!user){
      alert("Log In to answer a question");
      return;
    }
    
    const replyText = replyContent[commentId] || '';

    try {
      await supabase.from('Replies').insert([
        {
          commentId: commentId,
          authorId: user.id,
          replyText: replyText,
        },
      ]);
      setReplyContent(prev => ({ ...prev, [commentId]: '' })); 
      setNewReply(!newReply);
    } catch (error) {
      console.error('Failed to publish reply:', error);
    }
  };

  const toggleReplies = (event, commentId) => {
    setActiveSeeReply(prevActiveSeeReplies => ({
      ...prevActiveSeeReplies,
      [commentId]: !prevActiveSeeReplies[commentId]
    }));
  };

  const toggleActiveReply = (commentId) => {
    setActiveReply(prevActiveReplies => ({
      ...prevActiveReplies,
      [commentId]: !prevActiveReplies[commentId]
    }));
  };

  return (
    <section id="comments">
      <h1 id="producth1" style={{ textAlign: 'center' }}>Questions & Answers</h1>
       
        <form onSubmit={publishComment} className="commentForm">
          <textarea
            name="content"
            id="commentContent"
            placeholder="Ask a Question..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button id="commentSubmit" type="submit">
            Submit
          </button>
        </form>
      

      <ul id="commented">
        {comments.map((comment) => {
          const user = comment.User;
          return (
            <li key={comment.id}>
              <img src="../assets/placeholder-1-1.webp" alt="User" />
              <div className="comment">
                <div className="commentUser">
                  {user.firstName} {user.lastName}
                </div>
                <div className="commentContent">{comment.content}</div>

                {user && (
                  <div>
                    <button className="responder" onClick={() => toggleActiveReply(comment.id)}>
                      Reply
                    </button>
                    <form id={`replyForm-${comment.id}`} className="commentForm" onSubmit={(e) => publishReply(e, comment.id)} style={{ display: activeReply[comment.id] ? "flex" : "none" }}>
                      <textarea
                        name="replyContent"
                        id={`replyContent-${comment.id}`}
                        placeholder="Reply to this Question..."
                        value={replyContent[comment.id] || ''}
                        onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                      />
                      <button id={`replySubmit-${comment.id}`} type="submit">
                        Submit
                      </button>
                    </form>
                  </div>
                )}

                <div>
                  <button className="seeReplies" onClick={(e) => toggleReplies(e, comment.id)}>
                    <span>{activeSeeReply[comment.id] ? "▲" : "▼"}</span> See replies
                  </button>
                </div>
                <div className="replies" style={{ display: activeSeeReply[comment.id] ? "block" : "none" }}>
                  {comment.replies && comment.replies.map((reply) => (
                    <div key={reply.id} className="reply">
                      <img src="../assets/placeholder-1-1.webp" alt="User" />
                      <div className="comment">
                        <div className="commentUser">{reply.User.firstName} {reply.User.lastName}</div>
                        <div className="commentContent">{reply.replyText}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CommentSection;