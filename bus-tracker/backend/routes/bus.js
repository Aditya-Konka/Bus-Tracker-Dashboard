const express = require("express");
const router = express.Router();
const Bus = require("../models/Bus");
const jwt = require("jsonwebtoken");

// Middleware for role check
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ msg: "Forbidden: Admins only" });
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Invalid token" });
    }
  };
};

// Add new bus (Admin only)
router.post("/add", authMiddleware(["admin"]), async (req, res) => {
  try {
    const { busNumber, route, timing, seats } = req.body;
    const newBus = new Bus({ busNumber, route, timing, seats });
    await newBus.save();
    res.json({ msg: "Bus added successfully", bus: newBus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all buses (Students & Admins)
router.get("/", async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Filter buses by route or timing
router.get("/search", async (req, res) => {
  try {
    const { route, timing } = req.query;
    let query = {};
    if (route) query.route = { $regex: route, $options: "i" };
    if (timing) query.timing = timing;

    const buses = await Bus.find(query);
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Book a seat
router.post("/book/:id", authMiddleware(["student"]), async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ msg: "Bus not found" });

    if (bus.seats > 0) {
      bus.seats -= 1;
      await bus.save();
      res.json({ msg: "Seat booked successfully", bus });
    } else {
      res.status(400).json({ msg: "No seats available" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
