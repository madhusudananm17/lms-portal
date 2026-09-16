const sendEmail = async ({ email, subject, message }) => {
  console.log(`[Email Dispatcher] Sending email to ${email}: ${subject}`);
  return { success: true, recipient: email };
};

module.exports = sendEmail;
