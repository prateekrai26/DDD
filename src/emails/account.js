const sgMail=require("@sendgrid/mail")
sgMail.setApiKey(process.env.EMAIL_API)

const sendWelcomeEmail= (email,name)=>
{
    sgMail.send({
        to: email,
        from: 'cprateekrai@gmail.com',
        subject: 'WelCome',
        text: "Hello Welcome "+ name+ " To the Task App"
       // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      })
}

const sendExitEmail= (email,name)=>
{
    sgMail.send({
        to: email,
        from: 'cprateekrai@gmail.com',
        subject: 'Exit',
        text: "Thanks "+name+" for Using our App"
       // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      })
}

const Emails={
    sendWelcomeEmail,
    sendExitEmail
}



module.exports=Emails