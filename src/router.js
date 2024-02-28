import express from "express";
import * as textAnalyzer from "./textAnalyzer.js";
import multer from "multer";
const router = express.Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

const upload = multer({ dest: "uploads/" });
router.get("/health", textAnalyzer.health);
router.post(
  "/upload-file",
  upload.single("sampleFile"),
  textAnalyzer.uploadTextFile
);
export { router };
