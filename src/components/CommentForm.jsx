import { useState } from "react";

const CommentForm = ({submitLabel, handleSubmit, initialValue = "", handleCancel, hasCancelButton = false}) => {
    const [text, setText] = useState(initialValue); 
    const isTextAreaDisabled = text.length === 0;   
    
    const onFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit(text);
        setText("");
    }

    return (
        <div style = {{marginBottom : "5px"}}>
            <div style = {{paddingBottom : "5px"}}> Write Comment </div>
            <form onSubmit={onFormSubmit} style = {{display : "flex", flexDirection : "column"}}> 
                <textarea onChange={(e) => setText(e.target.value)} value = {text} style = {{height : "80px", borderRadius : "5px"}}>

                </textarea>

                <div style = {{display : "flex"}}>

                <button disabled = {isTextAreaDisabled} style = {{backgroundColor : "lightblue", marginTop : "5px", padding : "8px", width : "100px", borderRadius : "5px"}}>
                    {submitLabel}
                </button>

                { hasCancelButton && <button type = "submit" onClick = {handleCancel} style = {{backgroundColor : "lightblue", marginTop : "5px", padding : "8px", width : "100px", borderRadius : "5px", marginLeft : "5px"}}>
                    Cancel
                </button>}

                </div> 
            </form>
        </div>
    )
}

export default CommentForm;