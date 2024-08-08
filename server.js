const express = require("express");
const app = express();
app.use(express.json());
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

app.get("/",async (req,res)=>{
    const allUsers = await prisma.user.findMany();
    res.json(allUsers)
})
app.get("/house",async (req,res)=>{
    const allHouses = await prisma.house.findMany({
        include:{
            owner : true,
            builtBy:true,
        }
    });
    res.json(allHouses)
})
app.get("/house:id",async (req,res)=>{
    const id = req.params.id;
    const allHouses = await prisma.house.findUnique({
        where:{
            id,
        },
        include:{
            owner : true,
            builtBy:true,
        }
    });
    res.json(allHouses)
})
app.post("/",async (req,res)=>{
    const newUser = await prisma.user.create({data:req.body});
    res.json(newUser);
})
app.post("/house",async (req,res)=>{
    const newHouse = await prisma.house.create({data:req.body});
    res.json(newHouse);
})
app.put("/:id",async (req,res)=>{
const id = req.params.id;
const newAge = req.body.age;
    const updatedUser = await prisma.user.update({where: {id:parseInt(id)},data: {age:newAge}});
    res.json(updatedUser);
})

app.delete("/:id",async (req,res)=>{
    const id = req.params.id;
    const deletedUser = await prisma.user.delete({where: {id:parseInt(id)}});
    res.json(deletedUser);
})


app.listen(3000,()=>
console.log(`Server Running on PORT 3000`));