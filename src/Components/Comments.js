import React, { useState, useEffect } from "react"
function Comments(props) {
    const [comments, setComments] = useState(sessionStorage.getItem(props.indexType+'-'+props.index+'-Comments') ? JSON.parse(sessionStorage.getItem(props.indexType+'-'+props.index+'-Comments')) : [])
    useEffect(function persistComments() {
        if (comments.length > 0) {
            sessionStorage.setItem(props.indexType+'-'+props.index+'-Comments', JSON.stringify([...comments]));
        }
    });

    const [inputText, setInputText] = useState("")

    const addCommentSection =
        <div>
            <input className="commentTextInput" name="commentInput" type="text" value={inputText} onChange={(e) => {setInputText(e.target.value)}}/>
            <button 
                onClick={() => {
                    setComments([...comments, {commentBody: inputText, upVotes: 0, upVoted: false}])
                    setInputText("")
                }}
            >
                Add Comment
            </button>
        </div> 

    const commentList = comments.map((comment, index) => {
        let upVoteButton = (
            <button 
                className="upVoteButton"
                onClick={() => {
                    let tempComments = [...comments]
                    tempComments[index].upVoted = !tempComments[index].upVoted
                    tempComments[index].upVotes = tempComments[index].upVotes + 1
                    setComments(tempComments)
                }}
            >
                Up Vote
            </button>
        )

        if ( comment.upVoted ) {
            upVoteButton = 
            <button                     
                className="upVoteButton"
                onClick={() => {
                    let tempComments = [...comments]
                    tempComments[index].upVoted = !tempComments[index].upVoted
                    tempComments[index].upVotes = tempComments[index].upVotes - 1
                    setComments(tempComments)
                }}>
                Down Vote
            </button>
        }

        return (
            <ul key={index}>
                <div className="commentGroup">
                    <div className="upVoteCircle">{comment.upVotes}</div>
                    <div className="commentBody">{comment.commentBody}</div>
                    <div>{upVoteButton}</div>
                </div>
            </ul>
        )
    })

    return (
        <div>
            {addCommentSection}
            <div>
                {commentList}   
            </div>
        </div>
    )
}

export default Comments