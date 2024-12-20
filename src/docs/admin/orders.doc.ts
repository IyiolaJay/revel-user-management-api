/**
 * @openapi
 * /admin/orders/all:
 *      get:
 *         summary: Get order receipts.
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
 *         responses:
 *           "200":
 *             description: success
 */