import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [showDetails, setShowDetails] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const toggleShowDetails = (event) => {
    setShowDetails((showDetails) => !showDetails)
  }

  const displayBlog = () => {
    if (!showDetails) {
      return (
        <div id="blog">
          <span>{blog.title} </span>
          <span>{blog.author} </span>
          <span>
            <button type="button" onClick={toggleShowDetails}>
              View
            </button>
          </span>
        </div>
      )
    }
    return (
      <div id="blog">
        <span>{blog.title} </span>
        <span>{blog.author} </span>
        <span>
          <button type="button" onClick={toggleShowDetails}>
            Hide
          </button>
        </span>
        <div>{blog.url}</div>
        <div>
          Likes {blog.likes}{' '}
          <button id="like-button" type="button" onClick={(event) => handleLike(event, blog.id)}>
            Like
          </button>
        </div>
        <div>
          <button
            type="button"
            id="remove-button"
            onClick={(event) => handleDelete(event, blog.id)}
          >
            remove
          </button>
        </div>
      </div>
    )
  }

  return <div style={blogStyle} className="togglableContent">{displayBlog()}</div>
}

export default Blog
