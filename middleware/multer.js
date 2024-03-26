import multer from "multer";
import path from "path";
import fs from "fs";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      if(file.fieldname==='posts'){
        const [type, extension] = file.mimetype.split('/')
        if (type === 'image') {
			cb(null, `uploads/${file.fieldname}/images`)
		} else if (type === 'video') {
			cb(null, `uploads/${file.fieldname}/videos`)
		}

    }else{

        if (!fs.existsSync("uploads/" + file.fieldname)) {
            fs.mkdirSync("uploads/" + file.fieldname);
            cb(null, `./uploads/${file.fieldname}`);
        } else {
            cb(null, `./uploads/${file.fieldname}`);
        }
    }
    },
  filename: function (req, file, cb) {
    if(file.fieldname==='posts')
    {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		const [type, extension] = file.mimetype.split('/')
		cb(null, type + '-' + req.user.username+'-' + uniqueSuffix+ path.extname(file.originalname))
    }else if(file.fieldname==='stories')
    {
      const uniqueSuffix = Date.now()+86400000 + '-' + Math.round(Math.random() * 1e9)
      const [type, extension] = file.mimetype.split('/')
      cb(null, file.fieldname + '-' + req.user.username+'-' + uniqueSuffix+ path.extname(file.originalname))
    }else if(file.fieldname==='covervideo'){
      const [type, extension] = file.mimetype.split('/')
      cb(null, type + '-' + req.user.username+'-'+ path.extname(file.originalname))
    }else if(file.fieldname==='coverthumbnail'){
      const [type, extension] = file.mimetype.split('/')
      cb(null, type + '-' + req.user.username+'-'+ path.extname(file.originalname))
    }
    else{
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
            );
        }
  },
});
const upload = multer({ storage: storage });
export default upload;
