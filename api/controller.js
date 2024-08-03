import User from "./model/User.js";
import haversine from "haversine-distance";

export const getUsersWithinRadius = async (req, res) => {
  const { latitude, longitude, page = 1, limit = 10 } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Missing latitude or longitude" });
  }

  const userLocation = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  };
  console.log("Received coordinates:", userLocation);

  try {
    const users = await User.find();
    console.log("Users fetched from database:", users);

    const usersWithinRadius = users
      .map((user) => {
        const userCoord = {
          latitude: user.latitude,
          longitude: user.longitude,
        };
        const distanceInMeters = haversine(userLocation, userCoord);
        const distanceInKm = (distanceInMeters / 1000).toFixed(2); // Convert to kilometers and format to 2 decimal places
        return {
          ...user.toObject(),
          distance: parseFloat(distanceInKm),
        };
      })
      .filter((user) => user.distance <= 10); // 10 kilometers

    usersWithinRadius.sort((a, b) => a.distance - b.distance);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedResults = usersWithinRadius.slice(startIndex, endIndex);

    console.log("Paginated results:", paginatedResults);
    res.json(paginatedResults);
  } catch (err) {
    console.error("Error while fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = req.body;
    const savedUser = await User.create(user);
    res.json(savedUser);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};
