import comments from '../data/commentData.json';
import {useState} from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

const Comments = ({userId}) => {
    
    const [backendComments, setBackendComments] = useState(comments);
    const [activeComment, setActiveComment] = useState(null);

    const rootComments = backendComments.filter(backendComment => backendComment.parent_id === null);

    const getReplies = (commentId) => {
        const replies = backendComments.filter(backendComment => backendComment.parent_id === commentId);
        replies.sort((a, b) => new Date(a.commentedAt) - new Date(b.commentedAt));
        
        return replies;
    }
    const addComment = (text, parent_id = null) => {
        const newComment = {
            "id" : new Date(),
            "commentMsg" : text,
            "username" : "Priya",
            "parent_id" : parent_id,
            "userId" : "21",
            "commentedAt" : new Date().toISOString()
        }

        setBackendComments([newComment, ...backendComments]);
        console.log(backendComments);
        setActiveComment(null);
    }

    const deleteComment = (commentId) => {
        const newComments = backendComments.filter(backendComment => backendComment.id != commentId);

        setBackendComments(newComments);
    }

    const updateComment = (text, commentId) => {
        const newComments = backendComments.map(backendComment => {
            if(backendComment.id !== commentId) {
                return backendComment;
            }
            else {
                return {...backendComment, "commentMsg" : text}
            }
        })

        setBackendComments(newComments);
        setActiveComment(null);
    }

    return (
        <div>
            <h3 style = {{marginLeft : "13px"}}>Comments</h3>

            <div style = {{marginLeft : "13px"}}>
                <CommentForm handleSubmit={addComment} submitLabel={"Write"}></CommentForm>
            </div>

            {rootComments.length > 0 && 
                <div>
                    {
                        rootComments.map(comment => 
                            <div key = {comment.id}>
                                <Comment addComment = {addComment} deleteComment = {deleteComment} updateComment = {updateComment} currentUserId = {userId} comment = {comment} replies = {getReplies(comment.id)} activeComment = {activeComment} setActiveComment = {setActiveComment}></Comment>
                            </div>
                        )
                    }
                </div>
            }

        </div>
    )
}

export default Comments;