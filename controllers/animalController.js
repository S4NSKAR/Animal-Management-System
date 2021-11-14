const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const Animal = mongoose.model('Animal')

router.get("/", (req, res) => {
    res.render("animal/addOrEdit", {
      viewTitle: "Insert Animal"  
    }); 
  });

router.post("/", (req, res) => {
    if (req.body._id == "") {
      insertRecord(req, res);
    } else {
      updateRecord(req, res);
    }
  });
  
function insertRecord(req, res) {  
    var animal = new Animal();
    animal.name = req.body.name;
    animal.breed = req.body.breed;
    animal.category = req.body.category;
    animal.cage = req.body.cage;
    animal.save((err, doc) => {
      if (!err) {
        res.redirect("animal/list");
      } else {
        console.log("Error during insert: " + err);
      }
    });
  }
  
function updateRecord(req, res) {  
    Animal.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
      (err, doc) => {
        if (!err) {
          res.redirect("animal/list");
        } else {
          console.log("Error during update: " + err);
        }
      }
    );
  }
  
router.get("/list", (req, res) => {  
    Animal.find((err, docs) => {
      if (!err) {
        res.render("animal/list", {
          list: docs
        });
  
      } else {
        console.log("Error in retrieval: " + err);
      }
    });
  });
  
   
  
router.get("/:id", (req, res) => {  
    Animal.findById(req.params.id, (err, doc) => {
      if (!err) {
        res.render("animal/addOrEdit", {
          viewTitle: "Update Animal",
          animal: doc
        });
        console.log(doc);
      }
    });
  });
  
router.get("/delete/:id", (req, res) => {  
    Animal.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
        res.render("/animal/list");
      } else {
        console.log("Error in deletion: " + err);
      }
    });
  });
  
  module.exports = router;