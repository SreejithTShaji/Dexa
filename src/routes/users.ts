import { Router } from "express";
import { db } from "../db";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { validate } from "../middleware/validate";
import { CreateUserDto, UpdateUserDto, IdParamDto } from "../dto/user.dto";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", async (req, res) => {
  const allUsers = await db.select().from(users);
  res.status(200).json(allUsers);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/", validate(CreateUserDto), async (req, res) => {
  const { name, email } = req.body;
  const newUser = await db.insert(users).values({ name, email }).returning();
  res.status(201).json(newUser);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           $ref: '#/components/schemas/IdParamDto/properties/id'
 *         required: true
 *     responses:
 *       200:
 *         description: A user object
 *       404:
 *         description: User not found
 */
router.get("/:id", validate(IdParamDto, "params"), async (req, res) => {
  const { id } = req.params;
  const user = await db.select().from(users).where(eq(users.id, Number(id)));
  if (user.length === 0) return res.status(404).json({ error: "User not found" });
  res.status(200).json(user[0]);
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           $ref: '#/components/schemas/IdParamDto/properties/id'
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDto'
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
router.put("/:id", validate(IdParamDto, "params"), validate(UpdateUserDto), async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const updated = await db
    .update(users)
    .set({ name, email })
    .where(eq(users.id, Number(id)))
    .returning();
  if (updated.length === 0) return res.status(404).json({ error: "User not found" });
  res.status(200).json(updated[0]);
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           $ref: '#/components/schemas/IdParamDto/properties/id'
 *         required: true
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete("/:id", validate(IdParamDto, "params"), async (req, res) => {
  const { id } = req.params;
  const deleted = await db.delete(users).where(eq(users.id, Number(id))).returning();
  if (deleted.length === 0) return res.status(404).json({ error: "User not found" });
  res.status(200).json({ message: "User deleted" });
});

export default router;
