import React, { useState } from "react"
import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function LikeButton({ likeId, postId, likesNum, setLikesNum, token }) {
	/* 
	 * Job:
	 *	1. Renders state based on whether user liked the post
	 *	2. Create / Delete like
	 *	3. Update post's like count
	 */

	const [stateLikeId, setStateLikeId] = useState(likeId)
	/* 
	 * Lock button to prevent race condition when user multi-presses 
	 * the same button leading to duplicate create / delete requests
	 */
	const [isButtonLocked, setButtonLocked] = useState(false);

	const endpoint = "/api/likes/"

	async function createLike() {
		if (isButtonLocked) return // Ignore duplicate requests
		setButtonLocked(true)
		const sendData = {
			post_id: postId,
		}
		const responseData = await postDataToServer(token, endpoint, sendData)
		console.log(responseData)
		setStateLikeId(responseData.id)
		console.log(stateLikeId)
		setLikesNum(likesNum => likesNum + 1)
		setButtonLocked(false)
	}

	async function deleteLike() {
		if (isButtonLocked) return // Ignore duplicate requests
		setButtonLocked(true)
		const responseData = await deleteDataFromServer(token, endpoint + stateLikeId)
		console.log(responseData)
		setStateLikeId(null)
		setLikesNum(likesNum => likesNum - 1)
		setButtonLocked(false)
	}

	return (
		(stateLikeId) ?
			<button
				aria-label="Unlike This Post"
				aria-checked="true"
				role="switch"
				onClick={deleteLike}
			>
				<i className="fas fa-heart text-red-600"></i>
			</button>
			:
			<button
				aria-label="Like This Post"
				aria-checked="false"
				role="switch"
				onClick={createLike}
			>
				<i className="far fa-heart"></i>
			</button>
	)
}
