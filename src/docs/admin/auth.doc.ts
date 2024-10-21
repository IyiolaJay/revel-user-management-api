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
 *            "204":
 *               description: success and no content
 *
 */


/**
 * @openapi
 * /admin/login:
 *      post:
 *         summary: Admin login
 *         tags:
 *            - Admin-Authentication
 *         requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                        $ref: '#/components/schemas/AdminLogin'
 *         responses:
 *            "200":
 *               description: success
 *
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
 *            "200":
 *               description: success
 *
 */