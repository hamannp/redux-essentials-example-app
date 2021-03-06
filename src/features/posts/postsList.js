import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectAllPosts, fetchPosts } from './postsSlice'
import { PostExcerpt } from './PostExcerpt'

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)

  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading'){
    content = <div className="loader">loading...</div>
  } else if (postStatus === 'succeeded'){
    const orderedPosts = posts
                           .slice()
                           .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map(post => {
      return <PostExcerpt key={post.id} post={post} />
    })
  } else if (postStatus === 'failed'){
    content = <div>{error}</div>
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  )
}
