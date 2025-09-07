# Intelligent Systems - Feelnet
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/PSantanaGlez13/SI-FeelNet-Web/blob/main/README.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/PSantanaGlez13/SI-FeelNet-Web/blob/main/README.es.md)

## 2024-2025 ULL Course
## Created by:
- Pablo Santana González ([@PSantanaGlez13](https://github.com/PSantanaGlez13))
- Hugo Hernández Martín ([@hugohdezm03](https://github.com/hugohdezm03))
- José Ramón Morera Campos ([@jose-r-morera](https://github.com/jose-r-morera))
## Description
Feelnet is a web application that analyzes the sentiments of social media users (currently Reddit) based on a phrase. You can choose a model from several options to classify the comments on these social networks.

This is the final project for the Intelligent Systems course, in the fourth year of the Computer Engineering Degree at ULL, Computing specialization.

## Project Usage
1. Run `npm install` to install the dependencies.
2. Run `bash env-setup.sh` to install the virtual environment with its dependencies. To deactivate it, use `deactivate`. Once installed, you can activate it using `source .env/bin/activate`.
3. Create a `log` directory in the root of the repository. The results of classifying Reddit comments will be displayed in this directory.
4. Run `npm run deploy` to compile the `.ts` files and run the server locally. You can see the description of the scripts in [package.json](package.json).

If any Python dependency is not installed, it must be installed.

The project uses the Reddit API to access posts and comments. To use it on your own, you must create an application on the Reddit website.

The models are not included in the repository due to GitHub's file size limit.

### Models
Include all the files from the following link in `src/models` (you will need to create the directory):
[Google Drive Folder with files for models](https://drive.google.com/drive/folders/15Itf7iR5G4QY2l2gt71rx6vnedesO8Aq?usp=sharing)

### Reddit API
You need to get a `client ID` and a `client secret` from the Reddit API by registering an application. Create the file `src/.secrets` and include them in the following format:

## Repository Structure
- `src`. Server source code and page `HTML`.
- `src/web`. Images and `CSS` and `TS` files for the page.
- `env-setup.sh`. Script to install dependencies and the server's execution environment.
- `notebooks`. Jupyter notebooks of the developed models.
- `datasets`. Dataset used.
