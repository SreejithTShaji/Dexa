import { Router } from "express";
import { db } from "../db";
import { users } from "../schema";
import { eq } from "drizzle-orm";

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
  res.json(allUsers);
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
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/", async (req, res) => {
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
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: A user object
 *       404:
 *         description: User not found
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await db.select().from(users).where(eq(users.id, Number(id)));
  if (user.length === 0) return res.status(404).json({ error: "User not found" });
  res.json(user[0]);
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
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const updated = await db
    .update(users)
    .set({ name, email })
    .where(eq(users.id, Number(id)))
    .returning();
  if (updated.length === 0) return res.status(404).json({ error: "User not found" });
  res.json(updated[0]);
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
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await db.delete(users).where(eq(users.id, Number(id))).returning();
  if (deleted.length === 0) return res.status(404).json({ error: "User not found" });
  res.json({ message: "User deleted" });
});

export default router;
