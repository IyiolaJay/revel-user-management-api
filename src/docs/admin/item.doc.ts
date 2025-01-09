/**
 * @openapi
 * /items/createItem:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Category & Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemName:
 *                 type: string
 *               cost:
 *                 type: string
 *               currency:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryName:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: Category created successfully
 */


/**
 * @openapi
 * /items/getItems:
 *   get:
 *     summary: Get all items
 *     tags:
 *       - Category & Items
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
 *         name: itemName
 *         schema:
 *           type: string
 *           example: Electronics
 *     responses:
 *       200:
 *          description: Items fetched
 */


/**
 * @openapi
 * /items/editItem/{itemid}:
 *   patch:
 *     summary: Edit an existing item
 *     tags:
 *       - Category & Items
 *     parameters:
 *       - in: path
 *         name: itemId
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
 *               itemName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 */