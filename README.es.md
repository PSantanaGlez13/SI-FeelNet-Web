# Sistemas Inteligentes - Feelnet
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/PSantanaGlez13/SI-FeelNet-Web/blob/main/README.md)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

## Curso 2024-2025 ULL
## Creado por:
- Pablo Santana González ([@PSantanaGlez13](https://github.com/PSantanaGlez13))
- Hugo Hernández Martín ([@hugohdezm03](https://github.com/hugohdezm03))
- José Ramón Morera Campos ([@jose-r-morera](https://github.com/jose-r-morera))
## Descripción
FeelNet es una aplicación web que analiza los sentimientos de los usuarios de redes sociales (por el momento Reddit) a partir de una frase. Se puede escoger un modelo entre varias opciones para clasificar los comentarios en estas redes sociales.

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
```text
.
├── src/                  # Código fuente del servidor y páginas HTML   
│   └── web/              # Archivos estáticos para la página web (img y ts)
│   └── models/           # Modelos usados para inferencia. No se alojan en GitHub.
│   └── .secrets          # Claves de la API de Reddit
│
├── notebooks/            # Notebooks de Jupyter para el desarrollo de modelos
├── datasets/             # Conjuntos de datos usados para entrenamiento/evaluación
├── log/                  # Aquí se generarán las salidas
│
├── env-setup.sh          # Script para instalar dependencias y configurar el entorno
├── package.json          # Configuración y dependencias del proyecto Node.js
├── .gitignore            # Reglas de exclusión de Git
└── README.md             # Documentación del proyecto
```

## Licencia

Este proyecto está bajo la licencia **Creative Commons Atribución-NoComercial 4.0 Internacional (CC BY-NC 4.0)**.  
Puede ser usado libremente para fines personales, académicos o de investigación.  

No está permitido el uso comercial. Para uso comercial, por favor contacte a [your.email@example.com].

Texto completo de la licencia: [https://creativecommons.org/licenses/by-nc/4.0/legalcode](https://creativecommons.org/licenses/by-nc/4.0/legalcode)
