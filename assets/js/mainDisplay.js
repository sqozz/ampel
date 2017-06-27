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

function clearCanvas() {
	canvas = document.getElementsByClassName("lights")[0];
	cxt = canvas.getContext("2d");
	cxt.clearRect(0, 0, canvas.width, canvas.height);
}
