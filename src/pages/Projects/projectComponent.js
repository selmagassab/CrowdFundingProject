import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import "./projects.css";
import { projectService } from "./projectService";
import logo from "../../assets/layout/images/project-logo.png";

const ProjectComponent = () => {
    const projects = useSelector((state) => state.projects.projects);

    const renderList = projects.map((project) => {
        const deleteUser = () => {
            projectService.delete(project._id);
            window.location.reload(false);
        };
        const { _id, projectName, image } = project;
        return (
            <div className="xs:col-12 md:col-8 lg:col-3 projectComponent" key={_id}>
                <div className="card m-3 border-1 surface-border">
                    <div className="text-center">
                        <img className="w-9 shadow-2 my-3 mx-0" src={require("../../assets/layout/images/" + image)} />
                        <div className="text-xl font-bold mb-3"> {projectName}</div>
                        <div className="d-flex col-12 button-container">
                            <div className="row col-12">
                                <Link to={`/projects/${_id}`}>
                                    <Button icon="pi pi-info-circle" className="button col-5" label="Show" />
                                </Link>

                                <Button icon="pi pi-trash" className="button ml-1 col-5" label="Delete" onClick={deleteUser} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return renderList;
};

export default ProjectComponent;
