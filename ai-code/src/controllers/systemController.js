function getApiInfo(req, res) {
  res.status(200).json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks", "/stats", "/reset", "/health", "/docs"],
  });
}

function getHealth(req, res) {
  res.status(200).json({ status: "ok" });
}

module.exports = {
  getApiInfo,
  getHealth,
};
