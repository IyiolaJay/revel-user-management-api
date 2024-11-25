/**
 * @openapi
 * /client/management/getClients:
 *      get:
 *         summary: Get client account.
 *         tags:
 *            - Client
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


/**
 * @openapi
 * /client/orders/getEstablishmentOrders:
 *      get:
 *         summary: Get order receipts for an establishment.
 *         tags:
 *            - Client
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
 *             name: establishmentId
 *             schema:
 *               type: string 
 *         responses:
 *           "200":
 *             description: success
 */