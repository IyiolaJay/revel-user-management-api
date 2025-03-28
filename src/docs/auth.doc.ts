
/**
 * @openapi
 * /user/login:
 *   post:
 *     summary: User account login (admin/client)
 *     tags:
 *       - Authentication
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
 *            - Authentication
 *         parameters:
 *           - in : query
 *             name: rememberDevice
 *             schema:
 *               type: Boolean
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
 *            - Authentication
 *         parameters:
 *           - in: query
 *             name: id
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
 *            - Authentication
 *         responses:
 *           "200":
 *             description: success and no content
 */


/**
 * @openapi
 * /profile/client/all:
 *      get:
 *         summary: Get client users.
 *         tags:
 *            - Authentication
 *         parameters:
 *           - in: query
 *             name: offset
 *             required: true
 *             default : 1
 *             schema:
 *               type: string 
 *           - in: query
 *             name: limit
 *             schema:
 *               type: string 
 *         responses:
 *           "200":
 *             description: success
 */


// /**
//  * @openapi
//  * /profile/client/edit/{clientId}:
//  *      patch:
//  *         summary: Edit client
//  *         tags:
//  *            - Users
//  *         parameters:
//  *           - in : path
//  *             name : clientId
//  *         requestBody:
//  *              required: true
//  *              content:
//  *                  application/json:
//  *                     schema:
//  *                        $ref: '#/components/schemas/ClientEdit'
//  *         responses:
//  *            "201":
//  *               description: created
//  *
//  */