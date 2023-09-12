export default function errorEmit(res, errorType) {
  return res.emit("error", new Error(errorType));
}
