import React, { useState } from "react"
import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function BookmarkButton({ bookmarkId, postId, token }) {
	/* 
	 * Job:
	 *	1. Renders state based on whether user bookmarked the post
	 *	2. Create / Delete bookmark
	 */

	const [stateBookmarkId, setStateBookmarkId] = useState(bookmarkId)
	/* 
	 * Lock button to prevent race condition when user multi-presses 
	 * the same button leading to duplicate create / delete requests
	 */
	const [isButtonLocked, setButtonLocked] = useState(false);

	const endpoint = "/api/bookmarks/"

	async function createBookmark() {
		if (isButtonLocked) return // Ignore duplicate requests
		setButtonLocked(true)
		const sendData = {
			post_id: postId,
		}
		const responseData = await postDataToServer(token, endpoint, sendData)
		console.log(responseData)
		setStateBookmarkId(responseData.id)
		console.log(stateBookmarkId)
		setButtonLocked(false)
	}

	async function deleteBookmark() {
		if (isButtonLocked) return // Ignore duplicate requests
		setButtonLocked(true)
		const responseData = await deleteDataFromServer(token, endpoint + stateBookmarkId)
		console.log(responseData)
		setStateBookmarkId(null)
		setButtonLocked(false)
	}

	return (
		(stateBookmarkId) ?
			<button
				aria-label="Unbookmark This Post"
				aria-checked="true"
				role="switch"
				onClick={deleteBookmark}
			>
				<i className="fas fa-bookmark"></i>
			</button>
			:
			<button
				aria-label="Bookmark This Post"
				aria-checked="false"
				role="switch"
				onClick={createBookmark}
			>
				<i className="far fa-bookmark"></i>
			</button>
	)
}
