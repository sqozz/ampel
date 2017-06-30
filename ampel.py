#!/usr/bin/env python3
import bottle
import json
from bottle import route, post, run, template, static_file, request, response, redirect
import sqlite3

@route("/")
def index():
	return template("display")

@route("/login")
def login():
	global employees
	if request.get_cookie("employeeId") is None:
		return template("login", employees=employees)
		#return template("login", employees=sorted(employees.items(), key=lambda entry: entry[0]))
	else:
		redirect("/manage")

@post("/login")
def loginUser():
	global employees
	employeeId = request.forms.get("employeeId")
	response.set_cookie("employeeId", employeeId , max_age=60*60*24*365*10)
	redirect("/manage")

def loggedIn():
	try:
		employeeId = int(request.get_cookie("employeeId"))
	except ValueError:
		employeeId = None
	if employeeId is None or employeeId > len(employees) or employeeId < 0:
		response.set_cookie("employeeId", "") #clear cookie
		redirect("/login")
	else:
		return employeeId

@post("/logout")
def logout():
	employeeId = loggedIn()
	if employeeId >= 0:
		global employees
		loggedOut = list(employees[employeeId])
		loggedOut[2] = False #sets status to not available
		employees[employeeId] = loggedOut
	response.set_cookie("employeeId", "") #clear cookie
	redirect("/login")

@route("/manage")
def manage():
	global employees
	employeeId = loggedIn()
	if employeeId >= 0:
		return template("manage", employeeData=employees[employeeId])

@post("/setStatus")
def setStatus():
	employeeId = loggedIn()
	if employeeId >= 0:
		global employees
		newStatus = list(employees[employeeId])
		newStatus[2] = not newStatus[2] #toggle availability
		employees[employeeId] = newStatus

	redirect("/manage")

@post("/getStatus")
def getStatus():
	response.content_type = 'application/json'
	global employees
	employeeId = request.get_cookie("employeeId")
	resp = json.dumps(employees)
	return resp

@route("/assets/static/<filename>")
def staticContent(filename):
	return static_file(filename, root="./assets/static")

@route("/assets/js/<filename>")
def staticContent(filename):
	return static_file(filename, root="./assets/js")

@route("/assets/css/<filename>")
def staticContent(filename):
	return static_file(filename, root="./assets/css")

def initTool():
	global employees
	employees = []
	with open("bearbeiter.txt", "r") as f:
		for line in f.readlines():
			name, room = line.strip().split("|")
			status = False
			employeeId = name.strip().replace(" ", "_")
			employees.append((name, room, status))
	pass



bottle.TEMPLATE_PATH += ["./assets/templates/"]
initTool()
run(host='0.0.0.0', port=8080, debug=False)
