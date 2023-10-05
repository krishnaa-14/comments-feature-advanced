import CommentForm from "./CommentForm";

const Comment = ({comment, replies, currentUserId, activeComment, setActiveComment, addComment, deleteComment, updateComment, parentId}) => {

    const canReply = Boolean(currentUserId);
    const canEdit = comment.userId === currentUserId;
    const canDelete = comment.userId === currentUserId;

    const isReplying = activeComment && activeComment.type === "Replying" && activeComment.id === comment.id;
    const isEditing = activeComment && activeComment.type === "Editing" && activeComment.id === comment.id;
    const replyId = parentId ? parentId : comment.id;

    return (
        <div style = {{display : "flex", padding : "13px"}}>
            <div>
                <img src = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png" style = {{width :"45px", height : "45px"}}/> 
            </div>

            <div style = {{padding : "5px"}}>
                <div style = {{display : "flex"}}>
                    <div style = {{fontWeight : "bold", marginBottom : "2px"}}>
                        {comment.username}
                    </div>

                    <div style = {{marginLeft : "10px"}}>
                        {comment.commentedAt}
                    </div>
                </div>

                {
                    isEditing && 
                    <div>
                        <CommentForm initialValue = {comment.commentMsg} handleSubmit={(text) => updateComment(text, comment.id)} submitLabel={"Update"} hasCancelButton = {true} handleCancel = {() => setActiveComment(null)}> </CommentForm>
                    </div>
                }

                { !isEditing && <div>
                    {comment.commentMsg}
                </div>
                }

                <div style = {{display : "flex", marginTop : "6px"}}>
                    {canReply && <div style = {{marginRight : "6px", fontSize : "13px", cursor : "pointer", color : "blue"}} onClick={() => setActiveComment({
                        "type" : "Replying",
                        "id" : comment.id
                    })}> Reply </div>}
                    {canEdit && <div style = {{marginRight : "6px", fontSize : "13px", cursor : "pointer", color : "blue"}} onClick={() => setActiveComment({
                        "type" : "Editing",
                        "id" : comment.id
                    })}> Edit </div>}
                    {canDelete && <div style = {{marginRight : "6px", fontSize : "13px", cursor : "pointer", color : "blue"}} onClick={() => deleteComment(comment.id)}> Delete </div>}
                </div>

                {
                    isReplying && 
                    <div>
                        <CommentForm handleSubmit={(text) => addComment(text, replyId)} submitLabel={"Reply"}> </CommentForm>
                    </div>
                }

                <div>
                {
                    replies.length > 0 && 
                    <div>
                        {
                            replies.map(reply => 
                                <div key = {reply.id}>
                                    <Comment comment={reply} replies={[]} currentUserId={currentUserId} activeComment={activeComment} setActiveComment={setActiveComment} addComment={addComment} deleteComment = {deleteComment} updateComment = {updateComment} parentId={comment.id}></Comment>
                                </div>
                            )
                        }
                    </div>
                }
            </div>
            </div>
        </div>
    )
}

export default Comment;