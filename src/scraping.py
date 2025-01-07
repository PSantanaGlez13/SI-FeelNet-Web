# Importing dependencies
import praw
import pandas as pd

# This function assumes a .secrets with the id and client secret
def get_secrets():
  file = open("./.secrets").read()
  client_id, client_secret = file.split("\n")
  client_id = client_id.split("=")[1]
  client_secret = client_secret.split("=")[1]
  return client_id, client_secret

def run(word, limit = 5):
  user_agent = "Scrapper SI by /u/No_Spell_1800"
  (client_id, client_secret) = get_secrets()
  reddit = praw.Reddit(client_id = client_id,
                      client_secret = client_secret,
                      user_agent = user_agent)
  #headlines = set()
  comments = []
  for submission in reddit.subreddit("all").search(word, limit = limit):
    #headlines.add(submission.title)
    submission.comment_sort = "top"
    comments = comments + submission.comments.list()[0:limit]
  def get_body(comment_object):
    return comment_object.body
  
  return [body for body in map(get_body, comments)]
