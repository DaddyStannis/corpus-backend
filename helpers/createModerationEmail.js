const { BASE_URL } = process.env;

const createModerationEmail = (feedback) => {
  const { _id: feedbackId, name, phone, comment } = feedback;
  const addLink = `${BASE_URL}/api/feedbacks/moderated/${feedbackId}`;
  const deleteLink = `${BASE_URL}/api/feedbacks/delete/${feedbackId}`;
  const subject = "Feedback needs moderation";
  const html = `<div>
                  <p>${name}</p>
                  <p>${phone}</p>
                  <p>${comment}</p>
                  <a href="${addLink}">Додати</a>
                  <a href="${deleteLink}">Видалити</a>
                </div>`;
  return { subject, html };
};

export default createModerationEmail;
