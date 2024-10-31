/**
 * @openapi
 * /client/login:
 *      post:
 *         summary: Client login
 *         tags:
 *            - Client-Authentication
 *         requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                        $ref: '#/components/schemas/ClientLogin'
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
 *                       example: "OTP sent to email"
 *                     data:
 *                       type: object
 *                       properties:
 *                         accessToken:
 *                           type: string
 *                           description: JWT token for authorization
 *                           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e..."
 *
 */

/**
 * @openapi
 * /client/verifyToken:
 *      post:
 *         summary: Verify Token
 *         tags:
 *            - Client-Authentication
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
 * /client/changePassword:
 *      patch:
 *         tags:
 *            - Client-Authentication
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