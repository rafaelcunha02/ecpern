import React, { useState, useEffect } from 'react';
import supabase from '../../Client';
import { useParams } from 'react-router-dom';

function CommentSection({ user }) {
  const [content, setContent] = useState('');
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(false);
  const [activeReply, setActiveReply] = useState({});
  const [newReply, setNewReply] = useState(false);

  useEffect(() => {
  const fetchComments = async () => {
    try {
        const response = await fetch(`http://localhost:4005/api/comments/${params.id}`);
        const data = await response.json();
        setComments(data || []);
    } catch (error) {
        console.error('Failed to fetch comments:', error);
    }
};

    fetchComments();
  }, [params.id, newComment]);


  useEffect(() => {
    const initialActiveReplies = comments.reduce((acc, comment) => {
      acc[comment.id] = false;
      return acc;
    }, {});
    setActiveReply(initialActiveReplies);
  }, [comments]);



  const publishComment = (event) => {
    event.preventDefault();
    
    supabase.from('Comments').insert([

        {
            productId: params.id,
            authorId: user.id,
            content: content,
        },
        ]).then(() => {
        setContent('');
        });
    setNewComment(!newComment);
  };


  const publishReply = (event, idComment) => {
    event.preventDefault();
  
  supabase.from('Replies').insert([
      {
          commentId: idComment,
          authorId: user.id,
          replyText: content,
      },
      ]).then(() => {
      setContent('');
      });
  setNewReply(!newReply);
  }


  const toggleReplies = (event) => {
    // Handle replies here
  }

  const toggleActiveReply = (commentId) => {
    setActiveReply(prevActiveReplies => ({
      ...prevActiveReplies,
      [commentId]: !prevActiveReplies[commentId]
    }));
  };
  




return (
  <section id="comments">
    <h1 style={{ textAlign: 'center' }}>Questions & Answers</h1>
    {user && (
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
    )}

    <ul id="commented">
      {comments.map((comment) => {
        const user = comment.User; // Fetch user data here
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
                  <form id="replyForm" className="commentForm" onSubmit={(e) => publishReply(e, comment.id)} style={{display : activeReply[comment.id] ? "flex" : "none"}}>
                    <textarea
                      name="replyContent"
                      id="replyContent"
                      placeholder="Reply to this Question..."
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <button id="replySubmit" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              )}

              <div>
                <button className="seeReplies" onClick={toggleReplies}>
                  <span>&#x25BC;</span> See replies
                </button>
              </div>
              <div className="replies">
                <form id="replyForm" className="commentForm" style={{ display: 'none' }} onSubmit={publishReply}>
                  <textarea className="areaReply" name="content" placeholder="Reply to this Question..." />
                  <div className="alignButtonReply">
                    <button id="replySubmit" type="submit">Submit</button>
                  </div>
                </form>
                <ul id="replysUl" style={{ display: 'none' }}>
                  {/* Handle replies here */}
                </ul>
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