const express = require('express');
const consign = require('consign');
const {body, validationResult} = require('express-validator');
const bodyParser = require('body-parser');
const fs = require('fs')
const authores = require("./autores.json")
const arthigos = require("./artigos.json")
const database = require("./config/database");
//incializando o express
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json())
app.use(bodyParser.json())

app.database = database;
consign()
 .then("./api")
 .then("./routes/routes.js")
 .into(app)

// FILTROS - ARTIGOS 

app.get('/artigos', (req, res, next) => {
  const filters = req.query;
  const filteredArts = arthigos.filter(user => {
  let isValid = true;
    for (key in filters) {
      isValid = isValid && user[key] == filters[key];
    }
    return isValid;
  });
  res.json(filteredArts);

});

// FILTROS - AUTORES

app.get('/autores', (req, res, next) => {
  const filters = req.query;
  const filteredAutors = authores.filter(user => {
  let isValid = true;
    for (key in filters) {
      isValid = isValid && user[key] == filters[key];
    }
    return isValid;
  });
  res.json(filteredAutors);

});


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
            gravatar: "https://www.google.com/url/luis",
            perfil: "redator",
            categoria: "literatura",
        },
        {
            id: 2,
            nome: "Ramón",
            email: "ramon.103@gmail.com",
            gravatar: "https://www.google.com/url/ramon",
            perfil: "escritor",
            categoria: "ficção",
        },
        {
            id: 3,
            nome: "Carlos",
            email: "carlos.343@gmail.com",
            gravatar: "https://www.google.com/url/carlos",
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

// Criando uma rota que retorna todos os artigos por meio do método GET.
app.get('/artigos', function (req, res) {
    res.json(arthigos);
    //res.render('artigos');

    fs.readFile("artigos.json", function(err, data) {
      if (err) throw err;
      const artigs = JSON.parse(data);
        
      console.log(artigs); 
  });
});
//Criando uma rota que retorna todos os autores por meio do método GET.
app.get('/autores', function (req, res) {
    res.json(authores);
    // res.render('autores');

    fs.readFile("autores.json", function(err, data) {
      if (err) throw err;
      const autors = JSON.parse(data);
        
      console.log(autors); 
  });
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
      const artigo = arthigos.find((index) => index.id === id);
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
      const autor = authores.find((index) => index.id === id);
            if (autor !== undefined) {
                  res.statusCode =  200;
                  res.json(autor) ;
                 } else {
                     res.sendStatus(404);
                  }
         }
   });


// criando uma rota que filtra categoria e nome de um autor passando a string por meio do método GET.
// app,get("/autores?$filter=substring(‘Valor’, Propriedade)", (req,res) +>{

// });

// ---------CREATE

// criando um novo artigo com o método de requisição POST
app.post("/artigos", [
  // validando os dados dos campos dos artigos.

      body('titulo').notEmpty().withMessage("O campo título é obrigatório"),
      body('titulo').isLength({ min: 3 }).withMessage("Campo precisa ter pelo menos 3 caracteres"),
      body('titulo').isLength({ max: 25 }).withMessage("Campo precisa ter até 25 caracteres"),
      
      body('categoria').notEmpty().withMessage("O campo categoria é obrigatório"),
      body('categoria').isLength({ min: 3 }).withMessage("Campo precisa ter pelo menos 3 caracteres"),
      body('categoria').isLength({ max: 25 }).withMessage("Campo precisa ter até 25 caracteres"),

      body('autor').notEmpty().withMessage("O campo autor é obrigatório"),
      body('autor').isLength({ min: 3 }).withMessage("Campo precisa ter pelo menos 3 caracteres"),
      body('autor').isLength({ max: 25 }).withMessage("Campo precisa ter até 25 caracteres"),
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
    arthigos.push({
      id: Math.floor(Math.random() * 100 + 1),
            titulo,
            categoria,
            desc,
            data,
            hora,
            autor,
    });
  res.send({ message: "Este novo artigo foi adicionado com sucesso!" });

  fs.writeFile("artigos.json", JSON.stringify(arthigos), err => {
    if (err) throw err; 
    console.log("Arquivo de Artigos concluido"); 
  });  

});

// criando um novo autor com o método de requisição POST
app.post("/autores", [
  // validando os dados dos campos dos autores.

      body('nome').notEmpty().withMessage("O campo nome é obrigatório"),
      body('nome').isLength({ min: 3 }).withMessage("Campo precisa ter pelo menos 3 caracteres"),
      body('nome').isLength({ max: 25 }).withMessage("Campo precisa ter até 25 caracteres"),
      
      body('email').isEmail().withMessage("O campo email é obrigatório"),
      body('email').isLength({ min: 3 }).withMessage("Campo precisa ter pelo menos 3 caracteres"),
      body('email').isLength({ max: 25 }).withMessage("Campo precisa ter até 25 caracteres"),

      body('perfil').notEmpty().withMessage("O campo perfil é obrigatório"),
      body('perfil').isLength({ min: 3 }).withMessage("Campo precisa ter pelo menos 3 caracteres"),
      body('perfil').isLength({ max: 25 }).withMessage("Campo precisa ter até 25 caracteres"),

      body('categoria').notEmpty().withMessage("O campo categoria é obrigatório"),
      body('categoria').isLength({ min: 3 }).withMessage("Campo precisa ter pelo menos 3 caracteres"),
      body('categoria').isLength({ max: 25 }).withMessage("Campo precisa ter até 25 caracteres"),
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
    // authores.push({
      authores.push({
      id: Math.floor(Math.random() * 100 + 1),
            nome,
            email,
            gravatar,
            perfil,
            categoria,
    });

  res.send({ message: "Este novo autor foi adicionado com sucesso!" });

 
  fs.writeFile("autores.json", JSON.stringify(authores), err => {
    if (err) throw err; 
    console.log("Arquivo de Autores concluido"); 
  });  
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
      const artigo = arthigos.findIndex((index) => index.id === id);
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
        arthigos.splice(artigo, 1, {
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

        fs.writeFile("artigos.json", JSON.stringify(arthigos), err => {
          if (err) throw err; 
          console.log("O seu Arquivo de Artigos foi atualizado!"); 
        });  
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
      const autor = authores.findIndex((index) => index.id === id);
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
        authores.splice(autor, 1, {
            id,
            nome,
            email,
            gravatar,
            perfil,
            categoria,
        });
        res.statusCode = 200;
        res.json({ message: `O autor ${ req.body.nome } foi atualizado com sucesso por put!` });

        fs.writeFile("autores.json", JSON.stringify(authores), err => {
          if (err) throw err; 
          console.log("O seu Arquivo de Autores foi atualizado"); 
        });  
      }
    }
});

// PATCH
// atualizando um autor ja existente pelo id, com auxilio do método Patch.
app.patch("/autores/:autorId", (req, res) => {
  const idAutor = req.params.autorId;

  // const nomeAutor = req.params.autorNome;
  // const emailAutor = req.params.autorEmail;
  // const gravAutor = req.params.autorGravatar;
  // const perfAutor = req.params.autorPerfil;
  // const catAutor = req.params.autorCategoria;

  if (isNaN(idAutor)) {
    res.statusCode = 400;
    res.send("O id informado não é um número.");
  } else {
    const id = parseInt(idAutor)

    // const nome = nomeAutor
    // const email = emailAutor
    // const gravatar = gravAutor
    // const perfil = perfAutor
    // const categoria = catAutor
    
    const autor = authores.findIndex((index) => index.id === id);
                  
                  // authores.findIndex((index) => index.nome === nome);
                  // authores.findIndex((index) => index.email === email);
                  // authores.findIndex((index) => index.gravatar === gravatar);
                  // authores.findIndex((index) => index.perfil === perfil);
                  // authores.findIndex((index) => index.categoria === categoria);

    if (autor === -1) {
      res.sendStatus(404);
    } else {
      const {
        nome,
        email,
        gravatar,
        perfil,
        categoria,
           }
          = req.body;
      authores.splice(autor, 1, {
          id,
          nome,
          email,
          gravatar,
          perfil,
          categoria,
      });
      res.statusCode = 200;
      res.json({ message: `O autor ${ req.body.nome } foi atualizado com sucesso por patch!` });

      fs.writeFile("autores.json", JSON.stringify(authores), err => {
        if (err) throw err; 
        console.log("O seu Arquivo de Autores foi atualizado"); 
      });  
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
      const artigo = arthigos.findIndex((index) => index.id === id);
      if (artigo === -1) {
        res.sendStatus(404);
      } else {
        arthigos.splice(artigo, 1);
        res.statusCode = 200;
        res.json({ message: "Este artigo foi removido com sucesso!" });

        fs.writeFile("artigos.json", JSON.stringify(arthigos), err => {
          if (err) throw err; 
          console.log("Um de seus artigos foi deletado com sucesso do arquivo."); 
        });  
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
      const autor = authores.findIndex((index) => index.id === id);
      if (autor === -1) {
        res.sendStatus(404);
      } else {
        authores.splice(autor, 1);
        res.statusCode = 200;
        res.json({ message: "Este autor foi removido com sucesso!" });

        fs.writeFile("autores.json", JSON.stringify(authores), err => {
          if (err) throw err; 
          console.log("Um de seus autores foi deletado com sucesso do arquivo."); 
        });  
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



