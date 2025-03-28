/**
 * @openapi
 * /categories/createCategory:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Category & Offerings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: Category created successfully
 */

/**
 * @openapi
 * /categories/getCategories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Category & Offerings
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: categoryName
 *         schema:
 *           type: string
 *           example: Electronics
 *     responses:
 *       200:
 *        description: Categories fetched
 */


/**
 * @openapi
 * /categories/editCategory/{categoryId}:
 *   patch:
 *     summary: Edit an existing category
 *     tags:
 *       - Category & Offerings
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 */