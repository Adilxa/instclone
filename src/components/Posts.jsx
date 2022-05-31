import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import Note from "./Note";
import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState([]);

  // This gets the Posts from the Firebase Cloud Firestore Realtime in descending order by timestamp
  // so, Newly added post can be displayed on the TOP.
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    // eslint-disable-next-line
    [db]
  );
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          postImg={post.data().postImage}
          caption={post.data().caption}
        />
      ))}
      <Note />
    </div>
  );
}

export default Posts;
