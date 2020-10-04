const express = require('express');
const db = require('./discountDb')
const restricted = require('../auth/auth-middleware');
const router = express.Router();

router.get('/', (req,res) => {
    db.get()
    .then(discounts =>{
      res.status(200).json(discounts)
    })
    .catch(err =>{
      res.status(500).json({error: "The discounts could not be retrieved", "err":err})
    })
  })

router.post('/add', (req, res) => {
    let discount = req.body;
    db.insert(discount)
      .then(discount => {
          res.status(200).json(discount)
      })
      .catch(error => {
        res.status(500).json(error);
        console.log(error)
      });
  });

  router.put('/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;
    changes? db.update(id, changes) .then(updated =>{
        if(updated){
          db.getById(id)
          .then(discount =>{
            res.status(200).json(discount)
          })
        } else{
            res.status(404).json({ message: "The discount with the specified ID does not exist." })
        }
    }) .catch(err =>{
        res.status(500).json({ error: "The discount information could not be modified.", errorMessage:err })
    }) : res.status(400).json({ errorMessage: "Please provide id and changes for the discount." })
  })

  router.delete('/:id', (req,res) => {
    const {id} = req.params;
    db.remove(id)
    .then(status =>{
      res.status(200).json({"status":"The product has been sucessfully removed"})
    })
    .catch(err =>{
      res.status(500).json({error: "The product could not be deleted"})
    })
  })



module.exports = router;   