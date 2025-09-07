const express = require('express');
const GlobalOffice = require('../models/GlobalOffice');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get all active offices
router.get('/', async (req, res) => {
  try {
    const offices = await GlobalOffice.findAll({
      where: { isActive: true },
      order: [['sortOrder', 'ASC']]
    });
    res.json(offices);
  } catch (error) {
    console.error('Error fetching offices:', error);
    res.status(500).json({ error: 'Failed to fetch offices' });
  }
});

// Create new office (Admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, address, phone, email, workingHours } = req.body;

    if (!title || !address || !phone || !email || !workingHours) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Get the next sort order
    const maxOrder = await GlobalOffice.max('sortOrder', {
      where: { isActive: true }
    });
    const sortOrder = (maxOrder || 0) + 1;

    const office = await GlobalOffice.create({
      title,
      address,
      phone,
      email,
      workingHours,
      sortOrder
    });

    res.json(office);
  } catch (error) {
    console.error('Error creating office:', error);
    res.status(500).json({ error: 'Failed to create office' });
  }
});

// Update office (Admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, address, phone, email, workingHours, sortOrder } = req.body;

    const office = await GlobalOffice.findByPk(id);
    if (!office) {
      return res.status(404).json({ error: 'Office not found' });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (address !== undefined) updateData.address = address;
    if (phone !== undefined) updateData.phone = phone;
    if (email !== undefined) updateData.email = email;
    if (workingHours !== undefined) updateData.workingHours = workingHours;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;

    await office.update(updateData);
    res.json(office);
  } catch (error) {
    console.error('Error updating office:', error);
    res.status(500).json({ error: 'Failed to update office' });
  }
});

// Delete office (Admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const office = await GlobalOffice.findByPk(id);
    if (!office) {
      return res.status(404).json({ error: 'Office not found' });
    }

    // Soft delete (set isActive to false)
    await office.update({ isActive: false });
    res.json({ message: 'Office deleted successfully' });
  } catch (error) {
    console.error('Error deleting office:', error);
    res.status(500).json({ error: 'Failed to delete office' });
  }
});

// Reorder offices (Admin only)
router.post('/reorder', authenticateToken, async (req, res) => {
  try {
    const { officeIds } = req.body; // Array of office IDs in desired order

    if (!Array.isArray(officeIds)) {
      return res.status(400).json({ error: 'officeIds must be an array' });
    }

    // Update sort order for each office
    const updatePromises = officeIds.map((officeId, index) => 
      GlobalOffice.update(
        { sortOrder: index + 1 },
        { where: { id: officeId, isActive: true } }
      )
    );

    await Promise.all(updatePromises);

    // Return updated offices
    const updatedOffices = await GlobalOffice.findAll({
      where: { isActive: true },
      order: [['sortOrder', 'ASC']]
    });

    res.json(updatedOffices);
  } catch (error) {
    console.error('Error reordering offices:', error);
    res.status(500).json({ error: 'Failed to reorder offices' });
  }
});

module.exports = router;