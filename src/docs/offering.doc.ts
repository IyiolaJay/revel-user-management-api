/**
 * @openapi
 * /offerings:
 *   post:
 *     summary: Create a new product or service
 *     tags:
 *       - Category & Offerings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
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
 *               type:
 *                 type: string
 *                 required : true
 *                 enum:
 *                   - PRODUCT
 *                   - SERVICE
 *     responses:
 *       201:
 *         description: Offering created
 */


/**
 * @openapi
 * /offerings:
 *   get:
 *     summary: Get all offerings
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
 *         name: name
 *         schema:
 *           type: string
 *           example: Electronics
 *     responses:
 *       200:
 *          description: Offerings fetched
 */


/**
 * @openapi
 * /offerings:
 *   patch:
 *     summary: Edit an existing offering
 *     tags:
 *       - Category & Offerings
 *     parameters:
 *       - in: path
 *         name: offeringId
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
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Offering updated successfully
 */