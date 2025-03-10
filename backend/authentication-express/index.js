const express = require("express");
const mongoose = require("mongoose");
const { User } = require("./modals/User");
const { Product } = require("./modals/Product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isUser } = require("./middlewares/isUser");
const cors = require("cors");
const { Cart } = require("Cart");

const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect("mongodb://localhost:27017/klecommerce")
  .then(() => {
    console.log("MongoDb Is Connected");
  })
  .catch((err) => {
    console.log("Error COnnected Database ", err);
  });

app.post("/register", async (req, res) => {
  const body = req.body;
  // we are having email , name and password
  const useremail = body.email;
  const name = body.name;
  const password = body.password;
  if (!useremail || !name || !password) {
    res.status(400).json({ message: "Some Fileds Are Missing" });
  }
  const isUserAlreadyExist = await User.findOne({ email: useremail });

  if (isUserAlreadyExist) {
    res.status(400).json({ message: "User Already Have An Account" });
    return;
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log("✌️hashedPassword --->", hashedPassword);
    // const user = new User({
    //   name: name,
    //   email: useremail,
    //   password: hashedPassword,
    // });
    // await user.save();
    // jwt u can assume its for signing a contract with a signature of email
    const token = jwt.sign(isUserAlreadyExist, "supersecret");
    console.log("✌️token --->", token);
    await User.create({
      name: name,
      email: useremail,
      password: hashedPassword,
      token: token,
      role: "user",
    });
    return res.status(201).json({ message: "User Created Succesfully" });
  }
});

app.post("/login", async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  // we are assuming here that we have email and pasword with us
  // const us
  const user = await User.findOne({ email: email });

  if (user) {
    // if user exist, we have to do something
    const isPasswordMatched = bcrypt.compareSync(password, user.password);
    console.log("✌️isPasswordMatched --->", isPasswordMatched);
    if (isPasswordMatched == true) {
      res.status(200).json({
        name: user.name,
        token: user.token,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "Password Not Matched" });
    }
    // console.log("✌️user --->", user);
    // res.status(200).send("Success");
  } else {
    res
      .status(400)
      .json({ message: "User is Not Registered. Please Register First" });
  }
});

app.get("/products", async (req, res) => {
  console.log("Products");
  const products = await Product.find();
  res.status(200).json({
    products: products,
  });
});

app.post("/add-product", async (req, res) => {
  const body = req.body;
  const name = body.name;
  const description = body.description;
  const image = body.image;
  const price = body.price;
  const brand = body.brand;
  const stock = body.stock;
  /// now we aassuming we hace every thing for product
  await Product.create({
    name: name,
    description: description,
    image: image,
    stock: stock,
    brand: brand,
    price: price,
  });
  res.status(201).json({
    message: "Product Created Succesfully",
  });
});

app.post('/cart/add', async (req,res) =>{
  const body = req.body;

});

app.listen(4242, () => {
  console.log("Server is Started on 4242");
});
