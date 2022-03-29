
const mail=require('nodemailer')

const emailCodigo = async (datos) => {
  const transporter = mail.createTransport({
    host: process.env.SMTP_EMAIL,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_ORIGEN,
      pass: process.env.PASSWORD_ORIGEN,
    },
  });

  const { email, nombre, codigo } = datos;

  // Enviar el email al usuario

  const info = await transporter.sendMail({
    from: "MAREA PANA",
    to: email,
    subject: "COMPROBACION DE CUENTA MARAPANA",
    text: "El codigo de ingreso es: ",
    html: `<p>Bienvenido: ${nombre}, </p>
        <p> tu codigo es : ${codigo}</p>
       
        <p> si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
      `,
  });

};

module.exports=emailCodigo;