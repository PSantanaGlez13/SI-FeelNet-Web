# Sistemas Inteligentes - Feelnet
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/PSantanaGlez13/SI-FeelNet-Web/blob/main/README.md)
## Curso 2024-2025 ULL
## Creado por:
- Pablo Santana González ([@PSantanaGlez13](https://github.com/PSantanaGlez13))
- Hugo Hernández Martín ([@hugohdezm03](https://github.com/hugohdezm03))
- José Ramón Morera Campos ([@jose-r-morera](https://github.com/jose-r-morera))
## Descripción
Feelnet es una aplicación web que analiza los sentimientos de los usuarios de redes sociales (por el momento Reddit) a partir de una frase. Se puede escoger un modelo entre varias opciones para clasificar los comentarios en estas redes sociales.

Se trata del proyecto final de la asignatura de Sistemas Inteligentes, en cuarto año del Grado en Ingeniería Informática de la ULL, Itinerario de Computación.

## Uso del proyecto
1. Ejecuta `npm install` para instalar las dependencias.
2. Ejecuta `bash env-setup.sh` para instalar el entorno virtual con las dependencias. Para desactivarlo, usar `deactivate`. Una vez ya instalado se puede activar usando `source .env/bin/activate`.
3. Crear un directorio `log` en la raíz del repositorio. En este directorio se mostrarán los resultados de clasificar los comentarios de Reddit.
3. Ejecuta `npm run deploy` para compilar los ficheros `.ts` y ejecutar el servidor en local. Puedes ver la descripción de los script en [package.json](package.json).

Si alguna dependencia de Python no estuviera instalada se deberá instalar.

El proyecto usa la API de Reddit para acceder a las publicaciones y a los comentarios. Para utilizarlo por cuenta propia se debe crear una aplicación en la página de Reddit.

Los modelos no vienen incluidos en el repositorio debido al límite de tamaño de fichero de GitHub.

### Modelos
Incluir todos los ficheros del siguiente enlace en `src/models` (será necesario crear el directorio):
[Carpeta en Google Drive con los ficheros para models](https://drive.google.com/drive/folders/15Itf7iR5G4QY2l2gt71rx6vnedesO8Aq?usp=sharing)

### Reddit API
Hay que conseguir un `client ID` y un `client secret` de la API de Reddit, registrando una aplicación. Crear el fichero `src/.secrets` e incluir siguiendo el siguiente formato:
```
client_id=valor
client_secret=valor
```

## Estructura del repositorio
- `src`. Código fuente del servidor y `HTML` de la página.
- `src/web`. Imágenes y ficheros `CSS` y `TS` de la página.
- `env-setup.sh`. Script para instalar dependencias y el entorno de ejecución del servidor.
- `notebooks`. Cuadernos Jupyter de los modelos desarrollados.
- `datasets`. Dataset utilizado.
