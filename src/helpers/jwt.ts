import { Secret, sign } from "jsonwebtoken";

const generateJWT = async (uid: string, name: string) => {
  let generatedToken;
  const SECRET_KEY: Secret = process.env.SECRET_JWT_SEED!;
  await new Promise((resolve, reject) => {
    const payload = { uid, name };

    sign(
      payload,
      SECRET_KEY,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("Token could not be generated");
        }

        resolve(token);
      }
    );
  }).then((token) => {
    generatedToken = token;
  });

  return generatedToken;
};

export default generateJWT;
