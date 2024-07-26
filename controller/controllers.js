import Role from "../models/role.js";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import usertab from "../models/user-table.js";

const router = express.Router();

// Create a new role
router.post('/roles', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Role name is required' });
  }

  try {
    const role = new Role({ name });
    await role.save();
    res.status(201).json({ message: 'Role created successfully', role });
  } catch (err) {
    res.status(500).json({ message: 'Error creating role', error: err.message });
  }
});

// --------------------------------------------------------------------role api ends------------------------------------------------------------------

// Create a new user with a role

router.post('/users/register', async (req, res) => {
  const { name, age, password,salary , roleName } = req.body;

  if (!name || !age || !password || !salary || !roleName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let role = await Role.findOne({ name: roleName });

    if (!role) {
      role = new Role({ name: roleName });
      await role.save();
    }


    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newUser = new usertab({
      name,
      age,
      password: hashedPassword,
      salary,
      role: role._id,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

// -------------------------------------------------------------------user Register api ends---------------------------------------------------------------

// Login API
router.post('/users/login', async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await usertab.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, "my_secret_key", { expiresIn: '1h' });

    res.json({ message: 'User login', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});
// -------------------------------------------------------------------user Login api ends---------------------------------------------------------------
// total user count
router.get('/users/count', async (req, res) => {
  try {
    const count = await usertab.countDocuments({});
    res.json({ count });
  } catch (err) {
    console.error('Error counting users:', err);
    res.status(500).json({ message: 'Error counting users', error: err.message });
  }
});

// -------------------------------------------------------------------user count api ends---------------------------------------------------------------
//fetch all user role only

router.get('/total-users', async (req, res) => {
  try {
      const UserRole = await Role.findOne({ name: 'user' });
      const count = await usertab.countDocuments({ role: UserRole._id });
      res.json({ count });
  } catch (error) {
      console.error('Error counting users:', error);
      res.status(500).json({ message: 'Error counting users', error: error.message });
  }
});
// -------------------------------------------------------------------user count by role api ends---------------------------------------------------------------
//fetch all Admin role only

router.get('/total-Admin', async (req, res) => {
  try {
      const Admin = await Role.findOne({ name: 'Admin' });
      const count = await usertab.countDocuments({ role: Admin._id });
      res.json({ count });
  } catch (error) {
      console.error('Error counting users:', error);
      res.status(500).json({ message: 'Error counting users', error: error.message });
  }
});
// ------------------------------------------------------------------Admin count by role api ends---------------------------------------------------------------
// total salary count
router.get('/users/sum', async (req, res) => {
  try {
    const result = await usertab.aggregate([
      { $group: { _id: null, totalSum: { $sum: "$salary" } } }
    ]);
    const totalSum = result.length > 0 ? result[0].totalSum : 0;
    res.json({ totalSum });
  } catch (err) {
    console.error('Error summing salaries:', err);
    res.status(500).json({ message: 'Error summing salaries', error: err.message });
  }
});

// -------------------------------------------------------------------salary sum api ends---------------------------------------------------------------
// minimum salary count
router.get('/salary/min', async (req, res) => {
  try {
      const minSalary = await usertab.findOne().sort({ salary: 1 }).select('salary');
      res.json({ minSalary: minSalary.salary });
  } catch (error) {
      res.status(500).send(error);
  }
});
// -------------------------------------------------------------------salary min api ends---------------------------------------------------------------
// maximum salary count
router.get('/salary/max', async (req, res) => {
  try {
      const maxSalary = await usertab.findOne().sort({ salary: -1 }).select('salary');
      res.json({ maxSalary: maxSalary.salary });
  } catch (error) {
      res.status(500).send(error);
  }
});
// -------------------------------------------------------------------salary max api ends---------------------------------------------------------------

export default router;
