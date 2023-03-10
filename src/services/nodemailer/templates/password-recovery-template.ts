import path from "path";

function passwordRecoveryTemplate(url: string, id: string) {
  return {
    subject: "Reset your password",
    text: `Purple Notes - To create a new password click on the following link: ${url}/${id}`,
    attachments: [
      {
        filename: "logo.png",
        path: path.resolve("public", "images", "logo.png"),
        cid: "logo",
      },
    ],
    html: `
      <div
        style="width: 100%; max-width: 500px; padding: 0 10px; margin: 0 auto; text-align: center; background: #fff; color: #000; font-family: arial;">
        <div style="padding: 10px 0;">
          <img style="width:100px;" src="cid:logo" />
          <h1 style="color: #6b03fc; text-align: center;">Purple Notes</h1>
      </div>
              
        <h2>Reset your password</h2>
        <p style="color: #505050;">
        Create a new password, click below to make a new password.
        </p>
        <div style="padding: 20px 0;">
            <a href="${url}/password-recovery/${id}" target="_blank"
              style="background-color: #6b03fc; color: #fff; text-decoration: none; font-weight: bold; border: 0; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Create new password</a>
        </div>
      </div>
    `,
  };
}

export { passwordRecoveryTemplate };
