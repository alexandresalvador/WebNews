module.exports = (app) => {

    const get = (req,res) => {
        const artigos =  [
                {
                    "id": 1,
                    "titulo": "Revolução Agrícola",
                    "categoria": "historia",
                    "desc": "As Revoluçôes Agrícolas foram as transformações que ocorreram na cultura agrícola que influenciaram na história da humanidade que migraram do sistema de caça[...]",
                    "data": "1/10/2022",
                    "hora": "13:20",
                    "autor": "Ramón",
                },
                {
                    "id": 2,
                    "titulo": "Futuro da Política",
                    "categoria": "científica",
                    "desc": "A juventude brasileira está inconformada com o país em que vive. Afastada dos partidos e da política, pouco quer saber dos fundamentos da economia e do[...]",
                    "data": "2/3/2022",
                    "hora": "14:56",
                    "autor": "Luis",
                },
                {
                    "id": 3,
                    "titulo": "Evasão Escolar",
                    "categoria": "científica",
                    "desc": "Cerca de 244 mil crianças e adolescentes entre 6 e 14 anos estavam fora da escola no segundo trimestre de 2021. Esse número representa[..]",
                    "data": "5/9/2022",
                    "hora": "15:30",
                    "autor": "Carlos",
                }
            ];

        return res.json(artigos);
    }

    // const save = (req,res) =>{

    //     const artigo = { };

    //     return res.json(artigo);
    // }

    return { get }
   // return { get, save, update, delete }
}