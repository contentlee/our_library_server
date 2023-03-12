import Comment from "../models/comment";

export const getCommentsByBookId = (req, res) => {
  Comment.findByBookId(req.params.book_id)
    .then((data) => res.status(200).json({ message: "데이터를 가져오는데 성공하였습니다.", data: data }))
    .catch(() => res.status(500).json({ message: "데이터를 가져오는데 실패하였습니다." }));
};

export const getCommentsByUserId = (req, res) => {
  Comment.findByUserId(req.user_id)
    .then((data) => res.status(200).json({ message: "데이터를 가져오는데 성공하였습니다.", data: data }))
    .catch(() => res.status(500).json({ message: "데이터를 가져오는데 실패하였습니다." }));
};

export const addComment = (req, res) => {
  const comment = new Comment({
    user_id: req.user_id,
    user_name: req.user_name,
    book_id: req.body.book_id,
    comment: req.body.comment,
    create_date: new Date(),
    edit_date: new Date(),
  });

  comment.increaseCount().then((data) => {
    comment.info._id = data.value.count + 1;
    comment
      .createOne()
      .then(() => {
        res.status(200).json({ message: "데이터 추가에 성공하였습니다." });
      })
      .catch(() => res.status(500).json({ message: "데이터 추가에 실패하였습니다." }));
  });
};

export const editComment = async (req, res) => {
  const checked = await Comment.checkCommentIdByUserId(req.params.comment_id, req.user_id);
  if (!checked[1]) return res.status([0]).json({ message: "데이터에 접근할 수 없습니다." });

  const comment = new Comment({
    comment_id: req.params.comment_id,
    comment: req.body.comment,
  });

  comment
    .editOne()
    .then(() => res.status(200).json({ message: "데이터 수정에 성공하였습니다." }))
    .catch(() => res.status(500).json({ message: "데이터 수정에 실패하였습니다." }));
};

export const deleteComment = async (req, res) => {
  const checked = await Comment.checkCommentIdByUserId(req.params.comment_id, req.user_id);
  if (!checked[1]) return res.status([0]).json({ message: "데이터에 접근할 수 없습니다." });

  Comment.deleteOne(req.params.comment_id)
    .then(() => res.status(200).json({ message: "데이터를 삭제하였습니다." }))
    .catch(() => res.status(500).json({ message: "데이터 삭제에 실패하였습니다." }));
};
