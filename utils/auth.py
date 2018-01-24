import sqlite3, hashlib, json, os, requests
f = 'data/database.db'
avatar = 'static/img/default.png'
#redirect url for facebook api stuff
redirect_url = "http://localhost:5000/facebook"
#the file with our api keys
KEY_FILE = "keys.json"
if __name__ == '__main__':
    KEY_FILE = "../keys.json"

if not os.path.isfile(KEY_FILE):
    print "Missing API KEY file."
    exit(1)

api_keys = json.load(open(KEY_FILE))
app_id = api_keys["app_id"]
app_secret = api_keys["app_secret"]

def get_hashed_password(user, passw):
    return hashlib.sha256(passw + user).hexdigest()

def register( user, passw ):
    if user_exists(user):
        return False

    hashed = get_hashed_password(user, passw)
    db = sqlite3.connect(f)
    with open(avatar) as data:
        encoded = data.read().encode('base64').replace('\n','')

    c = db.cursor()
    c.execute('INSERT INTO users VALUES ( "%s", "%s", "%s" );' % (user, hashed, encoded) )
    c.execute('INSERT INTO tetris VALUES ( "%s", "[]", 0.0, 0, 0);' % (user))
    c.execute('INSERT INTO snek VALUES ( "%s", "[]", 0.0, 0, 0);' % (user))
    db.commit()
    db.close()
    return True

def authenticate(user, passw):
    hashed = get_hashed_password(user, passw)
    db = sqlite3.connect(f)
    user_info = db.cursor().execute('SELECT username, hashed_pass FROM users WHERE username = "%s";' % ( user )).fetchall()
    db.close()
    if len(user_info) != 0 and hashed == user_info[0][1]:
        return True
    else:
        return False

def user_exists(user):
    db = sqlite3.connect(f)
    user_info = db.cursor().execute('SELECT username FROM users WHERE username = "%s";' % ( user )).fetchall()
    if len(user_info) > 0:
        return True
    return False

def get_facebook_link():
    return "https://www.facebook.com/v2.11/dialog/oauth?client_id=%s&redirect_uri=%s&scope=user_birthday,email,user_location" %( app_id, redirect_url )

def get_access_token(code):
    url = "https://graph.facebook.com/v2.11/oauth/access_token?client_id=%s&redirect_uri=%s&client_secret=%s&code=%s" %( app_id, redirect_url, app_secret, code )
    return requests.get(url).json()['access_token']

def get_facebook_data(token):
    return requests.get("https://graph.facebook.com/me?access_token=%s&fields=birthday,location,name,email" % ( token )).json()

def get_facebook_pic(token):
    return requests.get("https://graph.facebook.com/me/picture?access_token=%s&type=large" % ( token )).content.encode("base64")

if __name__ == '__main__':
    f = '../data/database.db'
    avatar = '../static/img/default.png'
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, hashed_pass TEXT, avatar BLOB);")
    c.execute("CREATE TABLE IF NOT EXISTS tetris (username TEXT PRIMARY KEY, scores TEXT, average REAL, highscore NUMERIC, numplayed NUMERIC);")
    c.execute("CREATE TABLE IF NOT EXISTS snek (username TEXT PRIMARY KEY, scores TEXT, average REAL, highscore NUMERIC, numplayed NUMERIC);")
    db.commit()
    db.close()
    users = ["Bob", "Adeeb", "Jake", "Cynthia", "Ish", "Gerald", "Mark", "Karina","Dasha", "Brandon","Farah", "Kristina", "Hannah", "Inbar", "Rashawn", "Marcus", "Stanley","Jerry", "Bobby", "George", "David", "Stefan", "Tomas", "Giorgio", "Alex"]
    for user in users:
        print 'Attempting to create account "%s":' % (user), register(user, user)
