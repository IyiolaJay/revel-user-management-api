/**
 * @openapi
 * /bulk-upload/items:
 *      post:
 *         summary: Create new items from csv
 *         tags:
 *            - Posts
 *         requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                     schema:
 *                        $ref: '#/components/schemas/BulkUpload'
 *         responses:
 *            "200":
 *               description: success
 *
 *
 *
 *
 */

/**
 * @openapi
 * components:
 *    schemas:
 *       BulkUpload:
 *          type: object
 *          properties:
 *             csv:
 *                type: string
 *                format: binary
 *                description: CSV file for bulk data upload
 */
