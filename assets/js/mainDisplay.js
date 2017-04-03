window.onload = function() {
	setInterval(updateDashboard, 500)
}

function updateDashboard() {
	//document.body.innerHTML = ""
	currentStatus = getEmployeeStatus()
	currentStatus.then(function(data) {
		jsonData = data
		for (var employee in jsonData) {
			if (!jsonData.hasOwnProperty(employee)) continue;

			name = jsonData[employee][0]
			room = jsonData[employee][1]
			available = jsonData[employee][2]
			//document.body.innerHTML += jsonData[employee][0] + " is available: " + jsonData[employee][2] + "<br />"
			drawLight(available, name.replace(" ", "_"), name)
		}
	}).catch(function(err) {
		console.log("err")
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

function createOrGetLight(id, label) {
	light = document.querySelectorAll(".trafficLight." + id)
	if (light.length > 0) {
		return light[0]
	} else {
		light = createLight(id, label)
		document.body.appendChild(light)
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

function drawLight(available, id, label) {
	container = createOrGetLight(id, label)
	//clearCanvas()
	//container = document.querySelectorAll(".trafficLight." + id)[0]
	canvas = container.children[1]
	//canvas = document.querySelectorAll(".trafficLight." + id + ">canvas")[0];
	canvas.width = container.getBoundingClientRect().width
	canvas.height = container.getBoundingClientRect().height - 80
	cxt = canvas.getContext("2d");
	cHeight = canvas.getBoundingClientRect().height
	cWidth =  canvas.getBoundingClientRect().width
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
