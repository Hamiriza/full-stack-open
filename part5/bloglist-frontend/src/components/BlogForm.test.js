import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent,prettyDOM } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm /> testing', () => {
  test('The form calls the event handler it received as props with the right details', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog}/>
    )

    const form = component.container.querySelector('form')

    const title = component.container.querySelector('input[name="title"]')
    console.log(prettyDOM(title))
    fireEvent.change(title, {
      target: { value: 'The Void' }
    })

    const author = component.container.querySelector('input[name="author"]')
    fireEvent.change(author, {
      target: { value: 'Faceless Void' }
    })

    const url = component.container.querySelector('input[name="url"]')
    fireEvent.change(url, {
      target: { value: 'https://github.com/Hamiriza' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('The Void')
    expect(createBlog.mock.calls[0][0].author).toBe('Faceless Void')
    expect(createBlog.mock.calls[0][0].url).toBe('https://github.com/Hamiriza')
  })
})