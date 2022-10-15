const stages = require("express").Router();
const db = require("../models");
const { Stage, Event } = db;
const { Op } = require('sequelize');

stages.get("/", async (req, res) => {
  try {
    const searchTerm = req.query.name ? req.query.name: "";
    const foundStages = await Stage.findAll({
        order: [
            ['name', 'ASC'],
        ],
        where: {
            name:{
                [Op.iLike]: `%${searchTerm}%`
            }
        }
    });
    res.status(200).json(foundStages);
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }
});

stages.get('/:name', async (req, res)=> {
    try {
            const foundStage = await Stage.findOne({
                where:{
                    name: req.params.name
                },
                include:{
                    model: Event,
                    as: 'events',
                    through: { attributes: [] }
                },
                order: [
                    [ { model: Event, as: 'events' }, 'date', 'ASC'],
                ]
            })
            res.status(200).json(foundStage)
    } catch(error) {
        res.status(500).json(error)
    }
});

stages.post('/', async(req, res)=> {
    try{  const newStage = await Stage.create(req.body);
        res.status(200).json({
            message: 'Successfully created new stage',
            data: newStage
        })
    }
    catch(error){
        res.status(500).json(error);
    }
});

stages.put('/', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        });
        res.status(200).json({
            mesage: `Successfully updated ${updatedStages} stage(s)`
        });
    } catch(error){
        res.status(500).json(error);
    }
});

stages.delete('/', async (req, res)=> {
    try {
        const deletedStage = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        });
        res.status(200).json({
            message: `Successfully deleted ${deletedStage} stages(s)`
        })
    } 
    catch(error) {
        res.status(500).json(error);
    }
})
module.exports = stages;