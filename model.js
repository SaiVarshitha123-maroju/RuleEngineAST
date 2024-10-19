const nodeSchema = new mongoose.Schema({
  type: String, // "operator" or "operand"
  operator: String, // "AND", "OR" (for operator type)
  value: String, // Only for operand type, e.g. "age > 30"
  left: Object, // Reference to left child node
  right: Object, // Reference to right child node
});

const Node = mongoose.model("Node", nodeSchema);
