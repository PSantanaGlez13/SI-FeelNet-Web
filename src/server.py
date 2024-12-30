import http.server

class RequestHandler(http.server.BaseHTTPRequestHandler):
  def __init__(self, request, client_address, server_class):
    self.server_class = server_class
    super().__init__(request, client_address, server_class)

  def do_GET(self):
    if self.path == "/":
      self.path = "/index.html"
    try:
      file = open(self.path[1:]).read()
      self.send_response(200)
    except:
      file = "File not found"
      self.send_response(404)
    self.end_headers()
    self.wfile.write(bytes(file, "utf-8"))

class ServerApp(http.server.HTTPServer):
  def __init__(self, address, request_handler):
    super().__init__(address, request_handler)


def start_server():
  server_address = ("127.0.0.1", 80)
  http_server = ServerApp(server_address, RequestHandler)
  print(f"Starting server on {server_address[0]}:{server_address[1]}")
  http_server.serve_forever()

start_server()