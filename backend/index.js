const express = require("express");
const app = express();
const mongoose = require('mongoose');

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/products");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/orders");

require("dotenv").config();

mongoose.connect(process.env.MONGO_DB_LINK)
  .then(() => console.log("connection succesfull!"))
  .catch((error) => console.log(error));

const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/auth', authRoute);
app.use('/api/cart', cartRoute);
app.use('/api/orders', orderRoute)

//MAIL TRAP

app.post("/send_mail", cors(), async (req, res) => {
  let { checkoutInfo } = req.body

  const firstName = String(checkoutInfo['firstName']);
  const lastName = String(checkoutInfo['lastName']);
  const address = String(checkoutInfo['address']);
  const phone = String(checkoutInfo['phone']);
  const email = String(checkoutInfo['email']);
  const orders = checkoutInfo.cart.map((order) => {
    return (order.name)
  }).join(' // ')
  const sizes = checkoutInfo.cart.map((order) => {
    return (order.size)
  }).join(' // ')

  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })

  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: "test@test.com",
    subject: "test email",
    html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>Order!</h2>
        <p>
        <small>${firstName}</small> // 
        <small>${lastName} </small> // 
        <small>${address} </small> // 
        <small>${phone} </small> //
        <small>${email}</small>
        </p>
        <p>
        <small>${orders}</small> <br>
        <small>${sizes}</small>
        </p>
    
        <p>All the best, Kaldrma</p>
         </div>
    `
  })
})



app.listen(process.env.PORT || 4000, () => {
  console.log('Server is listening on port 4000');
});

