const express = require('express');
const router  = express.Router();
const members = require('../../Members')
const uuid = require('uuid');


// gets All members
router.get('/', (req,res)=>{
    console.log('GET  is called by the form?');
    res.json(members);
});
 
// get Single member
router.get('/:id', (req,res)=>{
    //res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else{
        res.status(400).json({msg: `No member with the id ${req.params.id}`});
    }
    
}); 

//POST
router.post('/', (req, res)=>{
    console.log('POST  is called by the form?');
    //res.send(req.body);
    
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active"
    };

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg: "Please include a valid name and email"})
    }
    members.push(newMember)
    res.json(members);
});

//UPDATE
router.put('/:id', (req,res)=>{
    console.log('PUT  is called by the form?');
    //res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        const updMember = req.body;
         members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name? updMember.name: member.name;
                member.email = updMember.email? updMember.email: member.email;
                res.json({msg: "member updated", member});
            }
         });
    }
    else{
        res.status(400).json({msg: `No member with the id ${req.params.id}`});
    }
});


//DELETE
router.delete('/:id', (req,res)=>{
    //res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json({msg: "member deleted", members: members.filter(member => member.id !== parseInt(req.params.id))});
    }
    else{
        res.status(400).json({msg: `No member with the id ${req.params.id}`});
    }
    
}); 

module.exports = router;