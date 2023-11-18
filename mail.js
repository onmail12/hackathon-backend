import nodemailer from "nodemailer";

const mail = "ar3231124@gmail.com";

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mail,
    pass: "honeyBear(1)",
  },
});

const details = {
  from: mail,
  to: "protonu1122@gmail.com",
  subject: "dsa",
  text: "daw",
};

mailTransporter.sendMail(details);
