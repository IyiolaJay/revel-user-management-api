/**
 * @openapi
 * components:
 *    schemas:
 *       CreateService:
 *          type: object
 *          required:
 *             - serviceName:
 *             - serviceCost:
 *             - serviceCostCurrency:
 *             - serviceTenureType:
 *             - minimumTenureDuration:
 *          properties:
 *             serviceName:
 *                type: string
 *             serviceDescription:
 *                type: string
 *             serviceCost:
 *                type: number
 *             serviceCostCurrency:
 *                type: string
 *             serviceTenureType:
 *                type: string
 *             minimumTenureDuration:
 *                type: number
 */