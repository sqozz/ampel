<html>
	<head>
		<title>Mitarbeiterlogin</title>
		<style>
			body {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				height: 100%;
			}

			body>div {
				width: 15em;
				height: 1.5em;
				font-size: 2em;
				font-weight: bold;
				border-bottom: 2px solid black;
				text-align: center;
			}

			body>div, body>form {
				margin-top: 10px;
			}

			form>* {
				font-size: 1.5em;
			}

		</style>
	</head>
	<body>
		<div>Login für Mitarbeiter:</div>
		<form method="post">
			<select name="employeeId">
				% for i in range(0, len(employees)):
				<option value="{{i}}">{{employees[i][0]}}</option>
				% end
			</select>
			<button type="submit">Einloggen</button>
		</form>
	</body>
</html>
