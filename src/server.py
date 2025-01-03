import http.server
import sys
from models_register import *

class RequestHandler(http.server.BaseHTTPRequestHandler):
  def __init__(self, request, client_address, server_class):
    self.server_class = server_class
    super().__init__(request, client_address, server_class)

  def do_GET(self):
    if self.path == "/":
      self.path = "/index.html"
    elif self.path.startswith("/model="):
      (file, response) = self.parse_model_request()
      self.send_response(response)
      self.end_headers()
      self.wfile.write(bytes(file, "utf-8"))
      return
    try:
      file = open(self.path[1:]).read()
      self.send_response(200)
    except:
      file = "File not found"
      self.send_response(404)
    self.end_headers()
    self.wfile.write(bytes(file, "utf-8"))

  def parse_model_request(self):
    try:
      #print(self.path)
      [model, word] = self.path.split("&&")
      selected_model = model.split("=")[1]
      #print(selected_model)
      selected_word = word.split("=")[1]
      #print(selected_word)
      results = evaluate_model(selected_model, selected_word)
      #results = "Worked!"
      return results, 200
    except ValueError:
      return sys.exception().args[0], 404

class ServerApp(http.server.HTTPServer):
  def __init__(self, address, request_handler):
    super().__init__(address, request_handler)


def start_server():
  server_address = ("127.0.0.1", 80)
  http_server = ServerApp(server_address, RequestHandler)
  print(f"Starting server on {server_address[0]}:{server_address[1]}")
  http_server.serve_forever()

start_server()