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

// /**
//  * @openapi
//  * components:
//  *    schemas:
//  *       AdminLogin:
//  *          type: object
//  *          required:
//  *             - email:
//  *             - password:
//  *          properties:
//  *             email:
//  *                type: string
//  *             password:
//  *                type: string
//  */


// /**
//  * @openapi
//  * components:
//  *    schemas:
//  *       VerifyToken:
//  *          type: object
//  *          required:
//  *             - token:
//  *          properties:
//  *             token:
//  *                type: string
//  */

// /**
//  * @openapi
//  * components:
//  *    schemas:
//  *       ChangePassword:
//  *          type: object
//  *          required:
//  *             - password:
//  *          properties:
//  *             password:
//  *                type: string
//  */
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
 *             defaultService:
 *                type: object
 *                required:
 *                   - serviceId
 *                   - expireDate
 *                properties:
 *                   serviceId:
 *                      type: string
 *                      example: "6744fe5d0f01ae028f5a6195"
 *                   expireDate:
 *                      type: string
 *                      format: date-time
 *                      example: "2024-12-31T23:59:59Z"
 */
