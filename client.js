   // Create WebSocket connection.
   const socket = new WebSocket('ws://192.168.3.122:3000');

   // Connection opened
   socket.addEventListener('open', function (event) {
    
    
    console.log('连接成功');
    console.log(event);
   });

   var text = document.getElementById('my');
   function handleClick() {
    socket.send(text.value);
    text.value = '';
    console.log('value=>>>', value)
   }

   var chatPanel = document.getElementById('chat');

   // Listen for messages
   socket.addEventListener('message', function (event) {
    chatPanel.innerHTML += `<br>${event.data}`;
    console.log('Message from server ', event);
   });
