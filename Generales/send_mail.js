
const mail=require('nodemailer')

const emailRegistro = async (datos) => {
  const transporter = mail.createTransport({
    host: process.env.SMTP_EMAIL,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_ORIGEN,
      pass: process.env.PASSWORD_ORIGEN,
    },
  });

  const { email, nombre, token } = datos;

  // Enviar el email al usuario

  const info = await transporter.sendMail({
    from: "MAREA PANA",
    to: email,
    subject: "COMPROBACION DE CUENTA MARAPANA",
    text: "Comprueba tu cuenta de mareapana",
    html: `
   
      `,
  });
  console.log(process.env.URL_FRONT+"/confirmar/"+token)
};

module.exports=emailRegistro;