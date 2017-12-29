const app = require('./config/server');
require('./app/routes/news')(app);

//Iniciar servidor
app.listen(app.get('port'), () => {
  console.log('Servidor iniciado en el puerto: ', app.get('port'));
})
