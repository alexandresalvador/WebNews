const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));


//Aqui é onde é organizado o cadastro
// app.get('/login', function(req, res) {
//     res.render('login');
// });

//Aqui é onde lista todos os itens da livraria (livros, revistas e gibis
app.get('/', function(req, res) {
    res.render('index');
});

//Aqui é onde lista todos os livros disponiveis, generos.
app.get('/autores', function(req, res) {
    res.render('autores');
});

//Aqui é onde seria quando queremos clicar e comprar o livro escolhido
app.get('/autores/id', function(req, res) {
    res.render('autoresId');
});

//Aqui é onde lista todos os livros disponiveis, generos.
app.get('/artigos', function(req, res) {
    res.render('artigos');
});

//Aqui é onde seria quando queremos clicar e comprar o livro escolhido
app.get('/artigos/id', function(req, res) {
    res.render('artigosId');
});

app.get('/pedidos', function(req, res) {
    res.send('Olá, listar o pedido/carrinho de compras');
});


app.listen(5000, (erro) => {
    if(erro) {
        console.log(erro, 'Erro');
    } else {
        console.log(' >>> WebNews está funcionando nesta porta: http://localhost:5000');
    }
});


//app.post('/realizar-pedido')  //-> salvar as informações no banco'

