# zeroish
## Cynthia Cheng, Ish Mahdi, Adeebur Rahman, Jake Zaia

### Overview:
Our website allows users to play tetris and compare their scores with their friends provided that they create an account.  

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

`$ python main.py`

Then, in a browser, go to the website at [http://localhost:5000/](http://localhost:5000/) to use the site.
