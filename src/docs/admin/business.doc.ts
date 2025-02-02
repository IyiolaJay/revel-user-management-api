/**
 * @openapi
 * /business/create:
 *   post:
 *     summary: Create a new business
 *     tags:
 *       - Business
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessEmail:
 *                 type: string
 *                 format: email
 *               businessName:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: object
 *                 properties:
 *                   country_code:
 *                     type: string
 *                   number:
 *                     type: string
 *               addressNumber:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: Business created successfully
 */

/**
 * @openapi
 * /business/{businessId}:
 *   patch:
 *     summary: Update an existing business
 *     tags:
 *       - Business
 *     parameters:
 *       - in: path
 *         name: businessId
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
 *               businessEmail:
 *                 type: string
 *                 format: email
 *               businessName:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: object
 *                 properties:
 *                   country_code:
 *                     type: string
 *                   number:
 *                     type: string
 *               addressNumber:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Business updated successfully
 */


/**
 * @openapi
 * /business:
 *   get:
 *     summary: Get all businesses
 *     tags:
 *       - Business
 *     parameters:
 *          - in: query
 *            name : offset
 *            schema:
 *               type : string
 *     responses:
 *       200:
 *         description: Businesses fetched successfully
 */


/**
 * @openapi
 * /business/{businessId}:
 *   delete:
 *     summary: Delete a business
 *     tags:
 *       - Business
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Business deleted successfully
 */