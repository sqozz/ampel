window.onload = function() {
	setInterval(updateDashboard, 500)
}

oldEmployeeCount = -1
maxLightWidth = 100

function updateDashboard() {
	currentStatus = getEmployeeStatus()
	currentStatus.then(function(data) {
		jsonData = data
		employeeCount = 0
		for (var employee in jsonData) {
			employeeCount += 1
			if (!jsonData.hasOwnProperty(employee)) continue;

			employeeName = jsonData[employee][0]
			employeeRoom = jsonData[employee][1]
			available = jsonData[employee][2]
			light_id = employeeName.replace(" ", "_")
			light_label = employeeName
			room_id  = "room_" + employeeRoom.replace(" ", "_")
			room_label = employeeRoom
			drawLight(available, light_id, light_label, room_id, room_label)
		}
		if (employeeCount != oldEmployeeCount) {
			console.log("employee count changed, recalculate max size")
			oldEmployeeCount = employeeCount
			maxLightWidth = findSmallestBoundBox()
		}
	}).catch(function(err) {
		console.log(err)
	})
}

function getEmployeeStatus() {
	return fetch('getStatus', {
		method: 'post'
	}).then(function(response) {
		return response.json()
	}).catch(function(err) {
		console.log(err)
	});
}

function createOrGetRoomContainer(room_id, room_label) {
	roomContainer = document.querySelectorAll(".room." + room_id)
	if (roomContainer.length > 0) {
		return roomContainer[0]
	} else {
		roomContainer = createRoomContainer(room_id, room_label)
		document.body.appendChild(roomContainer)
		return roomContainer
	}
}

function createOrGetLight(light_id, light_label, room_id, room_label) {
	light = document.querySelectorAll(".trafficLight." + light_id)
	roomContainer = createOrGetRoomContainer(room_id, room_label)
	if (light.length > 0) {
		return light[0]
	} else {
		light = createLight(light_id, light_label)
		roomContainer.appendChild(light)
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
	canvas.classList.add("lights")
	trafficLight.appendChild(canvas)

	return trafficLight
}

function createRoomContainer(room_id, room_label) {
	roomContainer = document.createElement("div")
	roomContainer.classList.add("room")
	roomContainer.classList.add(room_id)
	label = document.createElement("div")
	label.classList.add("label")
	label.innerHTML = "Raum " + room_label
	roomContainer.appendChild(label)

	return roomContainer
}

function findSmallestBoundBox() {
	allLights = document.querySelectorAll(".lights")
	smallestBox = 1000
	if (allLights.length > 0) {
		for (i = 0; i < allLights.length; i++) {
			if (allLights[i].parentElement.getBoundingClientRect().width < smallestBox) { smallestBox = allLights[i].parentElement.getBoundingClientRect().width }
		}
	}
	
	return smallestBox;
}

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
	} else {
		green = "#003000"
		red = "#cc0000"
	}
	cxt.strikeStyle = "#999999";
	cxt.lineWidth = 3;

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

function clearCanvas() {
	canvas = document.getElementsByClassName("lights")[0];
	cxt = canvas.getContext("2d");
	cxt.clearRect(0, 0, canvas.width, canvas.height);
}
