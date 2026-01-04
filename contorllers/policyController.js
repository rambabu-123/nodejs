const PolicyCreate = require('../models/registerpolicy');

/* =========================
   CREATE POLICY (USER BASED)
========================= */
const createPolicy = async (req, res) => {
  try {
    const policy = new PolicyCreate({
      ...req.body,
       userId: req.body.userId || req.body.user_id // 🔐 attach logged-in user
    });

    await policy.save();

    res.status(201).json({
      message: "Policy created successfully",
      policy
    });

  } catch (error) {
    console.error("Error creating policy:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET POLICY BY NUMBER (USER BASED)
========================= */
const getPolicy = async (req, res) => {
  try {
    const { policyNumber } = req.params;

    const policy = await PolicyCreate.findOne({ policyNumber });

    if (!policy) {
      return res.status(404).json({
        message: "Policy not found"
      });
    }

    res.status(200).json({
      message: "Policy fetched successfully",
      policy
    });

  } catch (error) {
    console.error("Error fetching policy:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   UPDATE POLICY (USER BASED)
========================= */
const updatePolicy = async (req, res) => {
  try {
    const { policyNumber } = req.params;

    const updatedPolicy = await PolicyCreate.findOneAndUpdate(
      {
        policyNumber,
        userId: req.body.userId || req.body.user_id
      },
      req.body,
      { new: true }
    );

    if (!updatedPolicy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.json({
      message: "Policy updated successfully",
      policy: updatedPolicy
    });

  } catch (error) {
    console.error("Error updating policy:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   DELETE POLICY (USER BASED)
========================= */
const deletePolicy = async (req, res) => {
  try {
    const { policyNumber } = req.params;

    // const deletedPolicy = await PolicyCreate.findOneAndDelete({
    //   policyNumber,
    //   userId: req.user.userId
    // });
     const deletedPolicy = await PolicyCreate.findOneAndDelete({ policyNumber });

    if (!deletedPolicy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.json({
      message: "Policy deleted successfully",
      policy: deletedPolicy
    });

  } catch (error) {
    console.error("Error deleting policy:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET ALL POLICIES (USER BASED)
========================= */
const getAllPolicies = async (req, res) => {
  try {
    // ✅ TAKE userId FROM QUERY (since no middleware)
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({
        message: "userId query parameter is required"
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const policies = await PolicyCreate.find({ userId })
      .skip(skip)
      .limit(limit);

    const total = await PolicyCreate.countDocuments({ userId });

    res.status(200).json({
      userId,
      page,
      limit,
      total,
      policies
    });

  } catch (error) {
    console.error("Error fetching policies:", error);
    res.status(500).json({ message: error.message });
  }
};

const searchPolicies = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "query parameter is required"
      });
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // 🔍 Search by policyNumber OR policyHolder.fullName
    const searchCondition = {
      $or: [
        { policyNumber: { $regex: query, $options: 'i' } },
        { 'policyHolder.fullName': { $regex: query, $options: 'i' } }
      ]
    };

    const policies = await PolicyCreate.find(searchCondition)
      .skip(skip)
      .limit(limitNum);

    const total = await PolicyCreate.countDocuments(searchCondition);

    res.status(200).json({
      query,
      page: pageNum,
      limit: limitNum,
      total,
      policies
    });

  } catch (error) {
    console.error("Error searching policies:", error);
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createPolicy,
  getPolicy,
  updatePolicy,
  deletePolicy,
  getAllPolicies,searchPolicies
};

