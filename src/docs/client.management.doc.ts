/**
 * @openapi
 * /clients:
 *      post:
 *         summary: Create a client for a business
 *         tags:
 *            - Client
 *         requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                        $ref: '#/components/schemas/ClientCreation'
 *         responses:
 *            "201":
 *               description: created
 *
 */

/**
 * @openapi
 * /clients:
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
 *           - in: query
 *             name: createdAt_range
 *             schema:
 *               type: string 
 *         responses:
 *           "200":
 *             description: success
 */


// /**
//  * @openapi
//  * /clients/orders/getEstablishmentOrders:
//  *      get:
//  *         summary: Get order receipts for an establishment.
//  *         tags:
//  *            - Client
//  *         parameters:
//  *           - in: query
//  *             name: offset
//  *             required: true
//  *             default : 1
//  *             schema:
//  *               type: string 
//  *           - in: query
//  *             name: limit
//  *             schema:
//  *               type: string 
//  *           - in: query
//  *             name: createdAt_range
//  *             example: "2025-01-06T08:10:24.941Z,2025-01-06T08:10:24.941Z"
//  *             schema:
//  *               type: string 
//  *           - in: query
//  *             name: establishmentId
//  *             schema:
//  *               type: string 
//  *         responses:
//  *           "200":
//  *             description: success
//  */


/**
 * @openapi
 * /clients/edit/{clientId}:
 *      patch:
 *         summary: Edit an existing client account.
 *         tags:
 *            - Client
 *         parameters:
 *           - in: path
 *             name: clientId
 *             required: true
 *             schema:
 *               type: string
 *         requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   name:
 *                     type: string
 *                   establishmentId:
 *                     type: string
 *                   establishmentUrl:
 *                     type: string
 *         responses:
 *           "200":
 *             description: Client updated successfully
 */


/**
 * @openapi
 * /clients/updatePassword:
 *      patch:
 *         summary: upgrade a customer account to client account.
 *         tags:
 *            - Client
 *         requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   password:
 *                     type: string
 *         responses:
 *           "200":
 *             description: Client updated successfully
 */

/**
 * @openapi
 * /clients/search:
 *      get:
 *         summary: upgrade a customer account to client account.
 *         tags:
 *            - Client
 *         parameters:
 *           - in: query
 *             name: searchText
 *             required: true
 *             schema:
 *               type: string
 *           - in: query
 *             name: offset
 *             required: true
 *             schema:
 *               type: number
 *         responses:
 *           "200":
 *             description: Client search results
 */