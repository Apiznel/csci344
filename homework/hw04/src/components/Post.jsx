import React, { useState } from "react"
import LikeButton from "./LikeButton"
import BookmarkButton from "./BookmarkButton"

export default function Post({ post, token }) {

	const [likesNum, setLikesNum] = useState(post.likes.length);

	// React syntax of homework 3 code
	function getComments(comments) {
		// if there are no comments, return an empty string
		if (comments.length === 0) return "";
		// if there is exactly one comment, render just that comment
		if (comments.length === 1)
			return (
				<p className="text-sm mb-3">
					<strong>{comments[0].user.username}</strong>
					{comments[0].text}
				</p>
			);
		// if there is more than one comment:
		//     render a "view all n comments" button
		//     render only the most recent comment underneath it
		return (
			<>
				<button className="text-blue-500 text-sm py-2">View all {comments.length} comments</button>
				<p className="text-sm mb-3">
					<strong>{comments[comments.length - 1].user.username}</strong> {comments[comments.length - 1].text}
				</p>
			</>
		);
	}

	// Components always return jsx
	return (
		<section className="bg-white border mb-10">
			<div className="p-4 flex justify-between">
				<h3 className="text-lg font-Comfortaa font-bold">{post.user.username}</h3>
				<button className="icon-button"><i className="fas fa-ellipsis-h"></i></button>
			</div>
			<img src={post.image_url} alt={post.alt_text} width="300" height="300"
				className="w-full bg-cover" />
			<div className="p-4">
				<div className="flex justify-between text-2xl mb-3">
					<div className="flex gap-2">
						{<LikeButton likeId={post.current_user_like_id} postId={post.id} likesNum={likesNum} setLikesNum={setLikesNum} token={token} />}
						<button><i className="far fa-comment"></i></button>
						<button><i className="far fa-paper-plane"></i></button>
					</div>
					<div>
						{<BookmarkButton bookmarkId={post.current_user_bookmark_id} postId={post.id} token={token} />}
					</div>
				</div>
				<p className="font-bold mb-3">{likesNum} likes</p>
				<div className="text-sm mb-3">
					<p>
						<strong>{post.user.username}</strong> {post.caption}
					</p>
				</div>
				{getComments(post.comments)}
				<p className="uppercase text-gray-500 text-xs">{post.display_time}</p>
			</div>
			<div className="flex justify-between items-center p-3">
				<div className="flex items-center gap-3 min-w-[80%]">
					<i className="far fa-smile text-lg"></i>
					<input type="text" className="min-w-[80%] focus:outline-none" placeholder="Add a comment..." />
				</div>
				<button className="text-blue-500 py-2">Post</button>
			</div>
		</section>
	)
}
