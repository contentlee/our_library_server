import { Library } from "../models/library";

export const getBooks = (req, res) => {
  Library.findAll()
    .then((data) => res.status(200).json({ message: "데이터를 가져오는데 성공했습니다.", data: data }))
    .catch(() => res.status(500).json({ message: "데이터를 가져오는데 실패하였습니다." }));
};

export const getBook = (req, res) => {
  Library.findById(parseInt(req.params.id))
    .then((data) => res.status(200).json({ message: "데이터를 가져오는데 성공했습니다.", data: data }))
    .catch(() => res.status(500).json({ message: "데이터를 가져오는데 실패하였습니다." }));
};

export const searchBooks = (req, res) => {
  Library.findByWord(req.params.word)
    .then((data) => res.status(200).json({ message: "데이터를 가져오는데 성공했습니다.", data: data }))
    .catch(() => res.status(500).json({ message: "데이터를 가져오는데 실패하였습니다." }));
};

export const addBook = (req, res) => {
  const library = new Library({
    title: req.body.title,
    subtitle: req.body.subtitle,
    author: req.body.author,
    date_of_publication: new Date(req.body.date_of_publication),
    publisher: req.body.publisher,
    img: req.body.img,
    description: req.body.description,
    user_id: req.user_id,
    user_name: req.user_name,
    create_date: new Date(),
    edit_date: new Date(),
  });

  library
    .increaseCount()
    .then((data) => {
      library.info._id = data.value.count + 1;
      library
        .createOne()
        .then(() => {
          res.status(200).json({ message: "데이터 추가에 성공하였습니다." });
        })
        .catch(() => res.status(500).json({ message: "데이터 추가에 실패하였습니다." }));
    })
    .catch(() => res.status(500).json({ message: "아이디 정보를 업데이트하는데 실패하였습니다." }));
};

export const editBook = async (req, res) => {
  const checked = await Library.checkBookIdByUserId(req.body.book_id, req.user_id);
  if (!checked[1]) return res.status([0]).json({ message: "데이터에 접근할 수 없습니다." });

  const library = new Library({
    title: req.body.title,
    subtitle: req.body.subtitle,
    author: req.body.author,
    date_of_publication: req.body.date_of_publication,
    publisher: req.body.publisher,
    img: req.body.img,
    description: req.body.description,
    user_id: req.user_id,
    user_name: req.user_name,
    create_date: req.body.create_date,
    edit_date: new Date(),
  });

  library
    .editOne(req.params.id)
    .then(() => res.status(200).json({ message: "데이터 수정에 성공하였습니다." }))
    .catch(() => res.status(500).json({ message: "데이터 수정에 실패하였습니다." }));
};

export const deleteBook = async (req, res) => {
  const checked = await Library.checkBookIdByUserId(req.body.book_id, req.user_id);
  if (!checked[1]) return res.status([0]).json({ message: "데이터에 접근할 수 없습니다." });

  Library.deleteOne(req.params.id)
    .then(() => res.status(200).json({ message: "데이터를 삭제하였습니다." }))
    .catch(() => res.status(500).json({ message: "데이터 삭제에 실패하였습니다." }));
};
