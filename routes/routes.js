module.exports = (app) => {

    app.route("/artigos")
     .get(app.api.artigos.get)
    //  .post(app.api.artigos.save)
    //  .put(app.api.artigos.update)
    //  .delete(app.api.artigos.delete)
}