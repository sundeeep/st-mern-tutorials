import React from 'react'
import PostComment from './PostComment'

const PostCommentsListing = () => {
  return (
    <div className='flex flex-col items-start gap-2'>
      <PostComment username="Sundeeep Dasari" commentText="Awesome! Content!"/>
      <PostComment username="Sathwik" commentText="Bokkalo! Content!"/>
      <PostComment username="Sanjay" commentText="nice! Content!"/>
    </div>
  )
}

export default PostCommentsListing