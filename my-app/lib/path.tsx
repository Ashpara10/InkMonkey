const basepath =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://frail-neckerchief-foal.cyclic.cloud";

export default basepath;
