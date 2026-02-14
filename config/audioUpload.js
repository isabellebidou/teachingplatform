//https://youtu.be/ysS4sL6lLDU?list=PLs7LQzp-tbVpNeo5thPa-A7KR-0sZJXto

/*const multer = require("multer");
const memoryStorage= multer.memoryStorage()
const upload = multer({ storage: memoryStorage }); // memory storage
module.exports = upload;*/
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB ≈ 1 min audio
  },
});

module.exports = upload;

