import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/> testing', () => {
  let component
  const handleLike = jest.fn()
  const handleDelete = jest.fn()

  const blog = {
    title: 'The Void',
    author: 'Faceless Void',
    url: 'https://github.com/Hamiriza',
    Likes: 10
  }


  beforeEach(() => {
    component = render(
      <Blog blog={blog} handleDelete={handleDelete} handleLike ={handleLike}/>
    )
  })

  test('By default the blog renders title and author', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveTextContent('The Void')
    expect(div).toHaveTextContent('Faceless Void')
    expect(div).not.toHaveTextContent('Likes')
  })

  test('Url and Likes number are shown when the view button is clicked', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveTextContent('Likes')
    expect(div).toHaveTextContent('https://github.com/Hamiriza')
  })

  test('The event handler is called twice when the like button is clicked twice', () => {
    const button1 = component.getByText('View')
    fireEvent.click(button1)

    const button2 = component.getByText('Like')
    fireEvent.click(button2)
    fireEvent.click(button2)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})

