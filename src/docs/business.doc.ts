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
 *               businessOwner:
 *                 type: object
 *                 properties:
 *                   first_name:
 *                     type: string
 *                   last_name:
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
 * /business/update/{businessId}:
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


/**
 * @openapi
 * /business/addTapKey:
 *   patch:
 *     summary: Update an existing business
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
 *         description: Business updated successfully
 */

/**
 * @openapi
 * /business/admin/create:
 *   post:
 *     summary: Create a business admin
 *     tags:
 *       - Business
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               permissionSet:
 *                  type: array
 *                  items:
 *                    type: string
 *               phone:
 *                 type: object
 *                 properties:
 *                   country_code:
 *                     type: string
 *                   number:
 *                     type: string
 *     responses:
 *       201:
 *         description: Business created successfully
 */


/**
 * @openapi
 * /business/createClient:
 *      post:
 *         summary: Create a client for a business
 *         tags:
 *            - Business
 *         requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                        $ref: '#/components/schemas/ClientCreation'
 *         responses:
 *            "201":
 *               description: created
 *
 */