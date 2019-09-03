const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.route('/')
  .get((req, res) => {
    db.find()
      .then(response => {
        console.log(response);
        res.status(200).json(response);
      })
      .catch(e => {
        console.log(e);
        res.status(500).json({ error: "The posts information could not be retrieved." });
      })
  })
  .post((req, res) => {
    let post = req.body;
    console.log(post);
    if(!post.title || !post.contents) {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    else db.insert(post)
      .then(response => {
        res.status(201).json(response);
      })
      .catch(e => {
        console.log(e);
        res.status(500).json({ error: "There was an error while saving the post to the database" });
      })
  });


router.route('/:id')
  .get((req, res) => {
    let id = req.params.id;
    db.findById(id)
      .then(response => {
        console.log(response);
        if(response) res.status(200).json(response);
        else res.status(404).json({ message: "The post with the specified ID does not exist." });
      })
      .catch(e => {
        console.log(e);
        res.status(500).json({ error: "The post information could not be retrieved." });
      })
  })
  .put((req, res) => {
    let id = req.params.id;
    let update = req.body;
    if(!update.title || !update.contents) res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    else db.update(id, update)
      .then(response => {
        console.log(response);
        if(response) res.status(200).json(response);
        else res.status(404).json({ message: "The post with the specified ID does not exist." });
      })
      .catch(e => {
        console.log(e);
        res.status(500).json({ error: "The post information could not be modified." });
      });
  })
  .delete((req, res) => {
    let id = req.params.id;
    db.remove(id)
      .then(response => {
        console.log(response);
        if(response) res.status(200).json(response);
        else res.status(404).json({ message: "The post with the specified ID does not exist." });
      })
      .catch(e => {
        console.log(e);
        res.status(500).json({ error: "The post could not be removed" });
      });
  });


router.route('/:id/comments')
  .get((req, res) => {
    let id = req.params.id;
    db.findCommentById(id)
      .then(response => {
        console.log(response);
        if(response) res.status(200).json(response);
        else res.status(404).json({ message: "The post with the specified ID does not exist." });
      })
      .catch(e => {
        console.log(e);
        res.status(500).json({ error: "The comments information could not be retrieved." });
      });
  })
  .post((req, res) => {
    let id = req.params.id;
    let comment = { ...req.body };
    comment.post_id = id;
    if(!comment.text) res.status(400).json({ errorMessage: "Please provide text for the comment." });
    else db.insertComment(comment)
      .then(response => {
        console.log(response);
        if(response) res.status(201).json(response);
        else res.status(404).json({ message: "The post with the specified ID does not exist." });
      })
      .catch(e => {
        console.log(e);
        res.status(500).json({ error: "There was an error while saving the comment to the database" });
      });
  });

module.exports = router;