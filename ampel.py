#!/usr/bin/env python3
import bottle
import json
from bottle import route, post, run, template, static_file, request, response, redirect
import sqlite3
import pdb

@route("/")
def index():
	return template("display")

@route("/login")
def login():
	global employees
	if request.get_cookie("employeeId") is None:
		return template("login", employees=sorted(employees.items(), key=lambda entry: entry[0]))
	else:
		redirect("/manage")

@post("/login")
def loginUser():
	global employees
	employeeId = request.forms.get("employeeId")
	employee = employees[employeeId]
	response.set_cookie("employeeId", employeeId, max_age=60*60*24*365*10)
	redirect("/manage")

@post("/logout")
def logout():
	response.set_cookie("employeeId", "") #clear cookie
	redirect("/login")

@route("/manage")
def manage():
	global employees
	if request.get_cookie("employeeId") is None or request.get_cookie("employeeId") not in employees:
		response.set_cookie("employeeId", "") #clear cookie
		redirect("/login")
	else:
		return template("manage", employeeData=employees[request.get_cookie("employeeId")])

@post("/setStatus")
def setStatus():
	if request.get_cookie("employeeId") is None:
		redirect("/login")
	else:
		global employees
		employeeId = request.get_cookie("employeeId")
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
	employees = {}
	with open("bearbeiter.txt", "r") as f:
		for line in f.readlines():
			name, room = line.strip().split("|")
			status = False
			employeeId = name.strip().replace(" ", "_")
			employees[employeeId] = (name, room, status)
	pass



bottle.TEMPLATE_PATH += ["./assets/templates/"]
initTool()
run(host='0.0.0.0', port=8080, debug=False)
