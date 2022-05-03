import axios from "axios";

export const commentEventService = {
    addComment,
};

async function addComment(commentt) {
    let formData = new FormData();
    formData.set("comment", commentt.comment);
    formData.set("event", commentt.event);
    formData.set("user", commentt.user);
    console.log(...formData);
    return await axios
        .post("http://localhost:5000/commentEvent/addComment", formData)
        .then((res) => {
            console.log("comment added!");
        })
        .catch((err) => {
            console.log(err);
        });
}



