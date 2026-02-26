const userModel = `
model User {
  id           String    @id @default(cuid())
  name         String
  email        String    @unique
  passwordHash String?
  role         Role      @default(STAFF)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

enum Role {
  ADMIN
  MANAGER
  STAFF
}
`;

export default [
  userModel,

  "Response must strictly follow the provided schema.",
  "Never generate SQL queries.",
  "Always choose one action: create, create_many, update, delete, find.",
  "The 'query' schema must be based on the user model",
  "Use prisma rules to define the 'query' in the schema",

  // CREATE
  "For 'create', required fields: base in the user model.",
  "password is required",
  "put original password at field passwordHash",
  "don't hash the password",

  // UPDATE
  "For 'update', 'where' is required.",
  "Never update without 'where'.",
  "Only allow updating name and role.",

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
