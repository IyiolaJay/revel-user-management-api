/**
 * @openapi
 * /admin/createAdmin:
 *      post:
 *         summary: Create an admin account, this will only be done with an admin with required permission and a super admin.
 *         tags:
 *            - Admin-Authentication
 *         requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                        $ref: '#/components/schemas/AdminCreation'
 *         responses:
 *           "200":
 *             description: success
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Admin created"
 *                     data:
 *                       type: null
 *                       example: null
 */


/**
 * @openapi
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags:
 *       - Admin-Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminLogin'
 *     responses:
 *       "200":
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Login Success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: JWT token for authorization
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e..."
 */


/**
 * @openapi
 * /admin/verifyToken:
 *      post:
 *         summary: Verify Token
 *         tags:
 *            - Admin-Authentication
 *         requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                        $ref: '#/components/schemas/VerifyToken'
 *         responses:
 *           "200":
 *             description: success
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Token verified"
 *                     data:
*                      type: object
 *                      properties:
 *                        accessToken:
 *                          type: string
 *                          description: JWT token for authorization
 *                          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e..."
 */



/**
 * @openapi
 * /admin/changePassword:
 *      patch:
 *         tags:
 *            - Admin-Authentication
 *         parameters:
 *           - in: path
 *             name: userId
 *             required: true
 *             schema:
 *               type: string
 *         requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                        $ref: '#/components/schemas/ChangePassword'
 *         responses:
 *           "204":
 *             description: success and no content
 */

/**
 * @openapi
 * /admin/createClientAccount:
 *      post:
 *         summary: Create an client account, this will only be done with an admin with required permission and a super admin.
 *         tags:
 *            - Admin-Authentication
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



/**
 * @openapi
 * /admin/permissions:
 *      get:
 *         tags:
 *            - Admin-Authentication
 *         responses:
 *           "200":
 *             description: success
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Token verified"
 *                     data:
*                      type: array
 *                      items:
 *                        type: string
 *                        example:
 *                        - "ALL"
 *                        - "CREATE ADMIN"
 *                        - "DELETE ADMIN"
 */