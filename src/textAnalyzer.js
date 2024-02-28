import * as dotenv from "dotenv";
import fs from "fs";
dotenv.config();
export const health = (req, res) => {
  res
    .status(200)
    .send({ status: "ok", message: "Successfully run: " + process.env.PORT });
};

export const uploadTextFile = (req, res) => {
  try {
    if (!req?.file) {
      throw new Error("No File Found!");
    }
    fs.readFile(req.file.path, "utf8", function (err, data) {
      if (err) throw new Error("File Crashed!");
      let wordCount = 0,
        characterCount = 0,
        paraCount = 0,
        longestwords,
        sentenceCount = 0;

      wordCount = data.split(" ").length;
      characterCount = data.trim().length;
      paraCount = data.replace(/\n$/gm, "").split(/\n/).length;
      sentenceCount = data.trim().split(/[.?!]/g).filter(Boolean).length;
      longestwords = longestWord(data);

      res.status(200).send({
        message: "Data Send Successfully!",
        data: {
          wordCount,
          characterCount,
          paraCount,
          sentenceCount,
          longestwords,
        },
      });
    });
    fs.unlinkSync(req.file.path);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err?.message,
    });
  }
};

function longestWord(str) {
  var words = str.split(" ");
  var longest = "";

  for (var i = 0; i < words.length; i++) {
    if (words[i].length > longest.length) {
      longest = words[i];
    }
  }
  return longest;
}
