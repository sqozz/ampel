<html>
	<head>
		<title>Mitarbeiterlogin</title>
	</head>
	<body>
		<div>Login für Mitarbeiter</div>
		<form method="post">
			<select name="employeeId">
				% for employee in employees:
				<option value="{{employee[0]}}">{{employee[1][0]}}</option>
				% end
			</select>
			<button type="submit">Einloggen</button>
		</form>
	</body>
</html>
