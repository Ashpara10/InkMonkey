const basepath =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://frail-neckerchief-foal.cyclic.cloud";

export default basepath;
