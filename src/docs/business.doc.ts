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
