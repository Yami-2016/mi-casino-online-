<!DOCTYPE html>
<html>
<body style="background:#0f172a; color:white; font-family:sans-serif; text-align:center;">
    <h1>🎰 MI CASINO SOLO 🎰</h1>
    <input id="user" placeholder="Tu Nombre">
    <button onclick="entrar()">Entrar</button>
    <div id="juego" style="display:none">
        <h2>Saldo: $<span id="balance">0</span></h2>
        <button onclick="apostar(10)" style="padding:20px; background:gold">APOSTAR $10</button>
        <p id="msg"></p>
    </div>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        function entrar() {
            socket.emit('registrar', document.getElementById('user').value);
        }
        socket.on('usuario_listo', u => {
            document.getElementById('juego').style.display = 'block';
            document.getElementById('balance').innerText = u.balance;
        });
        function apostar(m) {
            socket.emit('apostar', m);
        }
        socket.on('resultado', r => {
            document.getElementById('balance').innerText = r.nuevoSaldo;
            document.getElementById('msg').innerText = r.gano ? "¡GANASTE! Salió: " + r.resultado : "Perdiste. Salió: " + r.resultado;
        });
    </script>
</body>
</html>
