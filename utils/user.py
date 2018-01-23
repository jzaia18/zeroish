import sqlite3
f = 'data/database.db'

def add_score(user, score):
    db = sqlite3.connect(f)
    scores = get_scores(user)
    highscore = get_highscore(user)
    average = get_average(user)
    numplayed = get_numplayed(user)

    #update latest 5 scores
    if len(scores) == 5:
        scores = scores[1:]
        scores.append(score)
    else:
        scores.append(score)
    updated_scores = repr(scores)
    db.cursor().execute('UPDATE users SET scores = \'%s\' WHERE username="%s"' % (updated_scores, user))

    #update highscore if neccessary
    if score > highscore:
        highscore = score
    db.cursor().execute('UPDATE users SET highscore = %d WHERE username="%s"' % (highscore, user))

    #update average score
    average = ( (average * numplayed) + score ) / (numplayed + 1)
    db.cursor().execute('UPDATE users SET average = %d WHERE username="%s"' % (average, user))

    #update number of games played
    db.cursor().execute('UPDATE users SET numplayed = %d WHERE username="%s"' % (numplayed + 1, user))

    db.commit()
    db.close()
    return True

def get_scores(user):
    db = sqlite3.connect(f)
    user_info = db.cursor().execute('SELECT scores FROM users WHERE username = "%s";' % ( user )).fetchall()
    db.close()
    return eval(user_info[0][0])

def get_highscore(user):
    db = sqlite3.connect(f)
    user_info = db.cursor().execute('SELECT highscore FROM users WHERE username = "%s";' % ( user )).fetchall()
    db.close()
    return user_info[0][0]

def get_average(user):
    db = sqlite3.connect(f)
    user_info = db.cursor().execute('SELECT average FROM users WHERE username = "%s";' % ( user )).fetchall()
    db.close()
    return user_info[0][0]

def get_numplayed(user):
    db = sqlite3.connect(f)
    user_info = db.cursor().execute('SELECT numplayed FROM users WHERE username = "%s";' % ( user )).fetchall()
    db.close()
    return user_info[0][0]

def get_avatar(user):
    db = sqlite3.connect(f)
    user_info = db.cursor().execute('SELECT avatar FROM users WHERE username = "%s";' % ( user )).fetchall()
    db.close()
    return user_info[0][0]

if __name__ == '__main__':
    f = '../data/database.db'
    print get_scores('user')
    print get_highscore('user')
    print get_average('user')
    print get_numplayed('user')
    add_score('user', 1000)
    add_score('user', 5000)
    add_score('user', 10000)
