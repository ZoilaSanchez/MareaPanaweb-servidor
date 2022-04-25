
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
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Confirmación de la cuenta</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
            <!-- <link href="dist/style.css" rel="stylesheet"> -->
            <script src="https://kit.fontawesome.com/0bfc2dda1d.js" crossorigin="anonymous"></script>
            <script src="https://unpkg.com/feather-icons"></script>
            <link rel="shortcut icon" href="../static/LogoCircular.png">
        
        </head>
        <body>
            <div class="container"> 
                <img src="../static/puesta-de-sol.png" class="rounded mx-auto d-block" alt="...">
                <figure class="text-center">
                <p><em>¡CONFIRMACION DE CUENTA EXITOSA!</em></p>
                <p><em>Sigue disfrutando de los bellos atardeceres que nos regala Guate junto con la familia MareaPana</em></p>
                <a href="../pages/login.html" class="btn btn-primary btn-lg " tabindex="-1" role="button" aria-disabled="false">INICIAR</a>
            </figure>
    
    
    
            </div>
        </body>
    </html>
      `,
  });
  console.log(process.env.URL_FRONT+"/confirmar/"+token)
};

module.exports=emailRegistro;