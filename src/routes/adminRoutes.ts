import express from "express"
import { dashBoard, loginUser, registerUser } from "../controllers/adminController"
import { roleMiddleware } from "../utils/roleMiddleware"


const router=express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/dashboard",dashBoard,roleMiddleware(["admin"]),dashBoard)

export default router

