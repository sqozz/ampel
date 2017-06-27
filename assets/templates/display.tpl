<html>
	<head>
		<title>Anzeige</title>
		<style>
			body {
				display: flex;
				justify-content: center;
				align-items: stretch;
				height: 100%;
			}

			div.room {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: center;
				flex-grow: 1;
				padding-top: 2%;
				margin-left: 1%;
				margin-right: 1%;
			}

			div.trafficLight {
				display: flex;
				width: 215px;
				flex-grow: 1;
				flex-wrap: wrap;
				justify-content: center;
				align-items: flex-start;
				align-content: flex-start;
				padding-left: 10px;
				padding-right: 10px;
			}

			div.room>.label {
				white-space: nowrap;
				height: 60px;
				padding-bottom: 20px;
				font-size: 4em;
				font-weight: "bold";
				text-align: center;
				flex-basis: 100%;
				border-bottom: 2px solid black
			}

			div.trafficLight>.label {
				overflow: hidden;
				white-space: nowrap;
				display: flex;
				justify-content: center;
				font-size: 4em;
				flex-basis: 100%;
				margin-bottom: 1%;
			}

			canvas.lights {
				background-color: gray;
				
			}

		</style>
	</head>
	<body>
		<script src="assets/js/ampel.js"></script>
		<script src="assets/js/mainDisplay.js"></script>
	</body>
</html>
