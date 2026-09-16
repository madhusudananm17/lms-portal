const generateCertificate = require('../utils/generateCertificate');

exports.getCertificates = async (req, res) => {
  res.json([
    {
      certificateCode: generateCertificate('usr_1', 1),
      courseId: 1,
      issueDate: new Date()
    }
  ]);
};
