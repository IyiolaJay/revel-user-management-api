
/**
 * @openapi
 * /user/login:
 *   post:
 *     summary: User account login (admin/client)
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
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
 * /user/verifyToken:
 *      post:
 *         summary: Verify Token
 *         tags:
 *            - Users
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
 * /user/changePassword:
 *      patch:
 *         tags:
 *            - Users
 *         parameters:
 *           - in: query
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
 * /profile:
 *      get:
 *         tags:
 *            - Users
 *         responses:
 *           "200":
 *             description: success and no content
 */