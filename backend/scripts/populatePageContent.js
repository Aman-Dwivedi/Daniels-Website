const { sequelize } = require('../config/database');
const PageContent = require('../models/PageContent');
const BackgroundImage = require('../models/BackgroundImage');

const initialPageContent = [
  {
    pageKey: 'home',
    pageName: 'Home',
    description: 'Advanced coal processing technology and expertise delivering efficient, sustainable solutions for the energy industry.'
  },
  {
    pageKey: 'about',
    pageName: 'About',
    description: 'Leading the coal processing industry with innovation, expertise, and unwavering commitment to excellence since 1953.'
  },
  {
    pageKey: 'services',
    pageName: 'Services',
    description: 'Comprehensive coal processing solutions tailored to meet your specific operational requirements and goals.'
  },
  {
    pageKey: 'equipment',
    pageName: 'Equipment',
    description: 'State-of-the-art coal processing equipment designed for maximum efficiency and reliability.'
  },
  {
    pageKey: 'projects',
    pageName: 'Projects',
    description: 'Explore our portfolio of successful coal processing projects delivered across the globe, showcasing our expertise and innovation.'
  },
  {
    pageKey: 'contact',
    pageName: 'Contact',
    description: 'Ready to discuss your coal processing needs? Get in touch with our expert team today.'
  }
];

const initialBackgroundImages = [
  // Home page carousel images
  { pageKey: 'home', url: '/images/coal-mining-background.JPG', alt: 'Coal Mining Operations', sortOrder: 1 },
  { pageKey: 'home', url: '/images/services-background.JPG', alt: 'Our Services', sortOrder: 2 },
  { pageKey: 'home', url: '/images/project-background.jpg', alt: 'Projects', sortOrder: 3 },
  { pageKey: 'home', url: '/images/equipment-background.JPG', alt: 'Equipment Solutions', sortOrder: 4 },
  { pageKey: 'home', url: '/images/contact-background.JPG', alt: 'Contact Us', sortOrder: 5 },
  { pageKey: 'home', url: '/images/Daniels.jpg', alt: 'About Daniels', sortOrder: 6 },
  { pageKey: 'home', url: '/images/news3.jpg', alt: 'Industry News', sortOrder: 7 },
  { pageKey: 'home', url: '/images/news4.jpg', alt: 'Latest Updates', sortOrder: 8 },
  
  // Individual page backgrounds
  { pageKey: 'about', url: '/images/Daniels.jpg', alt: 'About Daniels', sortOrder: 1 },
  { pageKey: 'services', url: '/images/services-background.JPG', alt: 'Our Services', sortOrder: 1 },
  { pageKey: 'equipment', url: '/images/equipment-background.JPG', alt: 'Equipment Solutions', sortOrder: 1 },
  { pageKey: 'projects', url: '/images/project-background.jpg', alt: 'Projects', sortOrder: 1 },
  { pageKey: 'contact', url: '/images/contact-background.JPG', alt: 'Contact Us', sortOrder: 1 }
];

async function populatePageContent() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');

    // Ensure models are synced
    await sequelize.sync();

    // Populate page content
    for (const content of initialPageContent) {
      await PageContent.upsert(content);
      console.log(`✓ Page content for ${content.pageKey} created/updated`);
    }

    // Populate background images
    for (const image of initialBackgroundImages) {
      await BackgroundImage.upsert(image, {
        conflictFields: ['pageKey', 'url']
      });
      console.log(`✓ Background image for ${image.pageKey} created/updated`);
    }

    console.log('✅ Page content population completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error populating page content:', error);
    process.exit(1);
  }
}

populatePageContent();
