import React from "react";
import { Image, Card } from 'antd';

export default function AntCard({ name, image_url, description }) {
	const { Meta } = Card;
	return (
		<Card
			hoverable
			style={{ width: 240 }}
			cover={
				<Image
					alt={description}
					src={image_url}
				/>
			}
		>
			<Meta title={name} description={description} />
		</Card>
	);
}
