import fetch from "node-fetch";
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Створення пошти
app.post("/register", async (req, res) => {
  const { login, password } = req.body;

  try {
    const response = await fetch("https://api.mail.tm/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: login, password }),
    });

    const data = await response.json();

    if (data.id) {
      res.json({
        success: true,
        message: "Email registered",
        email: data.address,
      });
    } else {
      res
        .status(400)
        .json({ success: false, error: data.detail || "Registration failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Перевірка вхідних повідомлень
app.post("/inbox", async (req, res) => {
  const { login, password } = req.body;

  try {
    // Отримання токену
    const tokenResponse = await fetch("https://api.mail.tm/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: login, password }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.token) {
      const inboxResponse = await fetch("https://api.mail.tm/messages", {
        headers: { Authorization: `Bearer ${tokenData.token}` },
      });

      const messages = await inboxResponse.json();
      res.json({ success: true, messages });
    } else {
      res.status(401).json({ success: false, error: "Authentication failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
