import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Image } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Map({ setMode, items }) {
	const center = [14.99, 14.99];
	console.log(items)

	return (
		<div style={{ height: "70vh", width: "100%" }}>
			<button onClick={() => { setMode("list") }}><FontAwesomeIcon size="2x" icon={faArrowLeft} /></button>
			<MapContainer
				center={center}
				zoom={7}
				style={{ height: "100%", width: "100%" }}
			>
				<TileLayer
					attribution='&copy; OpenStreetMap contributors'
					url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				{items.map((item) => {
					const position = [item.latitude, item.longitude];

					return (
						<Marker key={item.id} position={position}>
							<Popup>
								<div>
									<strong>{item.name}</strong>
									<Image
										alt="Sample Alt Text"
										src={item.image_url}
									/>
									<br />
									<p className="mt-2 text-xs text-slate-500">{item.company_name} • ${item.min_salary} • {item.job_type}</p>
									<br />
								</div>
							</Popup>
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
}
