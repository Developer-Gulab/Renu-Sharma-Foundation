// routes/contactRoutes.js

import express from "express";
import  {sendContactMessage} from "../controllers/contactController.js";

const contactRouter = express.Router();

// POST /api/contact
contactRouter.post("/", sendContactMessage);

export default contactRouter;
