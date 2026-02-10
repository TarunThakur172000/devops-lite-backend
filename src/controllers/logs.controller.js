const {updateHealthLog} = require('../services/logs.service');
const updateHealth = async (req, res) => {
    try {
        const data = req.body; 
        const projectId = req.projectid; 
        const health = await updateHealthLog(data, projectId);

        if (!health) {
            return res.status(404).json({ message: 'Health record not found' });
        }

        res.status(200).json({ message: 'Health logs updated successfully', health });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {updateHealth};