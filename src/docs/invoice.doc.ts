/**
 * @openapi
 * /invoices/createInvoice:
 *   post:
 *     summary: Create a new invoice
 *     tags:
 *       - Invoices
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createInvoice'
 *     responses:
 *       201:
 *         description: Invoice created successfully
 */

/**
 * @openapi
 * /invoices/getInvoices:
 *   get:
 *     summary: Get all invoices
 *     tags:
 *       - Invoices
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: invoiceNumber
 *         schema:
 *           type: string
 *           example: INV-001
 *     responses:
 *       200:
 *         description: Invoices fetched
 */

/**
 * @openapi
 * /invoices/editInvoice/{invoiceId}:
 *   patch:
 *     summary: Edit an existing invoice
 *     tags:
 *       - Invoices
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 */

/**
 * @openapi
 * /invoices/getNextInvoiceNumber:
 *      get:
 *          summary: Get the next invoice number
 *          tags:
 *              - Invoices
 *          parameters:
 *              - in: query
 *                name: invoiceType
 *                schema:
 *                type: string
 *                example: invoice
 *          responses:
 *            200:
 *              description: Next invoice number fetched
 */