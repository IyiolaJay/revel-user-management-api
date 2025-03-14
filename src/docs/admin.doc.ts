/**
 * @openapi
 * /admin/createAdmin:
 *      post:
 *         summary: Create an admin account, this will only be done with an admin with required permission and a super admin.
 *         tags:
 *            - Admin
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


// /**
//  * @openapi
//  * /admin/createClientAccount:
//  *      post:
//  *         summary: Create an client account, this will only be done with an admin with required permission and a super admin.
//  *         tags:
//  *            - Admin
//  *         requestBody:
//  *              required: true
//  *              content:
//  *                  application/json:
//  *                     schema:
//  *                        $ref: '#/components/schemas/ClientCreation'
//  *         responses:
//  *            "201":
//  *               description: created
//  *
//  */



/**
 * @openapi
 * /admin/permissions:
 *      get:
 *         tags:
 *            - Admin
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

/**
 * @openapi
 * /admin/edit/{adminId}:
 *      patch:
 *         summary: Edit an admin account, this will only be done with an admin with required permission and a super admin.
 *         tags:
 *            - Admin
 *         parameters:
 *           - in: path
 *             name : adminId
 *             required : true
 *             schema:
 *               type: string
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
 * /admin/all:
 *      get:
 *         summary: Get all admins.
 *         tags:
 *            - Admin
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
 *           - in: query
 *             name: createdAt_range
 *             schema:
 *               type: string 
 *             example : "2025-01-06T08:10:24.941Z,2025-01-06T08:10:24.941Z"
 *           - in: query
 *         responses:
 *           "200":
 *             description: success
 */