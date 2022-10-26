const express = require('express');
const consign = require('consign');
const {body, validationResult} = require('express-validator');
const bodyParser = require('body-parser');

//incializando o express
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json())

app.use(bodyParser.json())

const DB = {
    artigos: [
        {
            id: 1,
            titulo: "Revolução Agrícola",
            categoria: "historia",
            desc: "As Revoluçôes Agrícolas foram as transformações que ocorreram na cultura agrícola que influenciaram na história da humanidade que migraram do sistema de caça[...]",
            data: "1/10/2022",
            hora: "13:20",
            autor: "Ramón",
        },
        {
            id: 2,
            titulo: "Futuro da Política",
            categoria: "científica",
            desc: "A juventude brasileira está inconformada com o país em que vive. Afastada dos partidos e da política, pouco quer saber dos fundamentos da economia e do[...]",
            data: "2/3/2022",
            hora: "14:56",
            autor: "Luis",
        },
        {
            id: 3,
            titulo: "Evasão Escolar",
            categoria: "científica",
            desc: "Cerca de 244 mil crianças e adolescentes entre 6 e 14 anos estavam fora da escola no segundo trimestre de 2021. Esse número representa[..]",
            data: "5/9/2022",
            hora: "15:30",
            autor: "Carlos",
        },
    ],
    autores: [
        {
            id: 1,
            nome: "Luis",
            email: "luis.123@gmail.com",
            gravatar: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gratispng.com%2Fpng-htlez1%2F&psig=AOvVaw3aHR-IMDsaBdXxs7069vTF&ust=1665599507910000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMCZ0bjo2PoCFQAAAAAdAAAAABAD",
            perfil: "redator",
            categoria: "literatura",
        },
        {
            id: 2,
            nome: "Ramón",
            email: "ramon.103@gmail.com",
            gravatar: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gratispng.com%2Fpng-htlez1%2F&psig=AOvVaw3aHR-IMDsaBdXxs7069vTF&ust=1665599507910000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMCZ0bjo2PoCFQAAAAAdAAAAABAD",
            perfil: "escritor",
            categoria: "ficção",
        },
        {
            id: 3,
            nome: "Carlos",
            email: "carlos.343@gmail.com",
            gravatar: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gratispng.com%2Fpng-htlez1%2F&psig=AOvVaw3aHR-IMDsaBdXxs7069vTF&ust=1665599507910000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMCZ0bjo2PoCFQAAAAAdAAAAABAD",
            perfil: "admin",
            categoria: "terror",
        },
    ],
};


//Rota que retorna na Home
app.get('/', function (req, res) {
    res.render('index');
});


// ----------- READ

//// Criando uma rota que retorna todos os artigos por meio do método GET.
app.get('/artigos', function (req, res) {
     res.json(DB.artigos);
    //res.render('artigos');
});
// Criando uma rota que retorna todos os autores por meio do método GET.
app.get('/autores', function (req, res) {
     res.json(DB.autores);
    //res.render('autores');
});


// criando uma rota que retorna um artigo por id por meio do método GET.
app.get("/artigos/:artigoId", (req, res) => {
    const idArtigo = req.params.artigoId;
    if (isNaN(idArtigo)) {
         res.statusCode = 400;
         res.send("O id informado não é um número.");
    } 
    else {
      const id = parseInt(idArtigo);
      const artigo = DB.artigos.find((index) => index.id === id);
            if (artigo !== undefined) {
                res.statusCode =  200;
                res.json(artigo) ;
                 } else {
                    res.sendStatus(404);
                 }
         }
   });

// criando uma rota que retorna um autor por id por meio do método GET.
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

// ---------CREATE

// criando um novo artigo com o método de requisição POST
app.post("/artigos", [
  // validando os dados dos campos dos artigos.

      body('titulo').notEmpty().withMessage("O campo título é obrigatório"),
      body('titulo').isLength({ min: 3 }).withMessage("Campo precisa ter pelo menos 3 caracteres"),
      body('titulo').isLength({ max: 25 }).withMessage("Campo precisa ter pelo até 25 caracteres"),
      
      body('categoria').notEmpty().withMessage("O campo categoria é obrigatório"),
      body('categoria').isLength({ min: 3 }).withMessage("Campo precisa ter pelo menos 3 caracteres"),
      body('categoria').isLength({ max: 25 }).withMessage("Campo precisa ter pelo até 25 caracteres"),

      body('autor').notEmpty().withMessage("O campo autor é obrigatório"),
      body('autor').isLength({ min: 3 }).withMessage("Campo precisa ter pelo menos 3 caracteres"),
      body('autor').isLength({ max: 25 }).withMessage("Campo precisa ter pelo até 25 caracteres"),
]
  ,(req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
        const {
            titulo,
            categoria,
            desc,
            data,
            hora,
            autor, }
            = req.body;
    DB.artigos.push({
      id: Math.floor(Math.random() * 10 + 1),
            titulo,
            categoria,
            desc,
            data,
            hora,
            autor,
    });
  res.send({ message: "Este novo artigo foi adicionado com sucesso!" });
});

// criando um novo autor com o método de requisição POST
app.post("/autores", [
  // validando os dados dos campos dos autores.

      body('nome').notEmpty().withMessage("O campo nome é obrigatório"),
      body('nome').isLength({ min: 3 }).withMessage("Campo precisa ter pelo menos 3 caracteres"),
      body('nome').isLength({ max: 25 }).withMessage("Campo precisa ter pelo até 25 caracteres"),
      
      body('email').isEmail().withMessage("O campo email é obrigatório"),
      body('email').isLength({ min: 3 }).withMessage("Campo precisa ter pelo menos 3 caracteres"),
      body('email').isLength({ max: 25 }).withMessage("Campo precisa ter pelo até 25 caracteres"),

      body('perfil').notEmpty().withMessage("O campo perfil é obrigatório"),
      body('perfil').isLength({ min: 3 }).withMessage("Campo precisa ter pelo menos 3 caracteres"),
      body('perfil').isLength({ max: 25 }).withMessage("Campo precisa ter pelo até 25 caracteres"),

      body('categoria').notEmpty().withMessage("O campo categoria é obrigatório"),
      body('categoria').isLength({ min: 3 }).withMessage("Campo precisa ter pelo menos 3 caracteres"),
      body('categoria').isLength({ max: 25 }).withMessage("Campo precisa ter pelo até 25 caracteres"),
]
  ,(req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
        const {
            nome,
            email,
            gravatar,
            perfil,
            categoria, }
            = req.body;
    DB.autores.push({
      id: Math.floor(Math.random() * 10 + 1),
            nome,
            email,
            gravatar,
            perfil,
            categoria,
    });
  res.send({ message: "Este novo autor foi adicionado com sucesso!" });
});


// ----------UPDATE

// atualizando um artigo ja existente pelo id, com auxilio do método PUT.
app.put("/artigos/:artigoId", (req, res) => {
    const idArtigo = req.params.artigoId;
    if (isNaN(idArtigo)) {
      res.statusCode = 400;
      res.send("O id informado não é um número.");
    } else {
      const id = parseInt(idArtigo);
      const artigo = DB.artigos.findIndex((index) => index.id === id);
      if (artigo === -1) {
        res.sendStatus(404);
      } else {
        const {
            titulo,
            categoria,
            desc,
            data,
            hora,
            autor, }
            = req.body;
        DB.artigos.splice(artigo, 1, {
            id,
            titulo,
            categoria,
            desc,
            data,
            hora,
            autor, 
        });
        res.statusCode = 200;
        res.json({ message: "Este artigo foi atualizado com sucesso!" });
      }
    }
});

// atualizando um autor ja existente pelo id, com auxilio do método PUT.
app.put("/autores/:autorId", (req, res) => {
    const idAutor = req.params.autorId;
    if (isNaN(idAutor)) {
      res.statusCode = 400;
      res.send("O id informado não é um número.");
    } else {
      const id = parseInt(idAutor);
      const autor = DB.autores.findIndex((index) => index.id === id);
      if (autor === -1) {
        res.sendStatus(404);
      } else {
        const {
            nome,
            email,
            gravatar,
            perfil,
            categoria, }
            = req.body;
        DB.autores.splice(autor, 1, {
            id,
            nome,
            email,
            gravatar,
            perfil,
            categoria,
        });
        res.statusCode = 200;
        res.json({ message: "Este autor foi atualizado com sucesso!" });
      }
    }
});


// -----------DELETE

// deletando um artigo do servidor com o método DELETE.
app.delete("/artigos/:artigoId", (req, res) => {
    const idArtigo = req.params.artigoId;
    if (isNaN(idArtigo)) {
      res.statusCode = 400;
      res.send("O id informado não é um número.");
    } else {
      const id = parseInt(idArtigo);
      const artigo = DB.artigos.findIndex((index) => index.id === id);
      if (artigo === -1) {
        res.sendStatus(404);
      } else {
        DB.artigos.splice(artigo, 1);
        res.statusCode = 200;
        res.json({ message: "Este artigo foi removido com sucesso!" });
      }
    }
});

// deletando um autor do servidor com o método DELETE.
app.delete("/autores/:autorId", (req, res) => {
    const idAutor = req.params.autorId;
    if (isNaN(idAutor)) {
      res.statusCode = 400;
      res.send("O id informado não é um número.");
    } else {
      const id = parseInt(idAutor);
      const autor = DB.autores.findIndex((index) => index.id === id);
      if (autor === -1) {
        res.sendStatus(404);
      } else {
        DB.autores.splice(autor, 1);
        res.statusCode = 200;
        res.json({ message: "Este autor foi removido com sucesso!" });
      }
    }
});



// Batendo na porta 5000 PARA INICIALIZAR O APP!
app.listen(5000, (erro) => {
    if (erro) {
        console.log(erro, 'Erro');
    } else {
        console.log(' >>> O WebNews está funcionando nesta porta: http://localhost:5000');
    }
});



