import doctorModel from "../models/doctorModel.js";

// api to change the availability of a doctor
const changeAvailability = async (req, res) => {
    try {
        // getting the doctor id
        const { docId } = req.body;

        // finding the doctor
        const docData = await doctorModel.findById(docId);

        // updating the availability
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });

        res.json({
            success: true,
            message: "Availability changed successfully"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// api to get all doctors
const doctorList = async (req, res) => {
    try {
        // getting all doctors
        const doctors = await doctorModel.find({}).select(["-password" , "-email"]);
        res.json({
            success: true,
            doctors
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { changeAvailability, doctorList };
