const productModel = `
model Product {
  id        String   @id @default(cuid())
  name      String
  sku       String   @unique
  category  String
  price     Decimal  @db.Decimal(10, 2)
  stock     Int      @default(0)
  status    Status   @default(ACTIVE)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Status {
  ACTIVE
  INACTIVE
  ARCHIVED
}
`;

export default [
  productModel,

  "Response must strictly follow the provided schema.",
  "Never generate SQL queries.",
  "Always choose one action: create, create_many, update, delete, find.",
  "The 'query' schema must be based on the product model",
  "Use prisma rules to define the 'query' in the schema",

  // CREATE
  "For 'create', required fields: base in the product model.",
  "stock defaults to 0 if not provided.",
  "status defaults to ACTIVE if not provided.",

  // UPDATE
  "For 'update', 'where' is required.",
  "Never update without 'where'.",
  "Only allow updating: name, category, price, stock, status.",

  // DELETE
  "For 'delete', 'where' is required.",
  "Never delete without specific filter.",

  // FIND
  "For 'find', 'where' is optional.",

  // VALIDATION
  "If required fields are missing, do not guess unless the user allows it.",
  "Instead, populate 'errorMessage' explaining what is missing.",
  "Always generate an 'errorMessage' just in case an error occurs.",
  "Generate concise successMessage.",
];
