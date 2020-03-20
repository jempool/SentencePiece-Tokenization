# SentencePiece-Tokenization
SentencePiece text tokenizer using Flask and React 

## Flask

Crear un entorno virtual para instalar las dependencias de Python y posteriormente activar este entorno virtual

```sh
$ virtualenv venv
$ # en Linux 
$ source venv/bin/activate
$ # en Windows 
$ .\venv\Scripts\activate
```

Luego clonar el repositorio dentro del folder del entorno virtual:

```sh
$ cd venv
$ git clone https://github.com/jempool/SentencePiece-Tokenization.git
```


Luego instalamos las dependencias:

```sh
(venv)$ cd SentencePiece-Tokenization
(venv)$ cd server
(venv)$ pip install -r requirements.txt
```
Nota el `(venv)` frente al prompt. Esto indica que el entono virtual esta activado.

Una vez `pip` ha terminado de descargar las dependencias corrremos el servidor de Flask:
```sh
(venv)$ python app.py
```

Para correr el proyecto posteriormente solo se debe activar el entorno virtual como se indicó en el primer paso.

## React

En una terminal diferente a la de Flask:

```sh
$ cd SentencePiece-Tokenization
$ cd gui
$ npm install
$ npm start
```
