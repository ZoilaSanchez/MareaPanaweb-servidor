
const mail=require('nodemailer')

const emailRegistro = async (datos) => {
  const transporter = mail.createTransport({
    host: process.env.SMTP_EMAIL,
    port: process.env.EMAIL_PORT,
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
    html: `<p>Bienvenido: ${nombre}, comprueba tu cuenta.</p>
        <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a> </p>

        <p> si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
      `,
  });
  console.log(process.env.URL_FRONT+"/confirmar/"+token)
};

module.exports=emailRegistro;