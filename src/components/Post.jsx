import {
  BookmarkIcon,
  ChatIcon,
  ChevronDoubleRightIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon as HeartOutlinedIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContextProvider";
import { db } from "../firebase/firebase-config";
import Moment from "react-moment";

function Post({ id, username, userImg, postImg, caption }) {
  const { user } = useUserAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  // This gets the Likes from the Firebase Cloud Firestore Realtime.
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    // eslint-disable-next-line
    [db, id]
  );

  // First checks the collection if the user (user can like the post at only once) is liked or not the Post...
  useEffect(
    () => setHasLiked(likes.findIndex((like) => like.id === user?.uid) !== -1),
    // eslint-disable-next-line
    [likes]
  );
  // then update the hasLiked state and as per the state it update or delete the like from the firestore.
  const likePost = async () => {
    const userName = user.email?.split("@")[0];

    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", user.uid), {
        username: userName,
      });
    }
  };

  // This gets the comments from the Firebase Cloud Firestore Realtime on every comment added.
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    // eslint-disable-next-line
    [db, id]
  );

  // Adds the comment to the firebase cloud firestore
  const sendComment = async (e) => {
    e.preventDefault();
    setComment("");
    const commentToSend = comment;

    // If the user is not signed in from the Google then profile photo is Provided by "https://avatars.dicebear.com" API, and the username extracted from the users Email id...
    const profileImgURL = user.photoURL
      ? user.photoURL
      : `https://avatars.dicebear.com/api/adventurer-neutral/:${user.displayName}.svg`;

    const userName = user.email?.split("@")[0];

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: userName,
      timestamp: serverTimestamp(),
      userImg: profileImgURL,
    });
  };

  return (
    <div className="bg-white my-3 sm:my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-3 cursor-pointer">
        <img
          className="rounded-full h-12 w-12 object-contain border-2 border-red-500 p-[2px] mr-3 cursor-pointer"
          src={userImg}
          alt={username}
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-7 cursor-pointer" />
      </div>
      {/* Post Image */}
      <img className="object-cover w-full" src={postImg} alt={username} />
      {/* Buttons */}
      <div className="flex justify-between items-center px-4 pt-4">
        <div className="flex items-center space-x-4">
          {/* render the Heart Icon as per the user liked the post on Not... */}
          {hasLiked ? (
            <HeartSolidIcon
              onClick={likePost}
              className="h-7 cursor-pointer text-red-500 hover:scale-125 transition-all duration-75 ease-out"
            />
          ) : (
            <HeartOutlinedIcon
              onClick={likePost}
              className="h-7 cursor-pointer hover:scale-125 transition-all duration-75 ease-out"
            />
          )}
          <ChatIcon className="h-7 hover:scale-125 transition-all duration-75 ease-out" />
          <PaperAirplaneIcon className="h-7 hover:scale-125 transition-all duration-75 ease-out rotate-[60deg]" />
        </div>
        <div className="flex items-center">
          <BookmarkIcon className="h-7" />
        </div>
      </div>
      {/* Caption */}
      <p className="p-3 truncate">
        {likes.length > 0 && (
          <span className="font-bold">{likes.length} likes</span>
        )}
        <br />
        <span className="font-bold">@{username} </span>
        {caption}
      </p>

      {/* Comments */}
      {comments.length > 0 && (
        <div className="ml-7 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div
              key={comment.data().timestamp}
              className="flex items-center space-x-3 mb-3"
            >
              <img
                className="w-7 h-7 rounded-full"
                src={comment.data().userImg}
                alt={comment.data().username}
              />
              <p className="text-sm flex-1 truncate">
                <span className="font-bold">@{comment.data().username} </span>
                {comment.data().comment}
              </p>
              {/* Calculate the time the user is commented on post from current time  */}
              <Moment className="pr-5 text-xs" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Input Box */}
      <form onSubmit={sendComment} className="flex items-center px-2 pb-2">
        <EmojiHappyIcon className="w-7 outline-none" />
        <input
          type="text"
          name="commentInput"
          placeholder="Add a comment..."
          className="border-none focus:ring-0 flex-1 text-gray-500"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          autoComplete="off"
        />
        <button
          disabled={!comment.trim()}
          type="submit"
          className="font-semibold text-blue-400"
        >
          <div className="flex items-center space-x-1">
            <span>Post</span>
            <ChevronDoubleRightIcon className="h-5 text-blue-400" />
          </div>
        </button>
      </form>
    </div>
  );
}

export default Post;