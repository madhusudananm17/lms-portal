const generateCertificate = (userId, courseId) => {
  const dateStr = new Date().getFullYear();
  const randomHex = Math.floor(1000 + Math.random() * 9000);
  return `EDUFLOW-${dateStr}-${courseId * 100 + randomHex}`;
};

module.exports = generateCertificate;
