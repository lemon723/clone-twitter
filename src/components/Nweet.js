import React, { useState } from "react";
import { dbService } from "../fBase";
import { doc, deleteDoc, updateDoc, getFirestore } from "firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { storageService } from "../fBase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const NweetTextRef = doc(getFirestore(), "nweets", `${nweetObj.id}`);
  const urlRef = ref(storageService, nweetObj.attachmentUrl);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delte this nweet?");
    if (ok) {
      //delete nweet
      try {
        await deleteDoc(NweetTextRef);
        if (nweetObj.attachmentUrl !== "") {
          await deleteObject(urlRef);
        }
      } catch (e) {
        window.alert("Failed");
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    //업데이트 완료시 누르는 버튼
    await updateDoc(NweetTextRef, { text: newNweet });
    setEditing(false);
  };

  const onChange = (event) => {
    const value = event.target.value;
    setNewNweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value={"Update Nweet"} />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
