import Favorite from "../models/favorite";

export const getFavoriteIds = (req, res) => {
  Favorite.findIds(req.params.user_id)
    .then((data) => res.status(200).json({ message: "배열을 가져오는데 성공하였습니다.", data: data }))
    .catch(() => res.status(500).json({ message: "배열을 가져오는데 실패하였습니다." }));
};

export const getFavoriteBooks = (req, res) => {
  Favorite.findIds(req.params.user_id)
    .then((dataA) => {
      Favorite.findAll(dataA.favorite_books)
        .then((dataB) => res.status(200).json({ message: "데이터를 갸져오는데 성공하였습니다.", data: dataB }))
        .catch(() => res.status(500).json({ message: "배열을 가져오는데 실패하였습니다." }));
    })
    .catch(() => res.status(500).json({ message: "사용자 정보를 가져오는데 실패하였습니다." }));
};

export const addFavoriteBook = (req, res) => {
  Favorite.addOne(req.body.user_id, req.body.book_id)
    .then(() => res.status(200).json({ message: "해당 데이터를 추가하는데 성공하였습니다." }))
    .catch(() => res.status(500).json({ message: "해당 데이터를 추가하는데 실패하였습니다." }));
};

export const deleteFavoriteBook = (req, res) => {
  Favorite.deleteOne(req.body.user_id, req.params.book_id)
    .then(() => res.status(200).json({ message: "해당 데이터를 삭제하는데 성공하였습니다." }))
    .catch(() => res.status(500).json({ message: "해당 데이터를 삭제하는데 실패하였습니다." }));
};
