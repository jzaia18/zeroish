# zeroish
## Cynthia Cheng, Ishtiaque Mahdi, Adeebur Rahman, Jake Zaia

### Overview:
Zeroish is a website where users can play rounds of Tetris and Snake and compare their highest (and average) scores with their friends.

Users can create a zeroish account, or they can log in using their own Facebook accounts.

### How it works

We utilized Python, HTML/CSS, Jinja,and JavaScript. We used the Python and Flask for server handling and keeping track of the users. We also used the Python for the Facebook API. JavaScript was utilized for both the Tetris and Snek game. The HTML/CSS/Jinja was utilized to make the front-end user friendly and appealing.

#### Tetris & Snake
These games are written entirely in JavaScript. The pixel grid is an HTML table and is updated using JavaScript. Scores are then sent to the server using AJAX from JQuery.

The Tetris game has many features such as the ability to see your next piece, quick drop down, and levels that speed up the falling pieces. The UI is very friendly allowing the user to use the WASD and arrow keys. To play Tetris, simply follow the instructions in "How to start the website" and click the Tetris option in the navigation bar.

The Snek game is a twist on the classic Snake Game. Like the original snake game, you slither around looking for red apples, avoiding the walls, and your ever growing body. However, we added a speed up effect every 200 points as well as some Tetris shaped obstacles to give the player a challenge.  

#### Profiles & Scores
User profiles and high scores are stored by zeroish in our own personal database. Users can easily use this to access their own and each other's scores.

### Instructions to Run Website:

#### How to obtain source code
To get started, you first need to clone our repository.
To clone with https:
`$ git clone https://github.com/arahman5/zeroish.git`
To clone with ssh:
`$ git clone git@github.com:arahman5/zeroish.git`

### Installing Dependencies
There are a couple of python dependencies to run our website:

* flask
* requests

We suggest using a python virtual environment to install them.
```bash
$ cd zeroish
$ virtualenv venv
$ . venv/bin/activate
$ pip install -r requirements.txt
```

### How to start the website

After installing the dependencies, run:

`$ python app.py`

Then, in a browser, go to the website at [http://localhost:5000/](http://localhost:5000/) to use the site.
