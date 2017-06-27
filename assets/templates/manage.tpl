<html>
	<head>
		<title>Ampelmanagement für Benutzer {{employeeData[0]}}</title>
		<style>
			body {
				display: flex;
				justify-content: center;
				align-items: stretch;
				height: 100%;
			}

			canvas.lights {
				background-color: gray;
			}

		</style>
	</head>
	<body>
		<script src="assets/js/ampel.js"></script>
		<script>maxLightWidth = 300; drawLight({{str(employeeData[2]).lower()}}, "{{employeeData[0]}}", "")</script>
		<div>Hello {{employeeData[0]}} (Raum {{employeeData[1]}}).</div>
		<form method="post" action="logout">
			<button type="submit">Abmelden</button>
		</form>
		<form method="post" action="setStatus">
			<button type="submit">Ampel ändern</button>
		</form>
	</body>
</html>
