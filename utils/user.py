import sqlite3, random
f = 'data/database.db'

def get_avatar(user):
  db = sqlite3.connect(f)
  user_info = db.cursor().execute('SELECT avatar FROM users WHERE username = "%s";' % ( user )).fetchall()
  db.close()
  return user_info[0][0]

def set_avatar(user, data):
  db = sqlite3.connect(f)
  user_info = db.cursor().execute('UPDATE users SET avatar = "%s" WHERE username = "%s";' % ( data, user))
  db.commit()
  db.close()
  return True

def get_users():
  db = sqlite3.connect(f)
  user_info = db.cursor().execute('SELECT username FROM users;').fetchall()
  db.close()
  users = []
  for line in user_info:
    users.append(line[0])
  return users

def search(query):
  results = []
  users = get_users()
  for user in users:
    if query.lower() in user.lower():
      results.append(user)
  return results

if __name__ == '__main__':
  f = '../data/database.db'
  print get_users()
  print search("b")
