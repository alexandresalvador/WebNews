module.exports = (app) => {

    const get = (req,res) => {
        const autores =  [
                {
                    "id": 1,
                    "nome": "Luis",
                    "email": "luis.123@gmail.com",
                    "gravatar": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gratispng.com%2Fpng-htlez1%2F&psig=AOvVaw3aHR-IMDsaBdXxs7069vTF&ust=1665599507910000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMCZ0bjo2PoCFQAAAAAdAAAAABAD",
                    "perfil": "redator",
                    "categoria": "literatura",
                },
                {
                    "id": 2,
                    "nome": "Ramón",
                    "email": "ramon.103@gmail.com",
                    "gravatar": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gratispng.com%2Fpng-htlez1%2F&psig=AOvVaw3aHR-IMDsaBdXxs7069vTF&ust=1665599507910000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMCZ0bjo2PoCFQAAAAAdAAAAABAD",
                    "perfil": "escritor",
                    "categoria": "ficção",
                },
                {
                    "id": 3,
                    "nome": "Carlos",
                    "email": "carlos.343@gmail.com",
                    "gravatar": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gratispng.com%2Fpng-htlez1%2F&psig=AOvVaw3aHR-IMDsaBdXxs7069vTF&ust=1665599507910000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMCZ0bjo2PoCFQAAAAAdAAAAABAD",
                    "perfil": "admin",
                    "categoria": "terror",
                }
            ];

        return res.json(autores);
    }

    // const save = (req,res) =>{

    //     const autor = { };

    //     return res.json(autor);
    // }

    return { get }
   // return { get, save, update, delete }
}