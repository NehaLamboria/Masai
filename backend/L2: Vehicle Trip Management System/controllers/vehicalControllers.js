const Vehicle = require('../models/Vehicle');

// A. Vehicle CRUD Operations

// Create a new vehicle
exports.createVehicle = async (req, res, next) => {
  try {
    const { registrationNumber, type, model, isActive } = req.body;
    const vehicle = new Vehicle({ registrationNumber, type, model, isActive });
    await vehicle.save();
    res.status(201).json({ message: 'Vehicle created', vehicle });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Registration number must be unique' });
    }
    next(err);
  }
};

// Get all vehicles
exports.getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

// Update a vehicle's information by ID
exports.updateVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const vehicle = await Vehicle.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    res.json({ message: 'Vehicle updated', vehicle });
  } catch (err) {
    next(err);
  }
};

// Delete a vehicle by ID
exports.deleteVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    next(err);
  }
};

// B. Trip Operations

// Add a new trip to a vehicle
exports.addTrip = async (req, res, next) => {
  try {
    const { id } = req.params;
    const trip = req.body;

    if (trip.distance <= 0) {
      return res.status(400).json({ message: 'Distance must be greater than 0' });
    }

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    vehicle.trips.push(trip);
    await vehicle.save();
    res.status(201).json({ message: 'Trip added', trips: vehicle.trips });
  } catch (err) {
    next(err);
  }
};

// Update a trip by trip _id
exports.updateTrip = async (req, res, next) => {
  try {
    const { id, tripId } = req.params;
    const updates = req.body;

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    const trip = vehicle.trips.id(tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    Object.assign(trip, updates);

    // Validate distance if updated
    if (updates.distance !== undefined && updates.distance <= 0) {
      return res.status(400).json({ message: 'Distance must be greater than 0' });
    }

    await vehicle.save();
    res.json({ message: 'Trip updated', trip });
  } catch (err) {
    next(err);
  }
};

// Delete a trip by trip _id
exports.deleteTrip = async (req, res, next) => {
  try {
    const { id, tripId } = req.params;

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    const trip = vehicle.trips.id(tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    trip.remove();
    await vehicle.save();

    res.json({ message: 'Trip deleted' });
  } catch (err) {
    next(err);
  }
};

// Queries Beyond CRUD

// Get all vehicles with any trip longer than 200 km
exports.getVehiclesWithLongTrips = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ 'trips.distance': { $gt: 200 } });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

// Find vehicles with at least one trip starting from Delhi, Mumbai, or Bangalore
exports.getVehiclesByStartLocations = async (req, res, next) => {
  try {
    const locations = ['Delhi', 'Mumbai', 'Bangalore'];
    const vehicles = await Vehicle.find({ 'trips.startLocation': { $in: locations } });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

// Get vehicles with trips starting after Jan 1, 2024
exports.getVehiclesByTripStartDate = async (req, res, next) => {
  try {
    const date = new Date('2024-01-01');
    const vehicles = await Vehicle.find({ 'trips.startTime': { $gte: date } });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

// Find all car or truck type vehicles
exports.getCarOrTruckVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ type: { $in: ['car', 'truck'] } });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};
