const mongoose = require('mongoose');
require('dotenv').config();
const News = require('../models/News');

const newsData = [
  {
    title: "New Processing Plant Opens in West Virginia",
    excerpt: "Our latest facility incorporates cutting-edge technology to improve efficiency and reduce environmental impact.",
    date: "December 15, 2024",
    image: "/images/Daniels.jpg",
    fullContent: "The Daniels Company is proud to announce the opening of our state-of-the-art coal processing facility in West Virginia. This $50 million investment represents our commitment to advancing coal processing technology while maintaining the highest environmental standards. The new plant features advanced separation technologies, automated quality control systems, and comprehensive environmental monitoring equipment. With a processing capacity of 2 million tons annually, this facility will serve as a model for sustainable coal processing operations. The plant incorporates innovative water recycling systems that reduce water consumption by 40% compared to traditional facilities, and advanced dust control systems that exceed EPA requirements. Our team of experienced engineers and technicians have worked tirelessly to ensure this facility represents the future of responsible coal processing."
  },
  {
    title: "Partnership with Clean Energy Initiative",
    excerpt: "The Daniels Company joins forces with leading environmental organizations to develop cleaner processing methods.",
    date: "November 28, 2024",
    image: "/images/penguin.jpg",
    fullContent: "In a groundbreaking collaboration, The Daniels Company has partnered with the Clean Energy Research Institute to develop next-generation coal processing technologies that significantly reduce environmental impact. This three-year partnership will focus on developing innovative methods for carbon capture during the processing phase, advanced waste reduction techniques, and the integration of renewable energy sources into processing operations. The initiative aims to reduce carbon emissions from coal processing by up to 35% while maintaining operational efficiency. Dr. Sarah Chen, lead researcher at the Clean Energy Research Institute, stated: 'This partnership represents a crucial step toward making coal processing more sustainable. The Daniels Company's commitment to innovation and environmental responsibility makes them an ideal partner for this important work.' The collaboration will also explore opportunities for converting processing waste into useful byproducts, further reducing the environmental footprint of coal processing operations."
  },
  {
    title: "Industry Recognition for Safety Excellence",
    excerpt: "Awarded the National Safety Council's highest honor for our commitment to workplace safety.",
    date: "November 10, 2024",
    image: "/images/news3.jpg",
    fullContent: "The Daniels Company has been awarded the prestigious Robert W. Campbell Award by the National Safety Council, recognizing our outstanding commitment to workplace safety and health. This award is given annually to organizations that demonstrate excellence in safety performance, innovative safety programs, and leadership in occupational safety and health. Over the past five years, The Daniels Company has achieved a 95% reduction in workplace incidents through comprehensive safety training programs, advanced safety equipment, and a culture that prioritizes employee wellbeing above all else. Our safety program includes monthly safety training sessions, regular equipment inspections, emergency response drills, and a peer-to-peer safety monitoring system. CEO John Daniels commented: 'This award reflects the dedication of every member of our team to maintaining the highest safety standards. Our employees are our most valuable asset, and their safety will always be our top priority.' The company has also implemented cutting-edge safety technologies, including real-time air quality monitoring, automated emergency shutdown systems, and wearable safety devices that alert workers to potential hazards."
  },
  {
    title: "Expansion into International Markets",
    excerpt: "New contracts secured in Australia and South Africa, marking our global expansion milestone.",
    date: "October 22, 2024",
    image: "/images/news4.jpg",
    fullContent: "The Daniels Company has successfully secured major contracts in Australia and South Africa, marking a significant milestone in our global expansion strategy. These contracts, valued at over $75 million combined, will see us providing comprehensive coal processing solutions to leading mining companies in both regions. In Australia, we will be working with Meridian Mining to upgrade their processing facilities in Queensland, implementing our latest separation technologies and automated systems. The South African project involves a partnership with Johannesburg Coal Corp to develop a new processing plant that will serve multiple mining operations in the region. These international expansions represent more than just business growth – they demonstrate the global recognition of our expertise and technology. Our international team, led by Director of Global Operations Sarah Mitchell, has spent the past two years building relationships and understanding the unique challenges of these markets. The projects will create over 200 jobs across both regions and establish The Daniels Company as a truly global leader in coal processing solutions. We expect these operations to be fully operational by mid-2025, with additional expansion opportunities already being explored in Indonesia and Colombia."
  }
];

async function populateNews() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/daniels');
    console.log('Connected to MongoDB');

    // Clear existing news
    await News.deleteMany({});
    console.log('Cleared existing news data');

    // Insert new news data
    const insertedNews = await News.insertMany(newsData);
    console.log(`Successfully inserted ${insertedNews.length} news articles`);

    console.log('News data populated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error populating news data:', error);
    process.exit(1);
  }
}

populateNews(); 