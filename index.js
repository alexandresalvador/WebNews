const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

const DB = {
    artigos: [
        {
            id: 100,
            titulo: "Revolução Agrícola",
            categoria: "historia",
            desc: "As Revoluçôes Agrícolas foram as transformações que ocorreram na cultura agrícola que influenciaram na história da humanidade que migraram do sistema de caça[...]",
            data: "1/10/2022",
            hora: "",
            autor: "Ramón",
        },
        {
            id: 101,
            titulo: "Futuro da Política",
            categoria: "científica",
            desc: "A juventude brasileira está inconformada com o país em que vive. Afastada dos partidos e da política, pouco quer saber dos fundamentos da economia e do[...]",
            data: "2/3/2022",
            hora: "",
            autor: "Luis",
        },
        {
            id: 102,
            titulo: "Evasão Escolar",
            categoria: "científica",
            desc: "Cerca de 244 mil crianças e adolescentes entre 6 e 14 anos estavam fora da escola no segundo trimestre de 2021. Esse número representa[..]",
            data: "5/9/2022",
            hora: "",
            autor: "Carlos",
        },
    ],
    autores: [
        {
            id: 100,
            nome: "Luis",
            email: "luis.123@gmail.com",
            gravatar: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gratispng.com%2Fpng-htlez1%2F&psig=AOvVaw3aHR-IMDsaBdXxs7069vTF&ust=1665599507910000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMCZ0bjo2PoCFQAAAAAdAAAAABAD",
            perfil: "redator",
            categoria: "literatura",
        },
        {
            id: 101,
            nome: "Ramón",
            email: "ramon.103@gmail.com",
            gravatar: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gratispng.com%2Fpng-htlez1%2F&psig=AOvVaw3aHR-IMDsaBdXxs7069vTF&ust=1665599507910000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMCZ0bjo2PoCFQAAAAAdAAAAABAD",
            perfil: "escritor",
            categoria: "ficção",
        },
        {
            id: 102,
            nome: "Carlos",
            email: "carlos.343@gmail.com",
            gravatar: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gratispng.com%2Fpng-htlez1%2F&psig=AOvVaw3aHR-IMDsaBdXxs7069vTF&ust=1665599507910000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMCZ0bjo2PoCFQAAAAAdAAAAABAD",
            perfil: "admin",
            categoria: "terror",
        },
    ],
};


//Aqui é o home
app.get('/', function (req, res) {
    res.render('index');
});

//// criando uma rota que retorna todos os artigos
app.get('/artigos', function (req, res) {
    response.send(DB.artigos);
    res.render('artigos');
});

// criando uma rota que retorna todos os autores
app.get('/autores', function (req, res) {
    response.send(DB.autores);
    res.render('autores');
});

// app.get('/autores/id', function (req, res) {
//     res.render('autoresId');
// });

// criando uma rota que retorna um autor por id
app.get("/autores/:autorId", (req, res) => {
    const idAutor = req.params.autorId;
    if (isNaN(idAutor)) {
         res.statusCode = 400;
         res.send("O id informado não é um número.");
    } 
    else {
      const id = parseInt(idAutor);
      const autor = DB.autores.find((index) => index.id === id);
      if (autor !== undefined) {
             res.statusCode =  200;
             res.json(autor) ;
           } else {
             res.sendStatus(404);
         }
      }
   });


//Aqui é onde seria quando queremos clicar e comprar o livro escolhido
// app.get('/artigos/id', function (req, res) {
//     res.render('artigosId');
// });




app.listen(5000, (erro) => {
    if (erro) {
        console.log(erro, 'Erro');
    } else {
        console.log(' >>> WebNews está funcionando nesta porta: http://localhost:5000');
    }
});


//app.post('/realizar-pedido')  //-> salvar as informações no banco'

