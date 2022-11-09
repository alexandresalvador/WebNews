module.exports = (app) => {

    app.route("/artigos")
     .get(app.api.artigos.get)
    //  .post(app.api.artigos.save)
    //  .put(app.api.artigos.update)
    //  .delete(app.api.artigos.delete)


    app.route("/autores")
    .get(app.api.autores.get)
    // .post(app.api.autores.save)
    //  .put(app.api.autores.update)
    //  .delete(app.api.autores.delete)
}