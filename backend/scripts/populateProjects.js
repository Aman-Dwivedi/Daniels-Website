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
    location: "Charleston, WV, USA",
    year: "2024",
    capacity: "2.5M tons/year",
    description: "Complete turn-key coal processing facility featuring advanced separation technology and environmental controls.",
    detailedDescription: "This state-of-the-art coal processing facility represents a significant advancement in sustainable mining operations. Located in the heart of West Virginia's coal country, the plant utilizes cutting-edge dense medium separation technology to achieve exceptional product quality while minimizing environmental impact. The facility features a fully automated control system that monitors every aspect of the processing operation in real-time, ensuring optimal efficiency and product consistency. Environmental sustainability was a core focus, with the implementation of a zero liquid discharge system and advanced water recycling technologies that reduce consumption by 40%. The plant also incorporates advanced dust suppression systems and noise reduction measures to minimize impact on surrounding communities. With a design capacity of 2.5 million tons per year, this facility serves as a model for modern, responsible coal processing operations.",
    image: "/placeholder.svg?height=300&width=500&text=WV+Processing+Plant",
    highlights: [
      "Advanced dense medium separation",
      "Automated quality control systems",
      "40% water consumption reduction",
      "Zero liquid discharge system"
    ],
    isActive: true
  },
  {
    title: "Queensland Coal Preparation Plant",
    location: "Queensland, Australia",
    year: "2023",
    capacity: "3.2M tons/year",
    description: "Major upgrade and expansion of existing coal preparation facility with state-of-the-art equipment.",
    detailedDescription: "The Queensland Coal Preparation Plant upgrade project transformed an aging facility into a world-class operation capable of processing premium metallurgical coal for export markets. This comprehensive modernization involved the installation of advanced spiral separators and high-efficiency screening systems that significantly improved product quality and recovery rates. The project included the construction of new raw coal handling systems, upgraded electrical and instrumentation systems, and modern control room facilities. Environmental considerations were paramount, with new water treatment systems and dust collection equipment installed throughout the facility. The upgraded plant now produces multiple coal products tailored to specific customer requirements, with improved ash and sulfur content specifications. The project was completed on schedule despite challenging weather conditions and achieved a 25% increase in overall plant efficiency while maintaining the highest safety standards.",
    image: "/placeholder.svg?height=300&width=500&text=Queensland+Plant",
    highlights: [
      "Spiral separator installation",
      "New screening systems",
      "Improved product quality",
      "25% efficiency increase"
    ],
    isActive: true
  },
  {
    title: "Johannesburg Processing Complex",
    location: "Johannesburg, South Africa",
    year: "2023",
    capacity: "1.8M tons/year",
    description: "New coal processing complex serving multiple mining operations in the region.",
    detailedDescription: "The Johannesburg Processing Complex represents a strategic approach to coal processing in the Witwatersrand region, designed to serve multiple small to medium-sized mining operations through a centralized processing hub. This innovative facility features modular plant design that allows for flexible processing of varying coal qualities and specifications. The complex includes sophisticated blending capabilities that enable the production of consistent quality products from diverse feed sources. Advanced automation systems provide centralized control and monitoring of all plant operations, with real-time data integration from multiple feed points. The facility incorporates rapid deployment construction techniques that minimized installation time and reduced overall project costs. Environmental management systems include comprehensive dust control, water recycling, and noise mitigation measures. The complex has significantly improved the economic viability of smaller mining operations in the region by providing access to world-class processing technology and expertise.",
    image: "/placeholder.svg?height=300&width=500&text=Johannesburg+Complex",
    highlights: [
      "Multi-feed processing capability",
      "Centralized control systems",
      "Modular plant design",
      "Rapid deployment construction"
    ],
    isActive: true
  },
  {
    title: "Pennsylvania Plant Modernization",
    location: "Pittsburgh, PA, USA",
    year: "2022",
    capacity: "1.5M tons/year",
    description: "Complete modernization of legacy coal processing facility with cutting-edge technology.",
    detailedDescription: "The Pennsylvania Plant Modernization project breathed new life into a legacy coal processing facility that had been operating since the 1970s. This comprehensive upgrade involved the complete replacement of outdated processing equipment with modern, efficient systems while maintaining continuous plant operation throughout most of the construction period. The centerpiece of the modernization was the installation of advanced flotation circuits that dramatically improved fine coal recovery and product quality. New digital monitoring and control systems provide unprecedented visibility into plant performance, enabling optimized operation and predictive maintenance capabilities. The project included extensive environmental upgrades to ensure full compliance with current regulations, including new water treatment systems, enhanced dust collection, and improved noise control measures. Worker safety was enhanced through the installation of modern safety systems and the redesign of plant layouts to eliminate hazardous conditions. The modernized facility now operates at peak efficiency while meeting the strictest environmental and safety standards.",
    image: "/placeholder.svg?height=300&width=500&text=Pennsylvania+Plant",
    highlights: [
      "Legacy system upgrade",
      "New flotation circuits",
      "Digital monitoring systems",
      "Environmental compliance"
    ],
    isActive: true
  },
  {
    title: "Indonesian Coal Processing Hub",
    location: "Kalimantan, Indonesia",
    year: "2022",
    capacity: "4.0M tons/year",
    description: "Large-scale coal processing hub designed to serve multiple mining concessions.",
    detailedDescription: "The Indonesian Coal Processing Hub stands as one of the largest and most sophisticated coal processing facilities in Southeast Asia. Located in the heart of Kalimantan's rich coal mining region, this massive facility was designed to process coal from multiple mining concessions across the island. The hub features high-capacity processing equipment capable of handling 4 million tons per year while maintaining exceptional product quality standards. Advanced logistics integration includes rail and conveyor connections to multiple mines, sophisticated coal blending systems, and direct connections to port facilities for efficient export operations. The facility incorporates sustainable design principles throughout, including renewable energy systems, advanced water management, and comprehensive environmental monitoring. Multi-product capability allows for the simultaneous production of thermal and metallurgical coal products tailored to specific market requirements. The project required extensive coordination with local communities and government agencies, resulting in significant local employment opportunities and infrastructure development. State-of-the-art safety systems and training programs ensure the highest standards of worker protection in this tropical operating environment.",
    image: "/placeholder.svg?height=300&width=500&text=Indonesian+Hub",
    highlights: [
      "High-capacity processing",
      "Multi-product capability",
      "Advanced logistics integration",
      "Sustainable design principles"
    ],
    isActive: true
  },
  {
    title: "Colombian Export Facility",
    location: "Cesar, Colombia",
    year: "2021",
    capacity: "2.8M tons/year",
    description: "Export-focused coal processing facility with port connectivity and quality optimization.",
    detailedDescription: "The Colombian Export Facility was specifically designed to serve the international thermal coal market, with particular focus on European and Asian customers requiring premium quality products. Located in the Cesar region, the facility benefits from direct connectivity to Colombia's major coal export infrastructure. The plant features sophisticated coal blending capabilities that allow for precise control of product specifications, ensuring consistent quality that meets the exact requirements of long-term supply contracts. Advanced quality assurance protocols include continuous online analyzers, automated sampling systems, and comprehensive laboratory testing facilities. The facility's design optimizes the entire export supply chain, from mine to ship, with covered storage facilities, automated loading systems, and dust suppression technology throughout. Environmental stewardship is demonstrated through comprehensive air quality monitoring, water recycling systems, and community engagement programs. The project included significant infrastructure development, including roads, power systems, and worker housing facilities. Training programs were implemented to develop local technical expertise and ensure sustainable long-term operations. The facility has become a benchmark for export coal operations in Latin America.",
    image: "/placeholder.svg?height=300&width=500&text=Colombian+Facility",
    highlights: [
      "Export quality optimization",
      "Port integration systems",
      "Blending capabilities",
      "Quality assurance protocols"
    ],
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