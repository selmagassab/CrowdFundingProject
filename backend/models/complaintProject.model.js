const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ComplaintType = Object.freeze({
    InProgress: "in progress",
    Done: "done",
});

const complaintProjectSchema = new Schema(
    {
        complaintProjectTitle: {
            type: String,
            required: true,
            minlength: [10, "complaint title Minimum 10 charachters."],
        },
        complaintDescription: {
            type: String,
            required: true,
            minlength: [10, "complaint description Minimum 10 charachters."],
        },
        complaintType: {
            type: String,
            required: true,
            enum: Object.values(ComplaintType),
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ComplaintProject = mongoose.model("ComplaintProject", complaintProjectSchema);

module.exports = ComplaintProject;
