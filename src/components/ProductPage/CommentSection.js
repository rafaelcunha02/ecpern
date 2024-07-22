import React, { useState, useEffect } from 'react';
import supabase from '../../Client';
import { useParams } from 'react-router-dom';

function CommentSection({ user }) {
  const [content, setContent] = useState('');
  const params = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await supabase
        .from('Comments')
        .select('id, authorId, content')
        .eq('productId', params.id);
      setComments(data  || []);
    };

    fetchComments();
  }, [params.id, comments]);

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

  };

  const toggleReplies = (event) => {
    // Handle replies here
  }

    const toggleReplyForm = (event) => {
    // Handle reply form here
    }

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
          const user = {}; // Fetch user data here
          return (
            <li key={comment.commentID}>
              <img src="../assets/placeholder-1-1.webp" alt="User" />
              <div className="comment">
                <div className="commentUser">
                  {user.firstName} {user.lastName}
                </div>
                <div className="commentContent">{comment.content}</div>

                {user && (
                  <div>
                    <button className="responder" onClick={toggleReplyForm}>
                      Reply
                    </button>
                  </div>
                )}

                <div>
                  <button className="seeReplies" onClick={toggleReplies}>
                    <span>&#x25BC;</span> Replies
                  </button>
                </div>
                {/* Handle replies here */}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CommentSection;