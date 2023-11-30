import reducer, { addPost, deletePost } from './profileReducer'

describe(reducer, () => {
  it('should add new post', () => {
    const prevState = { posts: [
      { id: 1, message: 'hi', likesCount: 23 },
      { id: 2, message: 'a', likesCount: 23 },
      { id: 3, message: 'b', likesCount: 23 },
      { id: 4, message: 'c', likesCount: 23 },
    ]}
    expect(reducer(prevState, addPost('New post')).posts).toHaveLength(5)
  })

  it('should delete post by id', () => {
    const prevState = { posts: [
      { id: 1, message: 'hi', likesCount: 23 },
      { id: 2, message: 'a', likesCount: 23 },
      { id: 3, message: 'b', likesCount: 23 },
      { id: 4, message: 'c', likesCount: 23 },
    ]}
    expect(reducer(prevState, deletePost(1)).posts).toHaveLength(3)
  })
})
