import React from "react";
import { Image, Carousel, Collapse, ConfigProvider } from 'antd';
import Card from "./components/Card.jsx";
import AntCard from "./components/AntCard.jsx";
import "./App.css"

export default function App() {
	const carouselHTML =
		// ConfigProvider is so I can set dotHeight to 0 because I didn't want them
		// although this feels like it defeats some of the ease of use when I'm
		// finding convoluted workarounds to do things that could've been an option
		<ConfigProvider
			theme={{
				components: {
					Carousel: {
						dotHeight: 0,
					},
				},
			}}
		>
			<Carousel arrows >
				<Card name="Anita" image_url="https://picsum.photos/id/216/1920/1080" description="Random Image" />
				<Card name="Bob" image_url="https://picsum.photos/id/217/1920/1080" description="Random Image 2" />
				<Image
					width='25vw'
					alt="basic"
					src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
				/>
				<AntCard name="Anita" image_url="https://picsum.photos/id/216/250/250" description="Random Image" />
				<AntCard name="Bob" image_url="https://picsum.photos/id/217/250/250" description="Random Image 2" />
			</Carousel >
		</ConfigProvider>
	return <section id="cardContainer">
		<Collapse
			size="large"
			items={[{ key: '1', label: 'Image Carousel', children: carouselHTML }]}
			style={{ backgroundColor: 'white' }}
		/>
	</section >
}
