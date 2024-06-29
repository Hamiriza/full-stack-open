export default function Anecdote({anecdote}){
    const {content, author, votes, info} = anecdote
    return(
        <div>
            <h1>{content} by {author}</h1>
            has {votes} votes<br/>
            for more info see {info}
        </div>
    )
}