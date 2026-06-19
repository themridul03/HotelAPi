/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

// internal import
const HotelModel = require('../models/hotelModel');
const RoomModel = require('../models/roomModel');

// Create Hotel
const createHotel = async (req, res) => {
    try {
        const newHotel = new HotelModel(req.body);
        const savedHotel = await newHotel.save();

        res.status(200).json({
            message: savedHotel,
        });
    } catch (error) {
        res.status(500).json({
            error: `Hotel not created! ${error.message}`,
        });
    }
};

// Update Hotel
const updateHotel = async (req, res) => {
    try {
        const updHotel = await HotelModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            message: updHotel,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Hotel not updated!',
        });
    }
};

// Delete Hotel
const deleteHotel = async (req, res) => {
    try {
        await HotelModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Hotel deleted successfully.',
        });
    } catch (error) {
        res.status(500).json({
            error: 'Hotel not deleted!',
        });
    }
};

// Get One Hotel
const getOneHotel = async (req, res) => {
    try {
        const hotel = await HotelModel.findById(req.params.id);

        if (!hotel) {
            return res.status(404).json({
                error: 'Hotel not found!!',
            });
        }

        res.status(200).json({
            message: hotel,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Hotel not found!!',
        });
    }
};

// Get All Hotels
const getAllHotel = async (req, res) => {
    const { min, max, ...others } = req.query;

    try {
        let query = { ...others };

        // Apply price filter only if min or max exists
        if (min || max) {
            query.price = {
                $gt: min || 1,
                $lt: max || 10000,
            };
        }

        const hotels = await HotelModel.find(query).limit(req.query.limit || 0);

        if (!hotels || hotels.length === 0) {
            return res.status(404).json({
                error: 'Hotels not found!!',
            });
        }

        res.status(200).json({
            message: hotels,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Hotels not found!!',
        });
    }
};

// Get Hotels By City
const getHotelByCity = async (req, res) => {
    try {
        const cities = req.query.cities.split(',');

        const list = await Promise.all(
            cities.map((city) => HotelModel.countDocuments({ city }))
        );

        res.status(200).json({
            message: list,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Can not found hotel by cityname!',
        });
    }
};

// Get Hotels By Type
const getHotelByType = async (req, res) => {
    try {
        const apartmentCount = await HotelModel.countDocuments({ type: 'apartment' });
        const hotelCount = await HotelModel.countDocuments({ type: 'hotel' });
        const resortCount = await HotelModel.countDocuments({ type: 'resort' });
        const villaCount = await HotelModel.countDocuments({ type: 'villa' });
        const cabinCount = await HotelModel.countDocuments({ type: 'cabin' });

        res.status(200).json({
            message: [
                { type: 'apartments', count: apartmentCount },
                { type: 'hotels', count: hotelCount },
                { type: 'resorts', count: resortCount },
                { type: 'villas', count: villaCount },
                { type: 'cabins', count: cabinCount },
            ],
        });
    } catch (error) {
        res.status(500).json({
            error: 'Can not found hotel by hotel type!',
        });
    }
};

// Get Hotel Rooms
const getHotelRooms = async (req, res) => {
    try {
        const hotel = await HotelModel.findById(req.params.id);

        if (!hotel) {
            return res.status(404).json({
                error: 'Hotel not found!',
            });
        }

        const lists = await Promise.all(
            hotel.rooms.map((room) => RoomModel.findById(room))
        );

        res.status(200).json({
            message: lists,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Can not found rooms on this hotel!',
        });
    }
};

module.exports = {
    createHotel,
    updateHotel,
    deleteHotel,
    getOneHotel,
    getAllHotel,
    getHotelByCity,
    getHotelByType,
    getHotelRooms,
};