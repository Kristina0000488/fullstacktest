const express = require('express');
const BookModel = require('../models/book');
const router = express.Router();

router.get("/books", async (_, response) => {
    try {
     const books = await BookModel.find({});
      response.status(200).send(books);

    } catch (error) {
      response.status(500).send({ error });
    }
});

router.get("/books/:id", async (request, response) => {
    try {
        const book = await BookModel.findOne({ _id: request.params.id });
        response.status(200).send(book);

    } catch (error) {
        response.status(500).send({ error });
    }
});

router.get("/books/title/:title", async (request, response) => {
    try {
        const partialTitle = new RegExp(request.params.title, 'i');
        const books = await BookModel.find({ title: { $regex: partialTitle } });

        response.status(200).send(books);
    } catch (error) {
        response.status(500).send({ error });
    }
});

router.post("/books", async (request, response) => {
    try {
        const { title, author, genre, year } = request.body;

        if (!title || !author || !genre) {
            return response.status(400).send("Missing required fields: title, author, and genre");
        }

        const book = new BookModel({
            title,
            author,
            genre,
            year
        });
        
        await book.save();

        response.status(201).send(book);
    } catch (error) {
        response.status(500).send(error.message);
    }
});


router.put("/books/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const update = request.body;
  
        const bookToUpdate = await BookModel.findOneAndUpdate({ _id: id }, update, {  new: true, upsert: true });
  
        response.status(200).send(bookToUpdate);
    } catch (e) {
        response.status(500).send(e.message);
    }
});

router.delete("/books/:id", async (request, response) => {
    try {
        const id = request.params.id;  
        const bookToDelete = await BookModel.findByIdAndDelete(id);

        if (!bookToDelete) {
            return response.status(404).send("Book not found");
        }
        response.sendStatus(204);
    } catch (e) {
        response.status(500).send(e);
    }
});

module.exports = router;