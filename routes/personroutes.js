const express = require('express');
const router = express.Router();
const person = require("./../models/person");

//postv Route to add person
router.post('/', async (req, res) => {

  try {
    const data = req.body //stored data in data
    //create new person document using mongoose
    const newperson = new person(data);

    const response = await newperson.save();
    console.log('data saved');
    res.status(200).json(response);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
  //Async await instead of callback: use of try catch
});

router.get('/', async (req, res) => {

  try {
    const data = await person.find();
    console.log("Person data saved");
    res.status(200).json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//For //person/waiter or /person/chef don't create endpts for all use below method :worktype variable 
router.get('/:workType', async (req, res) => {
  try {
    //fetch worktype parameter
    const workType = req.params.workType;//Extract each worktype
    if (workType === 'chef' || workType === 'waiter' || workType === 'manager') {

      const response = await person.find({ work: workType });
      console.log("Work ResponseFetched");
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
    const personId = req.params.id; // Extract id from url parameter
    const updatedPersonData = req.body;//updated data for person
    
    const response = await person.findByIdAndUpdate(personId , updatedPersonData,{
      new : true, //Return updated document
      runValidators : true //Run mongoose validation
    });

    if(!response){
      return res.status(404).json({error:'Person not found'});
    }

    console.log("Data updated");
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
    const personId = req.params.id;//Extract id from url parameters

    const response = await person.findByIdAndDelete(personId);

    if(!response){
      return res.status(404).json({error:'Person not found'});
    }
    console.log("Data Deleted");
    res.status(200).json({message:'Person Deleted Successfully'});
  }
  catch(err)
  {
    console.log(err);
    res.status(500).json({response:'Internal server error'});
  }
});

//export router
module.exports = router;
