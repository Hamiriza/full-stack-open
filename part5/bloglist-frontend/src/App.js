import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notifications from './components/Notifications'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  // const [url, setUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogappUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
    } catch (exception) {
      console.log('password or username doesn\'t match')
      setErrorMessage('wrong username or password')
      setTimeout(() => setErrorMessage(''), 5000)
    }

    console.log('logging in with ', username, password)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMessage(
        `The new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
      setTimeout(() => setSuccessMessage(''), 5000)
    } catch (exception) {
      console.log('error during insertion of new blog')
    }
  }

  const handleLike = async (event, id) => {
    const blogToUpdate = blogs.find((blog) => blog.id === id)
    let updatedBlog
    if (!blogToUpdate) {
      console.log('blog is missing')
    } else {
      updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
        user: blogToUpdate.user.id,
      }
    }

    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
    } catch (exception) {
      console.log('error during updating')
    }
  }

  const handleDelete = async (event, id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id)
    const deleteConfirm = window.confirm(
      `Delete ${blogToDelete.title} by ${blogToDelete.author}`
    )
    if (!deleteConfirm) return
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (exception) {
      console.log('error occurs during deletion')
    }
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notifications
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <Notifications
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <p>
        {user.name} logged in
        <button type="submit" onClick={handleLogout}>
          logout
        </button>
      </p>

      <Togglable buttonLabel="new note">
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs
        .sort((currBlog, nextBlog) => nextBlog.likes - currBlog.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  )

  // console.log(user);
  return <div>{user === null ? loginForm() : blogList()}</div>
}

export default App
