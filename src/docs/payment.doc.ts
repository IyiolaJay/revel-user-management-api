/**
 * @openapi
 * /payment/upload-payment-proof:
 *   post:
 *     summary: Upload payment proof
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              userId: string
 *              paymentProofUrl: string
 *              transactionId: string
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 */