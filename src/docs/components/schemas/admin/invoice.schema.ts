/**
 * @openapi
 * components:
 *    schemas:
 *       createInvoice:
 *          type: object
 *          required:
 *             - draft
 *             - due
 *             - expiry
 *             - description
 *             - charge
 *             - customer
 *             - order
 *          properties:
 *             draft:
 *                type: boolean
 *                description: Indicates if the invoice is a draft
 *             clientId:
 *                type: string
 *                description: ID of the customer/client that the invoice is meant for
 *             due:
 *                type: number
 *                description: Due amount for the invoice
 *             expiry:
 *                type: number
 *                description: Expiry date of the invoice
 *             description:
 *                type: string
 *                description: Description of the invoice
 *             note:
 *                type: string
 *                description: Additional note for the invoice
 *             charge:
 *                type: object
 *                properties:
 *                   receipt:
 *                      type: object
 *                      properties:
 *                         email:
 *                            type: boolean
 *                            default: true
 *                            description: Indicates if email receipt is enabled
 *                         sms:
 *                            type: boolean
 *                            default: true
 *                            description: Indicates if SMS receipt is enabled
 *                      required:
 *                         - email
 *                         - sms
 *                required:
 *                   - receipt
 *             customer:
 *                type: object
 *                properties:
 *                   first_name:
 *                      type: string
 *                      description: First name of the customer
 *                   last_name:
 *                      type: string
 *                      description: Last name of the customer
 *                   email:
 *                      type: string
 *                      format: email
 *                      description: Email address of the customer
 *                   phone:
 *                      type: object
 *                      properties:
 *                         country_code:
 *                            type: string
 *                            description: Country code of the phone number
 *                         number:
 *                            type: string
 *                            description: Phone number of the customer
 *                      required:
 *                         - country_code
 *                         - number
 *                required:
 *                   - firstName
 *                   - lastName
 *                   - email
 *                   - phone
 *             statement_descriptor:
 *                type: string
 *                description: Statement descriptor for the invoice
 *             order:
 *                type: object
 *                properties:
 *                   amount:
 *                      type: number
 *                      description: Total amount of the order
 *                   items:
 *                      type: array
 *                      items:
 *                         type: object
 *                         properties:
 *                            amount:
 *                               type: number
 *                               description: Amount of the item
 *                            currency:
 *                               type: string
 *                               default: KWD
 *                               description: Currency of the item
 *                            name:
 *                               type: string
 *                               description: Name of the item
 *                            description:
 *                               type: string
 *                               description: Description of the item
 *                            quantity:
 *                               type: number
 *                               description: Quantity of the item
 *                         required:
 *                            - amount
 *                            - currency
 *                            - name
 *                            - description
 *                            - quantity
 *                      description: Items in the order
 *                   currency:
 *                      type: string
 *                      default: KWD
 *                      description: Currency of the order
 *                required:
 *                   - amount
 *                   - items
 *                   - currency
 */