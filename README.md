## Ampel - Version 0.2 aka "now it's almost pretty"
This lovely piece of code is designed to display traffic lights indicating the presence or absence of anything.

It is designed to run on any OS running python3 and a reasonable modern browser. Yes, even Windows is supported
but not yet tested (comming soon™).

The main porpuse is intendet for 2-3 lights indicating the availability of employees.

![dashboard](https://files.geekify.de/ampel/dashboard.png)


![management](https://files.geekify.de/ampel/management.png)


![login](https://files.geekify.de/ampel/login.png)

## Installation
1. `virtualenv -p python3 venv`
2. `source ./venv/bin/activate`
3. `pip3 install -r requirements.txt`
4. `python3 ampel.py`

## Technical stuff
Ampel is build with python3, flask, html5 with canvas, css3 and also ~~some~~ javascript (at least it does not depend on jquery…).

## Hack me
The code is quiet flat. Try to hack around with it to suit your needs.
All rendering is as generic as possible while fitting close to my needs.
But adding more lights is for example just a matter of adjusting the CSS and adding a new line to "bearbeiter.txt" - 
thats all, everything else is already done.

PRs are always welcome. Feature requests beeing noticed at least.
