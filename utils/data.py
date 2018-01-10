import sqlite3   # enable control of an sqlite database
import hashlib   # allows for passwords to be encrypted and decrypted
import ast       # for getting strings out of dicts and vice versa

f = "data/userinfo.db"

def openDB():
    db = sqlite3.connect(f) # open if f exists, otherwise create
    c = db.cursor()         # facilitate db ops
    return db, c

def closeDB(db):
    db.commit()
    db.close()

def createTable():
    db, c = openDB()
    command = "CREATE TABLE Users(username TEXT PRIMARY KEY, password TEXT, highscores TEXT)"
    c.execute(command)
    closeDB(db)

def getHighscores(username):
    # returns user's highscores formatted as a dictionary
    db, c = openDB()
    command = "SELECT highscores FROM Users WHERE username = '%s'" % (username)
    highscores = {}
    for i in c.execute(command):
        highscores = eval(i[0])
    closeDB(db)
    return highscores

def getHighscore(username, subject):
    scores = getHighscores(username)
    if subject in scores:
        return scores[subject]
    else:
        return 0

def addHighscore(username, subject, score): #user, subject, score
    db, c = openDB()
    highscores = getHighscores(username)
    highscores[subject] = score
    command = "UPDATE Users SET highscores = '%s' WHERE username = '%s'" % (repr(highscores).replace("'", "''"), username) #escaping quotes in dict representation
    c.execute(command)
    closeDB(db)

def authUser(username, password): #user, password
    db, c = openDB()
    command = "SELECT * FROM Users where username = '%s' AND password = '%s'" % (username, hashlib.md5(str(password)).hexdigest())
    user = ''
    for user in c.execute(command): # returns either 1 or 0 entries
        pass # sets user to the entry if it exists
    closeDB(db)
    if user: # checks if user is an empty string
        return True # 1 result
    return False    # no results

def addUser(username, password): #user, password
    db, c = openDB()
    command = "INSERT INTO Users VALUES('%s', '%s', '{}')" % (username, hashlib.md5(str(password)).hexdigest())
    c.execute(command)
    closeDB(db)

def exists(username):
    db, c = openDB()
    username = username.replace("'", "''")
    command = "SELECT username FROM Users WHERE username = '%s';" % (username)
    c.execute(command)
    result = c.fetchone()
    closeDB(db)
    return result != None
