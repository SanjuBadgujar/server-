const express = require('express');
const Model = require('../model/model');

const router = express.Router()

module.exports = router;

router.get('/student', async (req, res) => {
    try{
        const data = await Model.find();
        res.json({data:data,message:"get"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
  })
  router.put('/student/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;
  
      const updatedData = await Model.findByIdAndUpdate(id, newData, { new: true });
      
      if (!updatedData) {
        return res.status(404).json({ message: "Data not found" });
      }
  
      res.json(updatedData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.patch('/student/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
  
        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )
  
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
  })
  router.delete('/student/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
  })
  router.post('/student', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
        
    });
   
    try {
      const dataToSave = await data.save();
      console.log('Data saved successfully:', dataToSave);
      res.status(200).json(dataToSave)
  }
  catch (error) {
     console.log(error);
      res.status(400).json({message: error.message})
  }
  })
  
  