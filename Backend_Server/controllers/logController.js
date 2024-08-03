const Log = require("../models/Log");
const { sendEvent } = require('../kafka/kafkaConfig');

const logController ={};

logController.getLog = async (req, res) => {
    try {
        const logs = await Log.find()
            .sort({ timestamp: -1 });

        return res.status(200).json(logs);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

module.exports = logController;