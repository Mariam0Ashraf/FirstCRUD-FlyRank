function getApiInfo() {
  return {
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  };
}

function getHealth() {
  return { status: "ok" };
}

module.exports = {
  getApiInfo,
  getHealth,
};
