import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Fragment, useRef, useState } from "react";
import { useUserAuth } from "../context/UserAuthContextProvider";
import { db, storage } from "../firebase/firebase-config";
import { uploadString, getDownloadURL, ref } from "firebase/storage";
import UploadLoader from "../Assets/Images/upload-loader.svg";
import ReactPlayer from "react-player";

export default function MyModal() {
  const { modelOpen, setModelOpen, user } = useUserAuth();
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileType, setFileType] = useState("");
  const [fileFormat, setFileFormat] = useState("");

  // var FileReader: new () => FileReader
  // Lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    // FileReader provides .onload event, that triggers after user selects a file that to be uploaded
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
      var match = reader.result.match(/^data:([^/]+)\/([^;]+);/) || [];
      var type = match[1];
      var format = match[2];
      setFileType(type);
      setFileFormat(format);
      // console.log(type);
      // console.log(format);
      // console.log(reader.result);
    };
  };

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);

    // Steps to follow to upload the post to Firebase :-

    // 1) create a post and add to firestore "posts" collection
    // 2) get the post ID for the newly created post
    // 3) upload the image to firebase storage with the post ID
    // 4) get a download URL from fb storage and update the original post with image
    // ==========================================

    // If the user is not signed in from the Google then profile photo is Provided by "https://avatars.dicebear.com" API, and the username extracted from the users Email id...
    const userName = user.email?.split("@")[0];
    const profileImgURL = user.photoURL
      ? user.photoURL
      : `https://avatars.dicebear.com/api/adventurer-neutral/:${userName}.svg`;
    // #1 Creates a documents collection in the firebase Cloud Firestore
    const docRef = await addDoc(collection(db, "posts"), {
      userId: user.uid,
      username: userName,
      profileImg: profileImgURL,
      caption: captionRef.current.value,
      timestamp: serverTimestamp(),
      fileType: fileType,
      fileFormat: fileFormat,
    });
    // #2 We get a documents ID
    // console.log("New doc Added with ID", docRef.id);

    // #3 Uploads Image to Firebase Storage
    const imagesRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imagesRef, selectedFile, "data_url").then(
      async (snapshot) => {
        // #4 We get the URL of uploaded image and the we update the previous created documents with than image URl
        const downloadURL = await getDownloadURL(imagesRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          postImage: downloadURL,
        });
      }
    );

    setModelOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  return (
    <>
      <Transition.Root appear show={modelOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setModelOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all flex flex-col justify-center items-center space-y-2">
                  {selectedFile ? (
                    fileType === "image" ? (
                      // eslint-disable-next-line
                      <img
                        src={selectedFile}
                        alt="Select Photo To Upload on Post"
                        className="w-full max-h-[30rem] object-contain cursor-pointer"
                        onClick={() => setSelectedFile(null)}
                      />
                    ) : (
                      <ReactPlayer
                        url={selectedFile}
                        width="100%"
                        height="100%"
                        playing={true}
                        controls={true}
                        volume={1}
                        loop={true}
                        className="w-full max-h-[30rem] object-contain cursor-pointer"
                        onClick={() => setSelectedFile(null)}
                      />
                    )
                  ) : (
                    <div
                      onClick={() => filePickerRef.current.click()}
                      className="cursor-pointer w-14 h-14 p-1 flex items-center justify-center bg-red-200 rounded-full "
                    >
                      <CameraIcon
                        className="h-7 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold leading-6 text-gray-900"
                    >
                      Upload a Photo
                    </Dialog.Title>

                    <input
                      ref={filePickerRef}
                      hidden
                      type="file"
                      name="uploadPhoto"
                      onChange={addImageToPost}
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      disabled={loading}
                      ref={captionRef}
                      type="text"
                      placeholder="Please Enter a Caption..."
                      className="border-none focus:ring-0 text-zinc-500 text-lg"
                    />
                    {loading && (
                      <img
                        className="w-24 h-24 m-auto object-contain cursor-wait"
                        src={UploadLoader}
                        alt="Uploading..."
                      />
                    )}
                    <button
                      disabled={!selectedFile || loading}
                      className="py-2 w-full text-center text-red-600 font-bold text-lg bg-white border-2 border-red-600 rounded-md disabled:hidden"
                      onClick={uploadPost}
                    >
                      Upload Post
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
