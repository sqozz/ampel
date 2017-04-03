<html>
	<head>
		<title>Ampelmanagement für Benutzer {{employeeData[0]}}</title>
	</head>
	<body>
		<div>Hello {{employeeData}}</div>
		<form method="post" action="logout">
			<button type="submit">Logout</button>
		</form>
		<form method="post" action="setStatus">
			<button type="submit">Ampel ändern</button>
		</form>
	</body>
</html>
