const statusTemplate = (status, itemName, reason = "") => {
  let title = "";
  let message = "";
  let highlight = "";

  if (status === "pending") {
    title = "Item Pending Approval";
    message = `Your item <b>${itemName}</b> has been submitted for admin approval. 
               Please wait while we verify your details.`;
    highlight = "Pending Verification";
  } else if (status === "approved") {
    title = "Item Approved 🎉";
    message = `Congratulations! Your item <b>${itemName}</b> has been approved and is now live for rent on Rentify.`;
    highlight = "Approved";
  } else if (status === "rejected") {
    title = "Item Rejected ❌";
    message = `Sorry! Your item <b>${itemName}</b> has been rejected by our admin team.`;
    highlight = `Reason: ${reason || "Not specified"}`;
  }

  return `<!DOCTYPE html>
	  <html>
	  <head>
		  <meta charset="UTF-8">
		  <title>${title}</title>
		  <style>
			  body {
				  background-color: #ffffff;
				  font-family: Arial, sans-serif;
				  font-size: 16px;
				  line-height: 1.4;
				  color: #333333;
				  margin: 0;
				  padding: 0;
			  }
			  .container {
				  max-width: 600px;
				  margin: 0 auto;
				  padding: 20px;
				  text-align: center;
			  }
			  .logo {
				  max-width: 200px;
				  margin-bottom: 20px;
			  }
			  .message {
				  font-size: 18px;
				  font-weight: bold;
				  margin-bottom: 20px;
			  }
			  .body {
				  font-size: 16px;
				  margin-bottom: 20px;
			  }
			  .highlight {
				  font-weight: bold;
				  color: #d9534f;
				  margin-top: 10px;
				  display: block;
			  }
			  .support {
				  font-size: 14px;
				  color: #999999;
				  margin-top: 20px;
			  }
		  </style>
	  </head>
	  <body>
		  <div class="container">
			  <a href="https://rentify-app.com">
				  <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Rentify Logo">
			  </a>
			  <div class="message">${title}</div>
			  <div class="body">
				  <p>Dear User,</p>
				  <p>${message}</p>
				  <span class="highlight">${highlight}</span>
			  </div>
			  <div class="support">
				  If you have any questions, feel free to reach us at 
				  <a href="mailto:support@rentify.com">support@rentify.com</a>.
			  </div>
		  </div>
	  </body>
	  </html>`;
};

module.exports = statusTemplate;
