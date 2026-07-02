import Tenant from "../models/Tenant.js";

export const createTenant = async (req, res) => {
  try {
    const tenant = await Tenant.create(req.body);

    res.status(201).json({
      success: true,
      data: tenant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();

    res.json({
      success: true,
      data: tenants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    res.json({
      success: true,
      data: tenant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};