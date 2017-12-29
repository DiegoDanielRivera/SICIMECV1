const dbConnection = require('../../config/dbConnection');

module.exports = (app) => {
  const connection = dbConnection();

    app.get('/', (req, res) => {
        res.render('../views/02catalogos/marca')
    });
 
//INICIO: RUTAS DE 00SESION
    app
        .get('/sesion', (req, res) => {
            res.send('<h1>Sesion</h2>');
        })
        
        .get('/sesion/login', (req, res) => {
            res.send('<h1>Sesion, login</h2>');
        })
        
        .get('/sesion/perfil', (req, res) => {
            res.send('<h1>Sesion/ perfil</h2>');
        })
//INICIO: RUTAS DE 00SESION
    
    
//INICIO: RUTAS DE 01PANEL DE CONTROL   
    app
        .get('/panel-de-control', (req, res) => {
            res.send('<h1>Panel de control</h2>');
        })
    
        .get('/panel-de-control/panel-de-control', (req, res) => {
            res.send('<h1>Panel de control, Panel de control</h2>');
        })
    
//INICIO: RUTAS DE 01PANEL DE CONTROL   
    
//INICIO: RUTAS de 02CATALOGOS
    app //CATALOGOS - RAIZ -
        .get('/catalogos', (req, res) => {
            res.send('<h1>Catalogos</h1>');
        })
    
    
    app //DEPARTAMENTO
        .get('/catalogos/departamento', (req, res) => {
            connection.query('SELECT * FROM tbDepartamento WHERE baja = true', (err, result) => { //RESTINGIDO A LAS BAJAS
                console.log(result);
                res.render('../views/02catalogos/departamento.ejs', {
                    datos: result
                })    
            })
        })
        
        .post('/catalogos/departamento', (req, res) => {
            console.log(req.body);
            const { descripcion, baja } = req.body;
            connection.query('INSERT INTO tbDepartamento SET ? ',
                {
                    descripcion: descripcion,
                    baja: true
                }
            , (err, result) => {
            res.redirect('/catalogos/departamento');
            })
        })
    
        .post('/catalogos/departamento/editar', (req, res) => {
            console.log(req.body);
            const { id, descripcion, baja } = req.body;
            console.log('M UPDATE tbDepartamento SET descripcion = "' + descripcion + '" WHERE idMarca = ' + id);
            connection.query('UPDATE tbDepartamento SET descripcion = "' + descripcion + '" WHERE idMarca = ' + id,
                {
                    id: id,
                    descripcion: descripcion,
                    baja
                }
            , (err, result) => {
            res.redirect('/catalogos/departamento');
            })
        })
    
        .post('/catalogos/departamento/eliminar', (req, res) => {
            console.log(req.body);
            const { id } = req.body;
            console.log(' e UPDATE tbDepartamento SET baja = TRUE WHERE idMarca = ' + id);
            connection.query('UPDATE tbDepartamento SET baja = false WHERE idMarca = ' + id,
                {
                    id: id
                }
            , (err, result) => {
            res.redirect('/catalogos/departamento');
            })
        })
       
    
    app //EQUIPO : TABLA FUERTE
        .get('/catalogos/equipo', (req, res) => {
            connection.query('SELECT * FROM tbEquipo WHERE baja = true', (err, result) => { //RESTINGIDO A LAS BAJAS
                console.log(result);
                res.render('../views/02catalogos/equipo.ejs', {
                    datos: result
                })    
            })
        })
    
        .post('/catalogos/equipo', (req, res) => {
            console.log(req.body);
            const { descripcion, baja } = req.body;
            connection.query('INSERT INTO tbEquipo SET ? ',
                {
                    descripcion: descripcion,
                    baja: true
                }
            , (err, result) => {
            res.redirect('/catalogos/equipo');
            })
        }) 
    
        .post('/catalogos/equipo/editar', (req, res) => {
            console.log(req.body);
            const { id, descripcion, baja } = req.body;
            console.log('M UPDATE tbEquipo SET descripcion = "' + descripcion + '" WHERE idMarca = ' + id);
            connection.query('UPDATE tbEquipo SET descripcion = "' + descripcion + '" WHERE idMarca = ' + id,
                {
                    id: id,
                    descripcion: descripcion,
                    baja
                }
            , (err, result) => {
            res.redirect('/catalogos/equipo');
            })
        })
    
        .post('/catalogos/equipo/eliminar', (req, res) => {
            console.log(req.body);
            const { id } = req.body;
            console.log(' e UPDATE tbEquipo SET baja = TRUE WHERE idMarca = ' + id);
            connection.query('UPDATE tbEquipo SET baja = false WHERE idMarca = ' + id,
                {
                    id: id
                }
            , (err, result) => {
            res.redirect('/catalogos/equipo');
            })
        })
    
    app //MARCA   
        .get('/catalogos/marca', (req, res) => {
            //connection.query('SELECT * FROM tbMarca2 WHERE baja = true', (err, result) => { //RESTINGIDO A LAS BAJAS
            connection.query('SELECT * FROM tbMarca2', (err, result) => { //RESTINGIDO A LAS BAJAS
                console.log(result);
                res.render('../views/02catalogos/marca.ejs', {
                    datos: result
                })    
            })    
        })
    
        .post('/catalogos/marca', (req, res) => {
            console.log(req.body);
            const { descripcion, baja } = req.body;
            connection.query('INSERT INTO tbMarca2 SET ? ',
                {
                    descripcion: descripcion,
                    baja: true
                }
            , (err, result) => {
            res.redirect('/catalogos/marca');
            })
        })
    
        .post('/catalogos/marca/editar', (req, res) => {
            console.log(req.body);
            const { id, descripcion, baja } = req.body;
            console.log('M UPDATE tbMarca2 SET descripcion = "' + descripcion + '" WHERE idMarca = ' + id);
            connection.query('UPDATE tbMarca2 SET descripcion = "' + descripcion + '" WHERE idMarca = ' + id,
                {
                    id: id,
                    descripcion: descripcion,
                    baja
                }
            , (err, result) => {
            res.redirect('/catalogos/marca');
            })
        })
    
        .post('/catalogos/marca/eliminar', (req, res) => {
            console.log(req.body);
            const { id } = req.body;
            console.log(' e UPDATE tbMarca2 SET baja = TRUE WHERE idMarca = ' + id);
            connection.query('UPDATE tbMarca2 SET baja = false WHERE idMarca = ' + id,
                {
                    id: id
                }
            , (err, result) => {
            res.redirect('/catalogos/marca');
            })
        })
    
    app //TIPOS DE EQUIPO
        .get('/catalogos/tipos-de-equipo', (req, res) => {
            connection.query('SELECT * FROM tbTipoEquipo WHERE baja = true', (err, result) => { //RESTINGIDO A LAS BAJAS
                console.log(result);
                res.render('../views/02catalogos/tipos-de-equipo.ejs', {
                    datos: result
                })    
            }) 
        })
    
        .post('/catalogos/tipos-de-equipo', (req, res) => {
            console.log(req.body);
            const { descripcion, baja } = req.body;
            connection.query('INSERT INTO tbTipoEquipo SET ? ',
                {
                    descripcion: descripcion,
                    baja: true
                }
            , (err, result) => {
            res.redirect('/catalogos/tipos-de-equipo');
            })
        })
    
        .post('/catalogos/tipos-de-equipo/editar', (req, res) => {
            console.log(req.body);
            const { id, descripcion, baja } = req.body;
            console.log('M UPDATE tbTipoEquipo SET descripcion = "' + descripcion + '" WHERE idMarca = ' + id);
            connection.query('UPDATE tbTipoEquipo SET descripcion = "' + descripcion + '" WHERE idMarca = ' + id,
                {
                    id: id,
                    descripcion: descripcion,
                    baja
                }
            , (err, result) => {
            res.redirect('/catalogos/tipos-de-equipo');
            })
        })
    
        .post('/catalogos/tipos-de-equipo/eliminar', (req, res) => {
            console.log(req.body);
            const { id } = req.body;
            console.log(' e UPDATE tbTipoEquipo SET baja = TRUE WHERE idMarca = ' + id);
            connection.query('UPDATE tbTipoEquipo SET baja = false WHERE idMarca = ' + id,
                {
                    id: id
                }
            , (err, result) => {
            res.redirect('/catalogos/tipos-de-equipo');
            })
        })
//FIN: RUTAS DE 02CATALOGOS

//INICIO: RUTAS DE 03MANTENIMIENTO
    app //MANTENIMIENTO - RAIZ -
        .get('/mantenimiento', (req, res) => {
            res.send('<h1>Mantenimiento: PAGINA NO VALIDA</h1>');
        })
    
    app //CAUSA DE MANTENIMIENTO
        .get('/mantenimiento/causa-de-mantenimiento', (req, res) => {
            connection.query('SELECT * FROM tbCausaMantenimiento WHERE baja = true', (err, result) => { //RESTINGIDO A LAS BAJAS
                console.log(result);
                res.render('../views/03mantenimiento/causa-de-mantenimiento.ejs', {
                    datos: result
                })    
            }) 
        })
    
        .post('/mantenimiento/causa-de-mantenimiento', (req, res) => {
            console.log(req.body);
            const { descripcion, baja } = req.body;
            connection.query('INSERT INTO tbCausaMantenimiento SET ? ',
                {
                    descripcion: descripcion,
                    baja: true
                }
            , (err, result) => {
            res.redirect('/mantenimiento/causa-de-mantenimiento');
            })
        })
    
        .post('/mantenimiento/causa-de-mantenimiento/editar', (req, res) => {
            console.log(req.body);
            const { id, descripcion, baja } = req.body;
            console.log('M UPDATE tbCausaMantenimiento SET descripcion = "' + descripcion + '" WHERE idMarca = ' + id);
            connection.query('UPDATE tbCausaMantenimiento SET descripcion = "' + descripcion + '" WHERE idMarca = ' + id,
                {
                    id: id,
                    descripcion: descripcion,
                    baja
                }
            , (err, result) => {
            res.redirect('/mantenimiento/causa-de-mantenimiento');
            })
        })
    
        .post('/catalogos/tipos-de-equipo/eliminar', (req, res) => {
            console.log(req.body);
            const { id } = req.body;
            console.log(' e UPDATE tbCausaMantenimiento SET baja = TRUE WHERE idMarca = ' + id);
            connection.query('UPDATE tbCausaMantenimiento SET baja = false WHERE idMarca = ' + id,
                {
                    id: id
                }
            , (err, result) => {
            res.redirect('/mantenimiento/causa-de-mantenimiento');
            })
        })
    
    app //CAUSA DE BAJA
        .get('/mantenimiento/causa-de-baja', (req, res) => {
            connection.query('SELECT * FROM tbCausaBaja WHERE baja = true', (err, result) => { //RESTINGIDO A LAS BAJAS
                console.log(result);
                res.render('../views/03mantenimiento/causas-de-baja.ejs', {
                    datos: result
                })    
            }) 
        })
    
        .post('/mantenimiento/causa-de-baja', (req, res) => {
            console.log(req.body);
            const { descripcion, baja } = req.body;
            connection.query('INSERT INTO tbCausaBaja SET ? ',
                {
                    descripcion: descripcion,
                    baja: true
                }
            , (err, result) => {
            res.redirect('/mantenimiento/causa-de-baja');
            })
        })
    
        .post('/mantenimiento/causa-de-baja/editar', (req, res) => {
            console.log(req.body);
            const { id, descripcion, baja } = req.body;
            console.log('M UPDATE tbCausaBaja SET descripcion = "' + descripcion + '" WHERE idMarca = ' + id);
            connection.query('UPDATE tbCausaBaja SET descripcion = "' + descripcion + '" WHERE idMarca = ' + id,
                {
                    id: id,
                    descripcion: descripcion,
                    baja
                }
            , (err, result) => {
            res.redirect('/mantenimiento/causa-de-baja');
            })
        })
    
        .post('/mantenimiento/causa-de-baja/eliminar', (req, res) => {
            console.log(req.body);
            const { id } = req.body;
            console.log(' e UPDATE tbCausaBaja SET baja = TRUE WHERE idMarca = ' + id);
            connection.query('UPDATE tbCausaBaja SET baja = false WHERE idMarca = ' + id,
                {
                    id: id
                }
            , (err, result) => {
            res.redirect('/mantenimiento/causa-de-baja');
            })
        })
    
    app //TIPOS DE MANTENIMIENTO
        .get('/mantenimiento/tipos-de-mantenimiento', (req, res) => {
            connection.query('SELECT * FROM tbTipoMantenimiento WHERE baja = true', (err, result) => { //RESTINGIDO A LAS BAJAS
                console.log(result);
                res.render('../views/03mantenimiento/tipos-de-mantenimiento.ejs', {
                    datos: result
                })    
            }) 
        })
    
        .post('/mantenimiento/tipos-de-mantenimiento', (req, res) => {
            console.log(req.body);
            const { descripcion, baja } = req.body;
            connection.query('INSERT INTO tbTipoMantenimiento SET ? ',
                {
                    descripcion: descripcion,
                    baja: true
                }
            , (err, result) => {
            res.redirect('/mantenimiento/tipos-de-mantenimiento');
            })
        })
    
        .post('/mantenimiento/tipos-de-mantenimiento/editar', (req, res) => {
            console.log(req.body);
            const { id, descripcion, baja } = req.body;
            console.log('M UPDATE tbTipoMantenimiento SET descripcion = "' + descripcion + '" WHERE idMarca = ' + id);
            connection.query('UPDATE tbTipoMantenimiento SET descripcion = "' + descripcion + '" WHERE idMarca = ' + id,
                {
                    id: id,
                    descripcion: descripcion,
                    baja
                }
            , (err, result) => {
            res.redirect('/mantenimiento/tipos-de-mantenimiento');
            })
        })
    
        .post('/mantenimiento/tipos-de-mantenimiento/eliminar', (req, res) => {
            console.log(req.body);
            const { id } = req.body;
            console.log(' e UPDATE tbTipoMantenimiento SET baja = TRUE WHERE idMarca = ' + id);
            connection.query('UPDATE tbTipoMantenimiento SET baja = false WHERE idMarca = ' + id,
                {
                    id: id
                }
            , (err, result) => {
            res.redirect('/mantenimiento/tipos-de-mantenimiento');
            })
        })
//FIN: RUTAS DE 03MANTENIMIENTO
    
//INICIO: RUTAS DE 04MOVIMIENTOS
    app
        .get('/movimientos', (req, res) => {
            res.send('<h1>Movimientos</h1>');
        })
    
        .get('/movimientos/bajas', (req, res) => {
            res.send('<h1>Movimientos, bajas</h1>')
        })
    
        .get('/movimientos/programar-mantenimiento', (req, res) => {
            res.send('<h1>Movimientos, programar-mantenimiento</h1>')
        })
//FIN: RUTAS DE 04MOVIMIENTOS
    
//INICIO: RUTAS DE 05NOTAS
    app
        .get('/notas/notas', (req, res) => {
            res.send('<h1>Notas</h1>');
        });
//FIN: RUTAS DE 05NOTAS
    
//INICIO: RUTAS DE 06REPORTES
    app
        .get('/reportes', (req, res) => {
            res.send('<h1>Reportes</h1>');
        })
    
        .get('/reportes/relacion-de-bajas', (req, res) => {
            res.send('<h1>Reportes, Relacion de bajas</h1>')
        })
    
        .get('/reportes/relacion-de-equipos', (req, res) => {
            res.send('<h1>Reportes, Causas de baja</h1>')
        })
    
        .get('/reportes/relacion-de-mantenimiento', (req, res) => {
            res.send('<h1>Reportes, Relacion de mantenimiento</h1>')
        })
//FIN: RUTAS DE 06REPORTES

//INICIO: RUTAS DE 07OPCIONES
    app
        .get('/opciones', (req, res) => {
            res.send('<h1>Opciones</h1>');
        })
    
        .get('/opciones/configuracion', (req, res) => {
            res.send('<h1>Opciones, Configuracion</h1>')
        })
    
        .get('/opciones/respaldos', (req, res) => {
            res.send('<h1>Opciones, Respaldos</h1>')
        })
    
        .get('/opciones/usuarios', (req, res) => {
            res.send('<h1>Opciones, Usuarios</h1>')
        })
//FIN: RUTAS DE 07OPCIONES    
    
//INICIO: RUTAS DE 08AUXILIARES
    app
        .get('/auxiliares', (req, res) => {
            res.send('<h1>Auxiliares</h1>');
        })
    
        .get('/auxiliares/tareas', (req, res) => {
            res.send('<h1>Auxiliares, tareas</h1>')
        })
//FIN: RUTAS DE 08AUXILIARES    

}
