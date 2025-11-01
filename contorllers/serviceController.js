const Service = require('../models/service');
const crypto = require('crypto');

// Create new service
const createService = async (req, res) => {
    try {
        const productId = crypto.randomBytes(12).toString('hex');

        const serviceData = {
            ...req.body,
            productId,
            user: req.user ? req.user._id : null
        };

        const service = new Service(serviceData);
        await service.save();

        res.status(201).json({
            message: "Service created successfully",
            data: service
        });
    } catch (err) {
        res.status(400).json({
            message: 'Error creating service',
            error: err.message
        });
    }
};

// Get all services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get service by ID
const getServiceById = async (req, res) => {
    try {
    const id = req.params.id; // 👈 Correct way to read param
    const service = await Service.findOne({ $or: [{ _id: id }, { productId: id }] });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update service by ID
const updateServiceById = async (req, res) => {
   try {
    const id = req.params.id;
    const updatedService = await Service.findOneAndUpdate(
      { $or: [{ _id: id }, { productId: id }] },
      req.body,
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete service by ID
const deleteServiceById = async (req, res) => {
     try {
    const id = req.params.id;
    const deletedService = await Service.findOneAndDelete({
      $or: [{ _id: id }, { productId: id }],
    });

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      message: "Service deleted successfully",
      data: deletedService,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateServiceById,
  deleteServiceById
};
