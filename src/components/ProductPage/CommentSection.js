import React, { useState, useEffect } from 'react';
import supabase from '../../Client';
import { useParams } from 'react-router-dom';

function CommentSection({ user }) {
  const [content, setContent] = useState('');
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [activeReply, setActiveReply] = useState({});
  const [activeSeeReply, setActiveSeeReply] = useState({});
  const [replyContent, setReplyContent] = useState({});
  const [commentsFetched, setCommentsFetched] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://vintech-ecommerce-pern.onrender.com/api/comments/${params.id}`);
        const data = await response.json();
        setComments(data || []);
        setCommentsFetched(true);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchComments();
  }, [params.id]);

  useEffect(() => {
    if (commentsFetched) {
      const fetchReplies = async () => {
        try {
          const promises = comments.map(comment =>
            fetch(`https://vintech-ecommerce-pern.onrender.com/api/replies/${comment.id}`)
              .then(response => response.json())
              .then(repliesData => ({ commentId: comment.id, repliesData }))
              .catch(error => console.error(`Failed to fetch replies for comment ${comment.id}:`, error))
          );

          const results = await Promise.all(promises);

          setComments(currentComments =>
            currentComments.map(comment => ({
              ...comment,
              replies: results.find(result => result && result.commentId === comment.id)?.repliesData || []
            }))
          );
        } catch (error) {
          console.error('Failed to fetch replies:', error);
        }
      };

      fetchReplies();
    }
  }, [params.id, commentsFetched]);

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

    if (!user) {
      alert("Log In to ask a question");
      return;
    }

    const { data, error } = await supabase.from('Comments').insert([
      {
        productId: params.id,
        authorId: user.id,
        content: content,
        User: user
      },
    ]).single();

    if (error) {
      console.error('Error publishing comment:', error);
    } else {
      setComments(prevComments => [...prevComments, data]);
      setContent('');
    }
  };

  const handleReplyChange = (commentId, value) => {
    setReplyContent(prev => ({ ...prev, [commentId]: value }));
  };

  const publishReply = async (event, commentId) => {
    event.preventDefault();

    if (!user) {
      alert("Log In to answer a question");
      return;
    }

    const replyText = replyContent[commentId] || '';

    const { data, error } = await supabase.from('Replies').insert([
      {
        commentId: commentId,
        authorId: user.id,
        replyText: replyText,
      },
    ]).single();

    if (error) {
      console.error('Error publishing reply:', error);
    } else {
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, data] }
            : comment
        )
      );
      setReplyContent(prev => ({ ...prev, [commentId]: '' }));
    }
  };

  const toggleReplies = (commentId) => {
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
                  <button className="seeReplies" onClick={() => toggleReplies(comment.id)}>
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
