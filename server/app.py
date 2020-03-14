from flask import Flask, request
from flask import jsonify
import sentencepiece as spm

sp_user = spm.SentencePieceProcessor()
sp_user.load('m_user.model')

app = Flask(__name__)


@app.route('/', methods = ['POST'])
def update_text():
    data = request.data.decode("utf-8") 
    response = sp_user.encode_as_pieces(data)
    return jsonify(response) 


if __name__ == '__main__':
    app.run()