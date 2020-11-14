const cursos = require('../models/cursos')

const getAll = (req, res) => {
    cursos.find(function(err, curso) {
        if(err){
            res.status(500).send(err.message)
        }
    res.status(200).send(curso)
});
}

const getPorTurno = (req, res) => {
    const parametros = req.query
    console.log(parametros)
    cursos.find(parametros, function (err, curso){
        if(err){
            res.status(500).send({ message: err.message})
        }
        res.status(200).send(curso)
    })  
}

const getById = (req, res) => {
    const id = req.params.id
    cursos.find({ id }, function(err, curso) {
        if(err) {
            res.status(500).send({ message: err.message})
        } 
        res.status(200).send(curso)
    })
}
    

const getBootcamps = (req, res) => {
    cursos.find( { bootcamp : true }, function(err, curso){
        if(err){
            res.status(500).send({ message: err.message})
        }
        res.status(200).send(curso)
    })  
}

const getCursosGratuitos = (req, res) => {
    const estado  = req.params.estado
    cursos.find({ estado, gratuito: true}, function(err, curso) {
        if(err){
            res.status(500).send({ message: err.message})
        }
        res.status(200).send(curso)
    } )
     
}

const getCursosPagos = (req, res) => {
    const estado = req.params.estado
    cursos.find({ estado, gratuito: false}, function(err, curso) {
        if(err) {
            res.status(500).send({message: err.message})
        }
        res.status(200).send(curso)
    }) 
}

const postCurso = (req, res) => {
    console.log("postCurso");
    let curso = new cursos(req.body);
    curso.save(function(err) {
        if(err){
            res.status(500).send({ message: err.message, message: FAIL})
      }  res.status(200).send({
           status: true, 
        message: "Curso Registrado com Sucesso!"})
    })
}
   

const deleteCurso = (req, res) => {
    const id = req.params.id
    cursos.deleteMany({ id }, function(err, curso){
        if(err){
            res.status(500).send({ message: err.message})
        }
        res.status(200).send({
            status: true,
            message: "Curso removido com Sucesso!"})
    })  
}

const deleteCursosPorTurno = (req, res) => {
    const parametros = req.query
    console.log(parametros)
    cursos.deleteMany(parametros, function(err, curso) {
        if(err){
            res.status(500).send({ status: true,message: err.message })
        }
        res.status(200).send({
            status: true,
            message: "Cursos excluídos com sucessso!"
        })
    }) 
}

const putCurso = (req, res) => {
    const id = req.params.id
    cursos.updateMany({ id }, { $set: req.body}, { upsert: true}, function(err){
        if(err){
            res.status(500).send({ message: err.message})
        }
        res.status(200).send({ message: "Curso atualizado com Sucesso!"})
    })  
}

module.exports = {
    getAll,
    getPorTurno,
    getById,
    getBootcamps,
    getCursosGratuitos,
    getCursosPagos,
    postCurso,
    deleteCurso,
    deleteCursosPorTurno,
    putCurso
}