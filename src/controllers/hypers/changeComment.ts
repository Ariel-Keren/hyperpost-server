import { Request, Response } from "express";
import Hyper from "../../models/Hyper";
import User from "../../models/User";
import { Types } from "mongoose";

const editComment = async (
  hyperName: string,
  postID: string,
  commentID: string,
  text: string
) => {
  const hyper = await Hyper.findOne({ name: hyperName });

  if (!hyper) return 404;

  const postIndex = hyper.posts.findIndex(
    (post) => post._id.toString() === postID
  );

  if (postIndex === -1) return 404;

  const commentIndex = hyper.posts[postIndex].comments.findIndex(
    (comment) => comment._id.toString() === commentID
  );

  if (commentIndex === -1) return 404;
  if (hyper.posts[postIndex].comments[commentIndex].text === text) return 200;

  const now = new Date();
  hyper.posts[postIndex].comments[commentIndex].text = text;
  hyper.posts[postIndex].comments[commentIndex].updatedAt = now;
  await hyper.save();

  return 200;
};

const likeComment = async (
  hyperName: string,
  postID: string,
  commentID: string,
  username: string,
  shouldAdd: boolean
) => {
  const hyper = await Hyper.findOne({ name: hyperName });

  if (!hyper) return 404;

  const postIndex = hyper.posts.findIndex(
    (post) => post._id.toString() === postID
  );

  if (postIndex === -1) return 404;

  const commentIndex = hyper.posts[postIndex].comments.findIndex(
    (comment) => comment._id.toString() === commentID
  );

  if (commentIndex === -1) return 404;

  if (shouldAdd) hyper.posts[postIndex].comments[commentIndex].likes++;
  else hyper.posts[postIndex].comments[commentIndex].likes--;
  const user = await User.findOne({ username });

  if (!user) return 404;

  const hyperIndex = user.hypers.findIndex(
    (currentHyper) => currentHyper.name === hyperName
  );

  if (hyperIndex === -1) return 404;

  const likeIndex = user.hypers[hyperIndex].likes.findIndex(
    (like) =>
      like.postID.toString() === postID &&
      like.commentID.toString() === commentID
  );

  if (shouldAdd && likeIndex !== -1) return 400;
  else if (!shouldAdd && likeIndex === -1) return 404;

  const dislikeIndex = user.hypers[hyperIndex].dislikes.findIndex(
    (dislike) =>
      dislike.postID.toString() === postID &&
      dislike.commentID.toString() === commentID
  );
  if (shouldAdd && dislikeIndex !== -1) {
    hyper.posts[postIndex].comments[commentIndex].dislikes--;
    user.hypers[hyperIndex].dislikes.splice(dislikeIndex, 1);
  }

  const newComment = {
    postID: new Types.ObjectId(postID),
    commentID: new Types.ObjectId(commentID),
  };
  if (shouldAdd) user.hypers[hyperIndex].likes.push(newComment);
  else user.hypers[hyperIndex].likes.splice(likeIndex, 1);
  await hyper.save();
  await user.save();

  return 200;
};

const dislikeComment = async (
  hyperName: string,
  postID: string,
  commentID: string,
  username: string,
  shouldAdd: boolean
) => {
  const hyper = await Hyper.findOne({ name: hyperName });

  if (!hyper) return 404;

  const postIndex = hyper.posts.findIndex(
    (post) => post._id.toString() === postID
  );

  if (postIndex === -1) return 404;

  const commentIndex = hyper.posts[postIndex].comments.findIndex(
    (comment) => comment._id.toString() === commentID
  );

  if (commentIndex === -1) return 404;

  if (shouldAdd) hyper.posts[postIndex].comments[commentIndex].dislikes++;
  else hyper.posts[postIndex].comments[commentIndex].dislikes--;
  const user = await User.findOne({ username });

  if (!user) return 404;

  const hyperIndex = user.hypers.findIndex(
    (currentHyper) => currentHyper.name === hyperName
  );

  if (hyperIndex === -1) return 404;

  const dislikeIndex = user.hypers[hyperIndex].dislikes.findIndex(
    (dislike) =>
      dislike.postID.toString() === postID &&
      dislike.commentID.toString() === commentID
  );

  if (shouldAdd && dislikeIndex !== -1) return 400;
  else if (!shouldAdd && dislikeIndex === -1) return 404;

  const likeIndex = user.hypers[hyperIndex].likes.findIndex(
    (like) =>
      like.postID.toString() === postID &&
      like.commentID.toString() === commentID
  );
  if (shouldAdd && likeIndex !== -1) {
    hyper.posts[postIndex].comments[commentIndex].likes--;
    user.hypers[hyperIndex].likes.splice(likeIndex, 1);
  }

  const newComment = {
    postID: new Types.ObjectId(postID),
    commentID: new Types.ObjectId(commentID),
  };
  if (shouldAdd) user.hypers[hyperIndex].dislikes.push(newComment);
  else user.hypers[hyperIndex].dislikes.splice(dislikeIndex, 1);
  await hyper.save();
  await user.save();

  return 200;
};

const changeComment = async (req: Request, res: Response) => {
  const { hyperName, postID, commentID } = req.params;
  const { text, likesChange, dislikesChange, username } = req.body;

  if (
    typeof text !== "string" ||
    typeof likesChange !== "number" ||
    typeof dislikesChange !== "number" ||
    typeof username !== "string" ||
    ![-1, 0, 1].includes(likesChange) ||
    ![-1, 0, 1].includes(dislikesChange) ||
    (likesChange && dislikesChange)
  )
    return res.sendStatus(400);

  if (likesChange)
    return res.sendStatus(
      await likeComment(
        hyperName,
        postID,
        commentID,
        username,
        likesChange === 1
      )
    );
  if (dislikesChange)
    return res.sendStatus(
      await dislikeComment(
        hyperName,
        postID,
        commentID,
        username,
        dislikesChange === 1
      )
    );
  return res.sendStatus(await editComment(hyperName, postID, commentID, text));
};

export default changeComment;
