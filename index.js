const express = require("express");
const app = express();
app.use(express.json());

app.post("/feishu", (req, res) => {
    const body = req.body;
    console.log("Incoming request:", JSON.stringify(body));

    // 飞书第一次验证 URL
    if (body.type === "url_verification") {
        return res.json({
            challenge: body.challenge
        });
    }

    // 处理卡片按钮点击
    if (body.header && body.header.event_type === "card.action.trigger") {
        const operator = body.event.operator.open_id;
        const actionValue = body.event.action.value;

        console.log("User clicked:", operator);
        console.log("Action value:", actionValue);
    }

    res.send("ok");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
