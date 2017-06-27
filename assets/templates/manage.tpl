<html>
	<head>
		<title>Ampelmanagement für Benutzer {{employeeData[0]}}</title>
		<style>
			body {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				height: 100%;
			}

			body>div, body>form {
				margin-top: 10px;
			}

			canvas.lights {
				background-color: gray;
			}
			
			div#header {
				display: flex;
				align-items: center;
				font-size: 1.5em;
			}

			div#header>form>button {
				font-size: 1em;
			}

			div#header>form {
				border: 1px dashed gray;
				margin: 0px;
				margin-left: 10px;
			}

			#statusButton>button {
				font-size: 2.5em;
				border: 1px solid gray;
			}

		</style>
	</head>
	<body>
		<script src="assets/js/ampel.js"></script>
		<div id="header">
			<div>{{employeeData[0]}} (Raum {{employeeData[1]}})</div>
			<form method="post" action="logout">
				<button type="submit">Abmelden</button>
			</form>
		</div>
		<script>maxLightWidth = 300; drawLight({{str(employeeData[2]).lower()}}, "{{employeeData[0].replace(" ", "_")}}", "")</script>
		<form method="post" action="setStatus" id="statusButton">
			<button type="submit">Ampel ändern</button>
		</form>
	</body>
</html>
