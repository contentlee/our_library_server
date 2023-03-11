import { Library } from "../models/library";

export const getBooks = (req, res) => {
  Library.fetchAll()
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
};

export const getBook = (req, res) => {
  Library.findById(parseInt(req.params.id))
    .then((item) => {
      res.send(item);
    })
    .catch((err) => res.send(err));
};

export const addBook = (req, res) => {
  const book = new Library({
    title: req.body.title,
    subtitle: req.body.subtitle,
    author: req.body.author,
    date_of_publication: new Date(req.body.date_of_publication),
    publisher: req.body.publisher,
    img: req.body.img,
    description: req.body.description,
    user_id: req.body.user_id,
    user_name: req.body.user_name,
    create_date: new Date(),
    edit_date: new Date(),
  });

  book
    .createOne()
    .then((item) => {
      console.log(item);
      res.send("해당 개체를 생성하였습니다.");
    })
    .catch((err) => res.send(err));
};

export const deleteBook = (req, res) => {
  Library.deleteOne(req.params.id)
    .then(() => {
      res.send("해당 개체를 삭제하였습니다.");
    })
    .catch(() => {
      res.send(err);
    });
};

export const editBook = (req, res) => {
  const book = new Library({
    title: req.body.title,
    subtitle: req.body.subtitle,
    author: req.body.author,
    date_of_publication: req.body.date_of_publication,
    publisher: req.body.publisher,
    img: req.body.img,
    description: req.body.description,
    user_id: req.body.user_id,
    user_name: req.body.user_name,
    create_date: req.body.create_date,
    edit_date: new Date(),
  });
  book
    .editOne(req.params.id)
    .then(() => {
      res.send("해당 개체를 수정하였습니다.");
    })
    .catch((err) => res.send(err));
};

export const searchBooks = (req, res) => {
  Library.findByWord(req.params.word)
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
};
