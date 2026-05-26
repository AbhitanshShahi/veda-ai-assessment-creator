import multer from "multer";

const storage =
  multer.memoryStorage();

const allowedMimeTypes = [
  "application/pdf",
  "text/plain",
];

export const upload =
  multer({
    storage,

    fileFilter: (
      req,
      file,
      cb,
    ) => {
      if (
        allowedMimeTypes.includes(
          file.mimetype,
        )
      ) {
        cb(
          null,
          true,
        );
      } else {
        cb(
          new Error(
            "Only PDF and TXT files are allowed",
          ),
        );
      }
    },

    limits: {
      fileSize:
        10 * 1024 * 1024,
    },
  });