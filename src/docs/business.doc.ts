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
 *               businessOwner:
 *                 type: object
 *                 properties:
 *                   first_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *               establishments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     establishmentId:
 *                       type: number
 *                     establishmentUrl:
 *                       type: string
 *     responses:
 *       201:
 *         description: Business created successfully
 */

/**
 * @openapi
 * /business:
 *   get:
 *     summary: Get all businesses
 *     tags:
 *       - Business
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of businesses
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

/**
 * @openapi
 * /business/addTapKey:
 *   patch:
 *     summary: Add Tap credentials to a business
 *     tags:
 *       - Business
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               secretKey:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tap credentials added successfully
 */

/**
 * @openapi
 * /business/update/{businessId}:
 *   patch:
 *     summary: Update a business
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