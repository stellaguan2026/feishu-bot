const express = require("express");
const app = express();

app.use(express.json());

// Healthcheck for Railway
app.get("/", (req, res) => res.status(200).send("OK"));
app.get("/health", (req, res) => res.status(200).send("OK"));

app.post("/feishu", (req, res) => {
  const body = req.body;
  console.log("Incoming request:", JSON.stringify(body));

  // URL verification
  if (body.type === "url_verification") {
    return res.json({ challenge: body.challenge });
  }

  // Card callback
  if (body.header && body.header.event_type === "card.action.trigger") {
    const operator = body?.event?.operator?.open_id;
    const actionValue = body?.event?.action?.value;

    console.log("User clicked:", operator);
    console.log("Action value:", actionValue);
  }

  // Always respond quickly
  return res.status(200).send("ok");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
