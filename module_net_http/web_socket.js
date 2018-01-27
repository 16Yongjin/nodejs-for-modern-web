const net = require('net');
const crypto = require('crypto');

const guid = '258eafa5-e914-47da-95ca-c5ab0dc85b11';
net.createServer((socket) => {
  socket.on('data', (data) => {
    if (/websocket/.test(data.toString())) {
      const headers = data.toString().split('\n');
      let socketKey = '';
      headers.forEach(item => {
        const dict = item.split(':');
        if (dict.length == 2 && dict[0].toLocaleLowerCase().trim() == 'sec-websocket-key') {
          socketKey = dict[1].trim();
        }
      });
      const longKey = socketKey + guid;
      const shasum = crypto.createHash('sha1').update(longKey);
      const outputKey = shasum.digest('base64');

      socket.write(
        `HTTP/1.1 101 Switching Protocols
        Upgrade: WebSocket
        Connection: Upgrade
        Sec-WebSocket-Accept: ${outputKey}
        
        `);
        setInterval(() => {
          const output = 'Hello Web Socket Server .. !';
          const frameBuffer = new Buffer(2 + output.length);
          frameBuffer[0] = 0x81;
          frameBuffer[1] = output.length;
          for (let i = 0; i < output.length; i++) {
            frameBuffer[i + 2] = output.charCodeAt(i);
          }
          socket.write(frameBuffer);
        }, 1000);

    } else if (/HTTP/.test(data.toString())) {
      const output = `
      <script>
        var socket = new WebSocket("ws://localhost:3000/);
        socket.onopen = function (event) {
          console.log("Web Socket Open");
          setInterval(function () {
            socket.send("From Client");
          }, 1000);
        };n
        socket.onerror = function (error) {
          console.log(error);
        };
        socket.onmessage = function (event) {
          console.log('Web Socket Data: " + event.data);
        };
        socket.onclose = function (event) {
          console.log("Web Socket Close");
        };
      </script>`

      socket.write(
        `HTTP/1.1 200 OK
        Server:RintIanTta Node.js Custom Server
        Content-Type: text/html
        Content-Length: ${output.length}
        
        ${output}
      `);

      socket.end();
    } else {
      const opcode = data[0] & 0x0F;
      const payloadLength = data[1] % 128;
      const mask = [data[2], data[3], data[4], data[5]];

      // let output = '';
      // for (let i = 6; i < payloadLength + 6; i++) {
      //   output += String.fromCharCode(data[i] ^ mask[(i - 6) % 4]);
      // }
      let output = new Buffer(payloadLength);
      for (let i = 6; i < payloadLength + 6; i++) {
        output[i-6] = data[i] ^ mask[(i - 6) % 4];
      }

      console.log(output);
    }
  });
}).listen(3000, () => {
  console.log('TCP Server Running ast port 3000');
});
