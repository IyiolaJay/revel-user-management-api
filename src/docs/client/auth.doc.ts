/**
 * @openapi
 * /client/createAccount:
 *      post:
 *         summary: Create an client account, this will only be done with an admin with required permission and a super admin.
 *         tags:
 *            - Client-Authentication
 *         requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                        $ref: '#/components/schemas/ClientCreation'
 *         responses:
 *            "204":
 *               description: success and no content
 *
 */


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
 *            "200":
 *               description: success
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
 *            "200":
 *               description: success
 *
 */