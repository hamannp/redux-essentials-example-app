import React from 'react'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

export const PostExcerpt = ({ post }) => {

  const renderedPost =
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content.substring(0, 100)}</p>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />

        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
      </article>

  return renderedPost
}
