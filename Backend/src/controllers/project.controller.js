import { Project } from "../models/project.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const createProject = async (req, res, next) => {
    try {
        const { name } = req.body;
        
        if (!name?.trim()) {
            throw new apiError(400, "project name is required");
        }

        const trimmedName = name.trim();

        //* we are not allowing duplicate project names and we will also not allow project name === "inbox"
        if (trimmedName.toLowerCase() === "inbox") {
            throw new apiError(400, "inbox is a reserved project name");
        }

        const existingProject = await Project.findOne({
            owner: req.user._id,
            name: trimmedName,
        });

        if (existingProject) {
            throw new apiError(409, "Project with this name already exists");
        }

        //* Calculate order (new project goes to end)
        const lastProject = await Project.findOne({ owner: req.user._id })
            .sort({ order: -1 }) //desc order
            .select("order"); // i only want order not any other property

        const newOrder = lastProject ? lastProject.order + 1 : 1;

        // Create project
        const project = await Project.create({
            name: trimmedName,
            owner: req.user._id,
            order: newOrder,
            isInbox: false,
            status: "active",
        });

        return res
            .status(201)
            .json(
                new apiResponse(201, project, "Project created successfully"),
            );
    } catch (error) {
        next(error);
    }
};

export { createProject };
