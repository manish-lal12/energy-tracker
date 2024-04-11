const express = require('express');
const EnergyData = require('../models/model')

//Get all Energy Consumption Data
const getAllData = async(req, res) => {
    try {
        const user = await EnergyData.find({})
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

//Get single Energy Consumption Data
const getData = async(req, res) => {
    try {
        const {id: consumerID} = req.params
        const user = await EnergyData.findOne({ _id: consumerID})

        if(!user) {
           return res.status(404).send(`No user with ID: ${consumerID} exists`)
        }

        res.status(200).json({ user })
    } catch(error) {
        res.status(500).json({msg: error})
    }
}

//Create new user
const createUser = async(req, res) => {
    try {
        const data = await EnergyData.create(req.body)
        res.status(201).json({ data })
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

//Update User Details
const updateUser = async (req, res) => {
    try {
        const {id: consumerID} = req.params
        const user = await EnergyData.findOneAndUpdate({_id: consumerID}, req.body, {
            new: true,
            runValidators: true
        })

        if(!user) {
            return res.status(404).send(`No User with id: ${consumerID} exists`)
        }
        
        res.status(200).json({ user }) 
    } catch(error) {
        res.status(500).json({ msg: error })
    }
}

//Delete User
const deleteUser = async (req, res) => {
    try {
        const {id: consumerID} = req.params
        const data = await EnergyData.findOneAndDelete({_id: consumerID})

        res.status(200).send(`User with id: ${consumerID} deleted`)
    } catch (error) {
        res.status(500).json ({ msg: error})
    }
}



module.exports = {
    getAllData,
    getData,
    createUser,
    updateUser,
    deleteUser
}