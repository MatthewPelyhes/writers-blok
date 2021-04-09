import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deletePost } from "../store/actions/posts";

const PostItem = ({title, post, created, postId, currentUser, deletePost}) => {

  const userId = currentUser.user.id;
  
  return (
    <div className="prompt-container">
      <h2>{title || "Title"}</h2>
      <div className="prompt">
        {post || "This is where a really cool description of the prompt would go! I would put lorem ipsum text here, but I forgot how to do that quickly using emmett. Oh well!"}
      </div>
      <div className="prompt-bottom">
        <div className="prompt-author">
          Created <span className="colon">:</span> {moment(created).format("MMMM Do YYYY")}
        </div>
        <div className="like-container">
          <div className="icon-container trash-container">
            <FontAwesomeIcon icon={faTrash}  className="icon trash" alt="trash" onClick={()=> deletePost({postId, userId})} />
          </div>
        </div>
      </div>
    </div>
  )
};

function mapStateToProps(state) {
  return {
    errors: state.errors,
    currentUser: state.currentUser
  };
}
export default connect(mapStateToProps, {deletePost})(PostItem);