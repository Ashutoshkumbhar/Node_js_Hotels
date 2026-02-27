const express = require('express');
const router = express.Router();
const MenuItem = require("./../models/MenuItem");

//post method for menuitems
router.post('/', async (req, res) => {
  try {
    const data = req.body
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log('Menu data saved');
    res.status(200).json(response);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get for menuitems
router.get('/', async (req, res) => {
  try {

    const data = await MenuItem.find();
    console.log("MenuItem data saved");
    res.status(200).json(data);

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ response: 'internal server error' });

  }
});

//For //menu/sweet or /menu/sour don't create endpts for all use below method :worktype variable 
router.get('/:tasteType', async (req, res) => {
  try {
    //fetch worktype parameter
    const tasteType = req.params.tasteType;//Extract each tastetype
    if (tasteType === 'sweet' || tasteType === 'spicy' || tasteType === 'sour') {

      const response = await MenuItem.find({ taste: tasteType });
      console.log("taste ResponseFetched");
      res.status(200).json(response);
    }
    else {
      res.status(404).json({ error: 'invalid workType' });
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ response: 'internal server error' });

  }
});


//creating routes for update-put method

router.put('/:id',async (req,res)=>{
  try{
    const MenuId = req.params.id; // Extract id from url parameter
    const updatedMenuData = req.body;//updated data for person
    
    const response = await MenuItem.findByIdAndUpdate(MenuId , updatedMenuData,{
      new : true, //Return updated document
      runValidators : true //Run mongoose validation
    });

    if(!response){
      return res.status(404).json({error:'Menu not found'});
    }

    console.log("Menu Data updated");
    res.status(200).json(response);
  }
  catch(err)
  {
    console.log(err)
    res.status(500).json({error:'Internal server error'});
  }
});


//delete method
router.delete('/:id',async (req,res)=>{
  try{
    const MenuId = req.params.id;//Extract id from url parameters

    const response = await MenuItem.findByIdAndDelete(MenuId);

    if(!response){
      return res.status(404).json({error:'Menu not found'});
    }
    console.log("Data Deleted");
    res.status(200).json({message:'Menu Deleted Successfully'});
  }
  catch(err)
  {
    console.log(err);
    res.status(500).json({response:'Internal server error'});
  }
});

module.exports = router;