function drawLight(available, light_id, light_label, room_id, room_label) {
	container = createOrGetLight(light_id, light_label, room_id, room_label)
	canvas = container.children[1]
	canvas.width = container.getBoundingClientRect().width
	canvas.width = maxLightWidth
	canvas.height = container.getBoundingClientRect().height - 80
	canvas.height = maxLightWidth * 1.5
	cxt = canvas.getContext("2d");
	cHeight = canvas.getBoundingClientRect().height
	cHeight = canvas.height
	cWidth =  canvas.getBoundingClientRect().width
	cWidth = canvas.width
	centerX = cWidth / 2;
	centerRedY = cHeight / 4;
	centerGreenY = (cHeight / 4) * 3;
	halfHeight = cHeight / 2
	if (halfHeight < cWidth) {
		radius = halfHeight / 2
	} else {
		radius = cWidth / 2
	}

	radius -= 20 //margin

	if (available == true) {
		green = "#00f300" //turned on
		red = "#570000" //turned off
		red = "rgba(87, 00, 00, 0.2"
	} else {
		green = "#0030004D"
		green = "rgba(00, 48, 00, 0.2"
		red = "#cc0000"
	}
	cxt.strikeStyle = "#FFFFFF";

	cxt.lineWidth = 6;

	// Draw green light
	cxt.beginPath()
	cxt.arc(centerX, centerGreenY, radius, 0, 2 * Math.PI);
	cxt.fillStyle = green;
	cxt.fill();
	cxt.stroke();

	// Draw red light
	cxt.beginPath()
	cxt.arc(centerX, centerRedY, radius, 0, 2 * Math.PI);
	cxt.fillStyle = red;
	cxt.fill();
	cxt.stroke();
}

function createOrGetLight(light_id, light_label, room_id, room_label) {
	light = document.querySelectorAll(".trafficLight." + light_id)
	if (typeof room_id !== 'undefined') {
		roomContainer = createOrGetRoomContainer(room_id, room_label)
		lightsContainer = roomContainer.getElementsByClassName("lights")[0]
	}
	if (light.length > 0) {
		return light[0]
	} else {
		light = createLight(light_id, light_label)
		if (typeof room_id !== 'undefined') {
			lightsContainer.appendChild(light)
		} else {
			document.body.appendChild(light)
		}
		return light
	}
}

function createLight(id, labelText) {
	trafficLight = document.createElement("div")
	trafficLight.classList.add("trafficLight")
	trafficLight.classList.add(id)
	label = document.createElement("div")
	label.classList.add("label")
	label.innerHTML = labelText
	trafficLight.appendChild(label)
	canvas = document.createElement("canvas")
	canvas.classList.add("light")
	trafficLight.appendChild(canvas)

	return trafficLight
}

