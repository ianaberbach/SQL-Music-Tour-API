const events = require("express").Router();
const db = require("../models");
const { Event, MeetGreet, SetTime, Stage, Band } = db;
const { Op } = require('sequelize');

events.get("/", async (req, res) => {
  try {
    const searchTerm = req.query.name ? req.query.name: "";
    const foundEvents = await Event.findAll({
        order: [
            ['date', 'ASC'],
        ],
        where: {
            name:{
                [Op.iLike]: `%${searchTerm}%`
            }
        }
    });
    res.status(200).json(foundEvents);
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }
});

events.get('/:name', async (req, res)=> {
    try {
            const foundEvent = await Event.findOne({
                where:{
                    name: req.params.name
                },
                include: [
                    {
                        model: MeetGreet,
                        as: 'meet_greets',
                        attributes: { exclude: ['event_id', 'band_id'] },
                        include: {
                            model: Band,
                            as: 'band',
                        }
                    },
                    {
                        model: SetTime,
                        as: 'set_times',
                        attributes: { exclude: ['event_id', 'stage_id', 'band_id'] },
                        include: [
                            { model: Band, as: 'band' },
                            { model: Stage, as: 'stage' }
                        ]
                    },
                    {
                        model: Stage,
                        as: 'stages',
                        through: { attributes: [] }
                    }
                ]
            })
            res.status(200).json(foundEvent)
    } catch(error) {
        res.status(500).json(error)
    }
});

events.post('/', async(req, res)=> {
    try{  const newEvent = await Event.create(req.body);
        res.status(200).json({
            message: 'Successfully created new event',
            data: newEvent
        })
    }
    catch(error){
        res.status(500).json(error);
    }
});

events.put('/', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        });
        res.status(200).json({
            mesage: `Successfully updated ${updatedEvents} events(s)`
        });
    } catch(error){
        res.status(500).json(error);
    }
});

events.delete('/', async (req, res)=> {
    try {
        const deletedEvent = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        });
        res.status(200).json({
            message: `Successfully deleted ${deletedEvent} events(s)`
        })
    } 
    catch(error) {
        res.status(500).json(error);
    }
})
module.exports = events;