import React from "react";
import "./Card.css";

export default function Card({ name, image_url, description }) {
	return (
		<section className="card">
			<h2>{name}</h2>
			{/* add remaining HTML tags + data  */}
			<img src={image_url} alt={description} />
			<p>{description}</p>
		</section>
	);
}
