/**
 * @openapi
 * components:
 *    schemas:
 *       AdminCreation:
 *          type: object
 *          required:
 *             - email:
 *             - name:
 *             - password:
 *          properties:
 *             email:
 *                type: string
 *             name:
 *                type: string
 *             permissionSet:
 *                type: array
 *                items:
 *                  type: string
 */

/**
 * @openapi
 * components:
 *    schemas:
 *       ClientCreation:
 *          type: object
 *          required:
 *             - email
 *             - name
 *             - establishmentId
 *             - establishmentUrl
 *          properties:
 *             email:
 *                type: string
 *                example: user@example.com
 *             first_name:
 *                type: string
 *                example: John Doe
 *             last_name:
 *                type: string
 *                example: John Doe
 *             establishmentId:
 *                type: array
 *                items:
 *                   type: number
 *                example: [101, 102]
 *             establishmentUrl:
 *                type: string
 *                example: "https://example.com"
 *             hasAccount:
 *                type: boolean
 *             company:
 *                type: string
 *             phone:
 *                type: object
 *                properties:
 *                 country_code:
 *                  type: string
 *                 number:
 *                  type: string
 *             subscribedService:
 *                type: array
 *                items:
 *                   type: string
 *                example : ["674f1b4b9a7d1e216e34d8fc"]
 */



/**
 * @openapi
 * components:
 *    schemas:
 *       ClientEdit:
 *          type: object
 *          required:
 *             - email
 *             - name
 *             - establishmentId
 *             - establishmentUrl
 *          properties:
 *             email:
 *                type: string
 *                example: user@example.com
 *             name:
 *                type: string
 *                example: John Doe
 *             establishmentId:
 *                type: array
 *                items:
 *                   type: number
 *                example: [101, 102]
 *             establishmentUrl:
 *                type: string
 *                example: "https://example.com"
 */

/**
 * @openapi
 * components:
 *    schemas:
 *       UpdateAdmin:
 *          type: object
 *          properties:
 *             email:
 *                type: string
 *             name:
 *                type: string
 *             permissionSet:
 *                type: array
 *                items:
 *                  type: string
 */