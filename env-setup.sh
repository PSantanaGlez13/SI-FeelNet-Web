#!/usr/bin/env bash
python3 -m venv .env
source .env/bin/activate
python3 -m pip install datasets transformers[sentencepiece]
python3 -m pip install tensorflow
python3 -m pip install praw
python3 -m pip install pandas
python3 -m pip install tf-keras