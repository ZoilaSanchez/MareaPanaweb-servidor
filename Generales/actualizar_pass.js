
const mail=require('nodemailer')

const actualizar_pass = async (datos) => {
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
    subject: "Restablecer tu password",
    text: "Restablecer tu password",
    html: `<p>Hola: ${nombre}, solicitaste el cambio de contraseña.</p>
        
        <p>Token: ${token}</p>
        <p>sigue el siguiente password para generar un nuevo password:

        <a href="${process.env.FRONTEND_URL}">Restablecer password</a> </p>

        <p> Si el presente correo no presenta lo hablado, omitalo </p>
      `,
  });

};

module.exports=actualizar_pass;