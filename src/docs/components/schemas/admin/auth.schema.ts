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
 *             - email:
 *             - name:
 *          properties:
 *             email:
 *                type: string
 *             name:
 *                type: string
 *             establishmentId:
 *                type: string
 *             establishmentUrl:
 *                type: string
 */