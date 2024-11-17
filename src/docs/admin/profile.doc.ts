/**
 * @openapi
 * /admin/profile:
 *      get:
 *         summary: Get profile.
 *         tags:
 *            - Admin-Profile
 *         responses:
 *           "200":
 *             description: success
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Admin created"
 *                     data:
 *                       type: null
 *                       example: null
 */