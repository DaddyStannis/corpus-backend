const { BASE_URL } = process.env;

const createModerationEmail = (feedback) => {
  const { _id: feedbackId, name, phone, comment } = feedback;
  const addLink = `${BASE_URL}/api/feedbacks/moderated/${feedbackId}`;
  const deleteLink = `${BASE_URL}/api/feedbacks/delete/${feedbackId}`;
  const subject = "Feedback needs moderation";
  const html = `
  <div style="max-width: 768px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f9f9f9; border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
    <p style="margin: 0; font-size: 16px; font-weight: bold;">Ім'я: ${name}</p>
    <p style="margin: 5px 0; font-size: 16px; font-weight: bold">Телефон: <a href="tel:${phone}">+${phone}</a></p>
    <p style="margin: 5px 0; font-size: 16px; font-weight: bold">Комментар: 
      <br />
      <p style="padding: 12px; font-size: 14px; font-weight: normal; line-height: 1.5; border: 1px solid #ccc; border-radius: 5px">${comment}</p></p>
    <a style="display: block; margin-top: 10px; text-decoration: none; color: #fff; background-color: #007bff; padding: 10px 15px; border-radius: 5px; text-align: center;" href="${addLink}">Додати</a>
    <a style="display: block; margin-top: 5px; padding: 10px 15px; text-decoration: none; color: #007bff; text-align: center;" href="${deleteLink}">Видалити</a>
  </div>
`;
  return { subject, html };
};

export default createModerationEmail;
