/**
 * @openapi
 * components:
 *    schemas:
 *       ClientCreation:
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
 *             password:
 *                type: string
 */

/**
 * @openapi
 * components:
 *    schemas:
 *       ClientLogin:
 *          type: object
 *          required:
 *             - email:
 *             - password:
 *          properties:
 *             email:
 *                type: string
 *             password:
 *                type: string
 */


/**
 * @openapi
 * components:
 *    schemas:
 *       VerifyToken:
 *          type: object
 *          required:
 *             - token:
 *          properties:
 *             token:
 *                type: string
 */