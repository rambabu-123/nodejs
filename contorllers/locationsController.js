const State = require('../location_models/state');
const District = require('../location_models/district');
const Mandal = require('../location_models/mandal');

// INSERT STATE
exports.createState = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({
        message: 'State name and code are required'
      });
    }

    // prevent duplicate state
    const existing = await State.findOne({ name });
    if (existing) {
      return res.status(409).json({
        message: 'State already exists'
      });
    }

    const state = await State.create({
      name,
      code
    });

    res.status(201).json({
      message: 'State created successfully',
      data: state
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error creating state',
      error: error.message
    });
  }
};


// GET STATES
exports.getStates = async (req, res) => {
  try {
    const states = await State.find(
      {},
      { _id: 0, code: 1, name: 1 }
    )
    .sort({ name: 1 })
    .lean();

    res.json(states);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load states' });
  }
};

// GET DISTRICTS BY STATE
exports.getDistrictsByState = async (req, res) => {
  try {
    const districts = await District.find(
      { stateCode: req.params.stateCode },
      { _id: 0, code: 1, name: 1 }
    )
    .sort({ name: 1 })
    .lean();

    res.json(districts);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load districts' });
  }
};

// GET MANDALS BY DISTRICT
exports.getMandalsByDistrict = async (req, res) => {
  try {
    const mandals = await Mandal.find(
      { districtCode: req.params.districtCode },
      { _id: 0, code: 1, name: 1 }
    )
    .sort({ name: 1 })
    .lean();

    res.json(mandals);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load mandals' });
  }
};


// BULK INSERT STATES
exports.bulkCreateStates = async (req, res) => {
  try {
    const states = req.body;

    if (!Array.isArray(states) || states.length === 0) {
      return res.status(400).json({
        message: 'Request body must be a non-empty array'
      });
    }

    // Insert many (skip duplicates)
    const result = await State.insertMany(states, {
      ordered: false   // continue even if duplicates exist
    });

    res.status(201).json({
      message: 'States inserted successfully',
      insertedCount: result.length,
      data: result
    });

  } catch (error) {
    // Duplicate key error handling
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Some states already exist (duplicates skipped)',
        error: error.message
      });
    }

    res.status(500).json({
      message: 'Bulk insert failed',
      error: error.message
    });
  }
};

exports.bulkCreateDistricts = async (req, res) => {
  try {
    const districts = req.body;

    if (!Array.isArray(districts) || districts.length === 0) {
      return res.status(400).json({
        message: 'Request body must be an array'
      });
    }

    const invalid = districts.find(
      d => !d.code || !d.name || !d.stateCode
    );

    if (invalid) {
      return res.status(400).json({
        message: 'Each district must contain code, name, and stateCode'
      });
    }

    const result = await District.insertMany(districts, {
      ordered: false
    });

    res.status(201).json({
      message: 'Districts inserted successfully',
      insertedCount: result.length
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'Duplicate district codes found (skipped)'
      });
    }

    res.status(500).json({
      message: 'Bulk district insert failed',
      error: err.message
    });
  }
};


// BULK INSERT MANDALS
exports.bulkCreateMandals = async (req, res) => {
  try {
    const mandals = req.body;

    if (!Array.isArray(mandals) || mandals.length === 0) {
      return res.status(400).json({
        message: 'Request body must be a non-empty array'
      });
    }

    // basic validation
    const invalid = mandals.find(
      m => !m.code || !m.name || !m.districtCode
    );

    if (invalid) {
      return res.status(400).json({
        message: 'Each mandal must have code, name, and districtCode'
      });
    }

    const result = await Mandal.insertMany(mandals, {
      ordered: false // continue even if duplicates exist
    });

    res.status(201).json({
      message: 'Mandals inserted successfully',
      insertedCount: result.length
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Duplicate mandal codes found (some skipped)'
      });
    }

    res.status(500).json({
      message: 'Bulk mandal insert failed',
      error: error.message
    });
  }
};


exports.getLocationHierarchy = async (req, res) => {
  try {
    const states = await State.find({}, { _id: 0, code: 1, name: 1 }).lean();

    const districts = await District.find(
      {},
      { _id: 0, code: 1, name: 1, stateCode: 1 }
    ).lean();

    const mandals = await Mandal.find(
      {},
      { _id: 0, code: 1, name: 1, districtCode: 1 }
    ).lean();

    // map districts by state
    const districtMap = {};
    districts.forEach(d => {
      if (!districtMap[d.stateCode]) districtMap[d.stateCode] = [];
      districtMap[d.stateCode].push({ ...d, mandals: [] });
    });

    // map mandals by district
    const mandalMap = {};
    mandals.forEach(m => {
      if (!mandalMap[m.districtCode]) mandalMap[m.districtCode] = [];
      mandalMap[m.districtCode].push({
        code: m.code,
        name: m.name
      });
    });

    // attach mandals → districts
    Object.values(districtMap).flat().forEach(d => {
      d.mandals = mandalMap[d.code] || [];
      delete d.stateCode;
    });

    // attach districts → states
    const result = states.map(s => ({
      code: s.code,
      name: s.name,
      districts: districtMap[s.code] || []
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load location hierarchy' });
  }
};
