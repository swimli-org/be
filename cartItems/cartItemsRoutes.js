const express = require('express');
const db = require('./cartItemsDb')
const restricted = require('../auth/auth-middleware');
const router = express.Router();

router.get('/', (req,res) => {
    db.get()
    .then(products =>{
      res.status(200).json(products)
    })
    .catch(err =>{
      res.status(500).json({error: "The products could not be retrieved"})
    })
  })

  router.get('/userCart/:id', (req,res) => {
    const {id} = req.params;
    db.getUserProducts(id)
    .then(cart =>{
      res.status(200).json(cart)
    })
    .catch(err =>{
        console.log(err)
      res.status(500).json({error: "The products could not be retrieved"})
    })
  })

  router.post('/cartItemByAttribute', (req,res) => {
      const {attribute} = req.body.attribute
    db.getBy(attribute)
    .then(product =>{
      res.status(200).json(product)
    })
    .catch(err =>{
      res.status(500).json({error: "The products could not be retrieved"})
    })
  })

router.post('/add', (req, res) => {
    let product = req.body;
    db.insert(product)
      .then(product => {
          res.status(200).json(product)
       
      })
      .catch(error => {
        res.status(500).json(error);
        console.log(error)
      });
  });
  router.get('/getCartItemById/:id', (req,res) => {
    const {id} = req.params;
  
    db.getById(id)
    .then(product =>{
      res.status(200).json(product)
    })
    .catch(err =>{
      res.status(500).json({error: "The product could not be retrieved"})
    })
  })

  router.put('/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;
  
    changes? db.update(id, changes) .then(updated =>{
        if(updated){
          db.getById(id)
          .then(product =>{
            res.status(200).json(product)
          })
        } else{
            res.status(404).json({ message: "The product with the specified ID does not exist." })
        }
    }) .catch(err =>{
        res.status(500).json({ error: "The product information could not be modified.", errorMessage:err })
    }) : res.status(400).json({ errorMessage: "Please provide id and changes for the product." })
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
  router.post('/emptyUserCart/:user_id', (req, res) => {
    let {user_id} = req.params;

    db.getUserProducts(user_id)
    .then(products =>{
        products.forEach(el =>{
            db.remove(el.cartItem_id)
            .then(res =>{
                console.log(res)
            })
            .catch(err =>{
                console.log(err)
            })
        })
    })
    .then(resp =>{
        res.status(200).json({"status":"cart emptied"})
    })
  

  });

  


module.exports = router;   