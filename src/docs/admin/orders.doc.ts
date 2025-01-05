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
 *           - in: query
 *             name: from
 *             schema:
 *               type: string 
 *           - in: query
 *             name: to
 *             schema:
 *               type: string 
 *           - in: query
 *             name: establishmentId
 *             schema:
 *               type: string 
 *           - in: query
 *             name: clientId
 *             schema:
 *               type: string 
 *         responses:
 *           "200":
 *             description: success
 */