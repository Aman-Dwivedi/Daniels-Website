const mongoose = require('mongoose');
const Project = require('../models/Project');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/daniels-website');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const sampleProjects = [
  {
    title: "West Virginia Processing Plant",
    image: "/placeholder.svg?height=300&width=500&text=WV+Processing+Plant",
    isActive: true
  },
  {
    title: "Queensland Coal Preparation Plant",
    image: "/placeholder.svg?height=300&width=500&text=Queensland+Plant",
    isActive: true
  },
  {
    title: "Johannesburg Processing Complex",
    image: "/placeholder.svg?height=300&width=500&text=Johannesburg+Complex",
    isActive: true
  },
  {
    title: "Pennsylvania Plant Modernization",
    image: "/placeholder.svg?height=300&width=500&text=Pennsylvania+Plant",
    isActive: true
  },
  {
    title: "Indonesian Coal Processing Hub",
    image: "/placeholder.svg?height=300&width=500&text=Indonesian+Hub",
    isActive: true
  },
  {
    title: "Colombian Export Facility",
    image: "/placeholder.svg?height=300&width=500&text=Colombian+Facility",
    isActive: true
  }
];

const populateProjects = async () => {
  try {
    await connectDB();
    
    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');
    
    // Insert sample projects
    const insertedProjects = await Project.insertMany(sampleProjects);
    console.log(`Successfully inserted ${insertedProjects.length} projects`);
    
    console.log('Projects populated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error populating projects:', error);
    process.exit(1);
  }
};

populateProjects(); 