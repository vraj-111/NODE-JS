import mongoose from "mongoose";
import employee from "../model/employee.model.js";
import httpError from "../middleware/httpError.js";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    type: String,
    enum: ["CEO", "employee", "HR"],
    default: "employee",
    required: true,
  },
  mobileNo: {
    type: Number,
    minlength: 10,
    required: true,
  },
});
const Employee = mongoose.model("employeeData", employeeSchema);

const employeeDataShow = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.find({});

    if (employee.length === 0) {
      return next(new httpError("Employee not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "employee data fetched successfully",
      total: employee.length,
      employee,
    });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};

const employeeGetAllData = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return next(new httpError("employee not found", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "employee found", employee });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};

const deleteEmployeeId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return next(new httpError("employee not found within id ", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "employee delete successfully" });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};

export default {
  Employee,
  employeeDataShow,
  employeeGetAllData,
  deleteEmployeeId,
};
