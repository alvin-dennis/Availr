export const EMAIL_SUBJECT = "Please Confirm Your Availability";

export const EMAIL_TEMPLATE = (name, link) => `
  <div>
    <p>Hi ${name || "there"},</p>
    <p>Please confirm your availability:</p>
    <a href="${link}" style="padding:10px;background:#4CAF50;color:#fff;">Choose Slot</a>
    <p>Thanks,<br/>Team Availr</p>
  </div>
`;

export const CONFIRM_TEMPLATE = (name, slot) => `
  <div>
    <p>Hi ${name || "there"},</p>
    <p>Your time slot (${slot}) is confirmed!</p>
    <p>Regards,<br/>Team Availr</p>
  </div>
`;
